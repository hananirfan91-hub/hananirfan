import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdBanner } from "./AdBanner";
import { BackgroundMusic } from "./BackgroundMusic";
import { QRCodePrompt } from "./QRCodePrompt";
import { LiveVisitors } from "./LiveVisitors";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <QRCodePrompt />
      <LiveVisitors />
      {/* Leaderboard Ad Banner - visible on all screens */}
      <div className="pt-16 md:pt-20 pb-2 px-2 md:px-4">
        <AdBanner />
      </div>
      <main className="flex-1 pt-0">{children}</main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};
