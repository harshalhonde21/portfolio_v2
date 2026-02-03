import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PerformanceWrapper } from "@/components/providers/PerformanceWrapper";
import { NarrationWrapper } from "@/components/providers/NarrationWrapper";
import { XRayWrapper } from "@/components/providers/XRayWrapper";
import { AdminAuthProvider } from "@/components/providers/AdminAuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { HackerLobby } from "@/components/admin/HackerLobby";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import {
  siteMetadata,
  getPersonStructuredData,
  getWebsiteStructuredData,
} from "@/app/seo";
import { jetbrainsMono, orbitron } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${orbitron.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonStructuredData()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteStructuredData()),
          }}
        />
      </head>
      <body className="min-h-screen font-mono antialiased scrollbar-cyber">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="cyberpunk-dark"
          enableSystem={false}
          themes={["cyberpunk-dark", "cyberpunk-light"]}
          disableTransitionOnChange
        >
          <PerformanceWrapper>
            <NarrationWrapper>
              <XRayWrapper>
                <ToastProvider>
                  <AdminAuthProvider>
                    <div className="relative flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-1">{children}</main>
                      <Footer />
                      <ScrollToTop />
                      <HackerLobby />
                    </div>
                  </AdminAuthProvider>
                </ToastProvider>
              </XRayWrapper>
            </NarrationWrapper>
          </PerformanceWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
