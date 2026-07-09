import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollWrapper from "@/components/ui/SmoothScrollWrapper";
// Font configurations
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "NodeXstack Software Solutions | Engineering Scalable Digital Solutions",
  description: "We build intelligent, high-performance digital products that help businesses scale with confidence.",
};

export default function RootLayout({ children }) {
  return (
    // Suppress hydration warning is necessary here because the injected script modifies the class attribute before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let isDark = localStorage.getItem('nodexstack-theme') === 'dark' || (!('nodexstack-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen flex flex-col relative`}>
        <SmoothScrollWrapper>
        {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}