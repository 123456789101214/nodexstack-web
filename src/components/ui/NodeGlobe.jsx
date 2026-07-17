"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./globe.css";

export default function NodeGlobe({ hideHUD = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);
  
  const [uptime, setUptime] = useState("00:00:00");
  const [heading, setHeading] = useState("0.0°");

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const stage = containerRef.current;
    const RADIUS = 5;

    // --- STRICT FIX: Prevent Page Scroll when interacting with the Globe ---
    const preventPageScroll = (e) => {
      e.preventDefault();
      e.stopPropagation(); // Block the event from bubbling up to the window/body
    };
    
    // Apply to BOTH container and directly to canvas
    stage.addEventListener("wheel", preventPageScroll, { passive: false });
    stage.addEventListener("touchmove", preventPageScroll, { passive: false });
    canvas.addEventListener("wheel", preventPageScroll, { passive: false });
    canvas.addEventListener("touchmove", preventPageScroll, { passive: false });
    // ----------------------------------------------------------------

    // 3-Way Premium Theme Palette for Three.js Materials
    const GLOBE_THEME = {
      dark: {
        core: 0x040b16, coreOpacity: 0.98, atmo: 0x6fe3ff, atmoOpacity: 0.05,
        dots: 0x5fd3ff, dotsOpacity: 0.5, lines: 0x6fe3ff, linesOpacity: 0.3,
        nodes: 0xffffff, pulse: 0x6fe3ff, ping: 0x6fe3ff
      },
      light: {
        core: 0xf4f7fa, coreOpacity: 1.0, atmo: 0x2563eb, atmoOpacity: 0.05,
        dots: 0x3b82f6, dotsOpacity: 0.8, lines: 0x2563eb, linesOpacity: 0.4,
        nodes: 0x1d4ed8, pulse: 0x1d4ed8, ping: 0x2563eb
      },
      monochrome: {
        core: 0x000000, coreOpacity: 1.0, atmo: 0xffffff, atmoOpacity: 0.03,
        dots: 0xaaaaaa, dotsOpacity: 0.6, lines: 0xffffff, linesOpacity: 0.2,
        nodes: 0xffffff, pulse: 0xffffff, ping: 0xffffff
      }
    };

    // Initial theme detection
    const htmlClass = document.documentElement.classList;
    let initialTheme = "dark";
    if (htmlClass.contains("light")) initialTheme = "light";
    if (htmlClass.contains("theme-monochrome")) initialTheme = "monochrome";
    
    let initCfg = GLOBE_THEME[initialTheme];

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
    camera.position.set(0, 0, 16);

    // Zoom and pan enabled exactly as requested
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const coreGeo = new THREE.SphereGeometry(RADIUS * 0.98, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ color: initCfg.core, transparent: true, opacity: initCfg.coreOpacity });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.08, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({ color: initCfg.atmo, transparent: true, opacity: initCfg.atmoOpacity, side: THREE.BackSide, blending: THREE.AdditiveBlending });
    globeGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

    const dotsGeo = new THREE.BufferGeometry();
    const dotPositions = [];
    
    const isLand = (lat, lon) => {
      const inBounds = (lt, ln, minLt, maxLt, minLn, maxLn) => lt>=minLt && lt<=maxLt && ln>=minLn && ln<=maxLn;
      if(inBounds(lat, lon, 15, 70, -130, -60)) return Math.random() > 0.2;
      if(inBounds(lat, lon, -55, 15, -80, -35)) return Math.random() > 0.2;
      if(inBounds(lat, lon, 35, 70, -10, 40)) return Math.random() > 0.2;
      if(inBounds(lat, lon, -35, 35, -20, 50)) return Math.random() > 0.2;
      if(inBounds(lat, lon, 5, 70, 40, 140)) return Math.random() > 0.2;
      if(inBounds(lat, lon, -40, -10, 110, 155)) return Math.random() > 0.2;
      if(inBounds(lat, lon, -90, -65, -180, 180)) return Math.random() > 0.5;
      return Math.random() > 0.98;
    };

    for (let lat = -90; lat <= 90; lat += 3) {
      for (let lon = -180; lon < 180; lon += 3) {
        if (!isLand(lat, lon)) continue;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        dotPositions.push(
          -(RADIUS * Math.sin(phi) * Math.cos(theta)),
          (RADIUS * Math.cos(phi)),
          (RADIUS * Math.sin(phi) * Math.sin(theta))
        );
      }
    }
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 16; dotCanvas.height = 16;
    const ctx = dotCanvas.getContext('2d');
    ctx.beginPath(); ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    const dotsMat = new THREE.PointsMaterial({ size: 0.08, map: new THREE.CanvasTexture(dotCanvas), color: initCfg.dots, transparent: true, opacity: initCfg.dotsOpacity, alphaTest: 0.1 });
    globeGroup.add(new THREE.Points(dotsGeo, dotsMat));

    const getSphericalPos = (lat, lon, r = RADIUS) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    };

    const hubs = [
      { name: "New York", lat: 40.7, lon: -74 }, { name: "London", lat: 51.5, lon: -0.1 },
      { name: "Tokyo", lat: 35.6, lon: 139.6 }, { name: "Dubai", lat: 25.2, lon: 55.2 },
      { name: "Sydney", lat: -33.8, lon: 151.2 }, { name: "Singapore", lat: 1.3, lon: 103.8 },
      { name: "Sao Paulo", lat: -23.5, lon: -46.6 }, { name: "San Francisco", lat: 37.7, lon: -122.4 },
      { name: "Frankfurt", lat: 50.1, lon: 8.6 }, { name: "Mumbai", lat: 19.0, lon: 72.8 },
      { name: "Johannesburg", lat: -26.2, lon: 28.0 }, { name: "Hong Kong", lat: 22.3, lon: 114.1 }
    ];

    const connections = [
      [0,1], [1,2], [2,4], [0,6], [3,5], [1,3], [5,2], [7,0], [8,1], [9,3], [10,3], [11,5], [7,2]
    ];

    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const interactableNodes = [];
    const activePings = [];
    const dataPulses = [];

    const nodeMat = new THREE.MeshBasicMaterial({ color: initCfg.nodes });
    const lineMat = new THREE.LineBasicMaterial({ color: initCfg.lines, transparent: true, opacity: initCfg.linesOpacity });
    const pingMat = new THREE.MeshBasicMaterial({ color: initCfg.ping, transparent: true, opacity: 1, side: THREE.DoubleSide, depthWrite: false });
    const pulseMat = new THREE.MeshBasicMaterial({ color: initCfg.pulse });

    hubs.forEach((hub) => {
      const pos = getSphericalPos(hub.lat, hub.lon);
      
      const nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = hub;
      arcsGroup.add(nodeMesh);
      interactableNodes.push(nodeMesh);

      const ringMesh = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.18, 32), pingMat.clone());
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0,0,0));
      arcsGroup.add(ringMesh);
      activePings.push({ mesh: ringMesh, scale: 1, opacity: 1, speed: 0.01 + Math.random() * 0.01 });
    });

    connections.forEach(([startIdx, endIdx]) => {
      const startPos = getSphericalPos(hubs[startIdx].lat, hubs[startIdx].lon);
      const endPos = getSphericalPos(hubs[endIdx].lat, hubs[endIdx].lon);
      const dist = startPos.distanceTo(endPos);
      
      const midPoint = startPos.clone().lerp(endPos, 0.5);
      midPoint.normalize().multiplyScalar(RADIUS + dist * 0.3); 

      const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      arcsGroup.add(new THREE.Line(curveGeo, lineMat));

      const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), pulseMat);
      arcsGroup.add(pulseMesh);
      dataPulses.push({ mesh: pulseMesh, curve: curve, t: Math.random(), speed: 0.003 + Math.random() * 0.002 });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactableNodes);

      if (intersects.length > 0) {
        document.body.style.cursor = 'crosshair';
        controls.autoRotate = false;
        const node = intersects[0].object.userData;
        
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1';
          tooltipRef.current.style.left = `${e.clientX - rect.left}px`;
          tooltipRef.current.style.top = `${e.clientY - rect.top}px`;
          tooltipRef.current.innerHTML = `
            <div class="font-bold text-[var(--ink-bright)] uppercase">${node.name}</div>
            <div class="text-[9px] mt-1 text-[var(--cyan)]">LAT: ${node.lat.toFixed(2)} / LON: ${node.lon.toFixed(2)}</div>
          `;
        }
      } else {
        document.body.style.cursor = 'default';
        controls.autoRotate = true;
        if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
      }
    };
    stage.addEventListener("mousemove", onMouseMove);

    // EXACT 3-WAY THEME OBSERVER INTEGRATION
    const updateThreeTheme = () => {
      let currentTheme = "dark";
      if (document.documentElement.classList.contains("light")) currentTheme = "light";
      if (document.documentElement.classList.contains("theme-monochrome")) currentTheme = "monochrome";
      
      const cfg = GLOBE_THEME[currentTheme];

      coreMat.color.setHex(cfg.core);
      coreMat.opacity = cfg.coreOpacity;
      atmoMat.color.setHex(cfg.atmo);
      dotsMat.color.setHex(cfg.dots);
      lineMat.color.setHex(cfg.lines);
      nodeMat.color.setHex(cfg.nodes);
      pulseMat.color.setHex(cfg.pulse);

      activePings.forEach(p => {
        p.mesh.material.color.setHex(cfg.ping);
      });
    };

    // Watch for root HTML class changes to smoothly swap themes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateThreeTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const resize = () => {
      camera.aspect = stage.clientWidth / stage.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(stage.clientWidth, stage.clientHeight, false);
    };
    window.addEventListener("resize", resize);
    resize();

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      controls.update(); 
      
      let angle = (controls.getAzimuthalAngle() * (180 / Math.PI));
      if(angle < 0) angle += 360;
      setHeading(`${angle.toFixed(1)}°`);

      activePings.forEach(ping => {
        ping.scale += ping.speed;
        ping.opacity -= ping.speed * 1.5;
        if (ping.opacity <= 0) { ping.scale = 1; ping.opacity = 1; }
        ping.mesh.scale.set(ping.scale, ping.scale, ping.scale);
        ping.mesh.material.opacity = ping.opacity;
      });

      dataPulses.forEach(pulse => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) pulse.t = 0;
        pulse.mesh.position.copy(pulse.curve.getPoint(pulse.t));
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // --- Clean up the strict scroll listeners ---
      stage.removeEventListener("wheel", preventPageScroll);
      stage.removeEventListener("touchmove", preventPageScroll);
      canvas.removeEventListener("wheel", preventPageScroll);
      canvas.removeEventListener("touchmove", preventPageScroll);
      
      stage.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect(); // Clean up observer
      clearInterval(timerInterval);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      scene.traverse(object => {
        if (!object.isMesh && !object.isPoints && !object.isLine) return;
        object.geometry.dispose();
        if (object.material.isMaterial) object.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ touchAction: 'none' }}
      className="globe-wrapper relative w-full aspect-square min-h-[420px] max-h-[640px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] dark:shadow-none z-10 transition-colors duration-500"
    >
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full outline-none" />
      
      <div className="globe-vignette" />
      <div className="globe-scanlines" />

      <div ref={tooltipRef} className="node-tooltip" />
      
      {!hideHUD && (
        <>
          <div className="globe-hud top-[24px] left-[26px]">
            <div className="text-[9.5px] font-semibold text-[var(--cyan-dim)] tracking-[0.3em] mb-1.5 uppercase flex items-center gap-2">
              <span className="w-2 h-2 border border-[var(--cyan-dim)] block"></span>
              SYS // WORLDNET-01
            </div>
            <h2 className="hud-title text-base font-bold text-[var(--ink-bright)] tracking-[0.1em] m-0 uppercase">
              Global Network
            </h2>
            <div className="mt-1 text-[9.5px] text-[var(--ink-dim)] tracking-[0.2em] uppercase border-l-2 border-[var(--cyan)] pl-2">
              Real-time node sync
            </div>
          </div>

          <div className="globe-hud hud-badge top-[24px] right-[26px] text-right text-[9.5px] uppercase">
            <div className="flex items-center justify-end font-semibold text-[var(--ink-bright)]">
              <span className="dot"></span>LIVE
            </div>
            <div className="mt-1.5 text-[var(--ink-dim)] tracking-[0.1em] font-mono bg-[var(--surface)]/50 px-2 py-1 rounded backdrop-blur-sm border border-[var(--border)]">
              UPTIME <span style={{ color: "var(--cyan)" }}>{uptime}</span>
            </div>
          </div>
          
          <div className="globe-hud bottom-[24px] left-[26px] text-[9.5px] tracking-[0.2em] space-y-1.5 font-mono">
            <div className="flex justify-between w-[140px] border-b border-[var(--border)] pb-1">
              <span>ACTIVE NODES</span>
              <span className="text-[var(--cyan)] font-bold">12</span>
            </div>
            <div className="flex justify-between w-[140px] border-b border-[var(--border)] pb-1">
              <span>LINK PATHS</span>
              <span className="text-[var(--cyan)] font-bold">13</span>
            </div>
            <div className="flex justify-between w-[140px]">
              <span>HEADING</span>
              <span className="text-[var(--cyan)] font-bold">{heading}</span>
            </div>
          </div>

          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--cyan-dim)] opacity-50 pointer-events-none z-10 transition-colors duration-500" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--cyan-dim)] opacity-50 pointer-events-none z-10 transition-colors duration-500" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--cyan-dim)] opacity-50 pointer-events-none z-10 transition-colors duration-500" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--cyan-dim)] opacity-50 pointer-events-none z-10 transition-colors duration-500" />
        </>
      )}
    </div>
  );
}