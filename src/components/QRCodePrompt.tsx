import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone, QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import profileImage from "@/assets/profile-cropped.png";

export const QRCodePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Show prompt after 2 seconds
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("qr-prompt-dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("qr-prompt-dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  // Generate QR code URL - links to manifest for PWA install
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
  const qrCodeValue = currentUrl + "?utm_source=qr&utm_medium=scan";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br from-card via-card to-secondary/50 border border-accent/30 shadow-2xl shadow-accent/20 text-center"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>

          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-accent/50 shadow-lg mb-4"
          >
            <img
              src={profileImage}
              alt="Hanan Irfan"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold mb-2"
          >
            Hanan Irfan App
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-6"
          >
            Scan to install or access on any device
          </motion.p>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto w-48 h-48 p-3 bg-white rounded-2xl shadow-lg mb-6 flex items-center justify-center"
          >
            <QRCode
              value={qrCodeValue}
              size={168}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-6"
          >
            <span className="flex items-center gap-1">
              <Smartphone size={14} />
              Mobile
            </span>
            <span className="flex items-center gap-1">
              <QrCode size={14} />
              Scan Me
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={handleDismiss}
            className="w-full py-3 bg-gradient-to-r from-accent to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Continue to Website
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
