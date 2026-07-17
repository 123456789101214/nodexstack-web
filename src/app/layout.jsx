// app/layout.jsx
import { Inter, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/common/SmoothScroll";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

// Typography Setup
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Advanced SEO Metadata
export const metadata = {
  title: "NodeXstack | Premium AI Software Solutions",
  description: "Billion-dollar AI software company. We engineer world-class, scalable, and premium digital solutions for 2026 and beyond.",
  keywords: ["AI Software", "SaaS Development", "Next.js Agency", "Enterprise Architecture"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} dark`} style={{ colorScheme: 'dark' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('nodexstack-theme');
                const html = document.documentElement;
                
                if (savedTheme === 'monochrome') {
                  html.classList.add('theme-monochrome');
                  html.setAttribute('data-theme', 'monochrome');
                } else if (savedTheme === 'light') {
                  html.classList.add('light');
                  html.setAttribute('data-theme', 'light');
                } else {
                  html.classList.add('dark');
                  html.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent-cyan selection:text-background overflow-x-hidden cursor-none">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}