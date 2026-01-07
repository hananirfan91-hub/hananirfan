import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdBanner } from "./AdBanner";
import { BackgroundMusic } from "./BackgroundMusic";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Leaderboard Ad Banner */}
      <div className="hidden md:block pt-20 pb-2 px-4">
        <AdBanner />
      </div>
      <main className="flex-1 pt-0 md:pt-0">{children}</main>
      <Footer />
      <BackgroundMusic />
    </div>
  );
};
