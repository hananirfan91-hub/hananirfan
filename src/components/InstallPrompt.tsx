import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 3 seconds
      setTimeout(() => setShowPrompt(true), 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-card via-card to-secondary/50 p-6 shadow-2xl shadow-accent/20 backdrop-blur-xl">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 animate-shimmer" />
          
          {/* Sparkle Effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-12 text-accent/50"
          >
            <Sparkles size={16} />
          </motion.div>

          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <X size={18} className="text-muted-foreground" />
          </button>

          <div className="relative z-10 flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-accent to-blue-500 shadow-lg shadow-accent/30"
            >
              <Download className="text-white" size={24} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground mb-1">Install Hanan Irfan App</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the full experience! Install for offline access, faster loading & instant updates.
              </p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Smartphone size={14} />
                  Mobile
                </span>
                <span className="flex items-center gap-1">
                  <Monitor size={14} />
                  Desktop
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleInstall}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-400 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30"
                >
                  Install Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium text-sm transition-all"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
