"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare } from "lucide-react";

export default function WidgetLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const botId = "6950ba12af055bebf9c2846d"; // Hardcoded for the main site

  // Prevent hydration mismatch & Check if inside iframe
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render if not mounted or if running inside an iframe (recursion protection)
  if (!isMounted) return null;
  if (typeof window !== 'undefined' && window.self !== window.top) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Chat Widget Iframe */}
      <AnimatePresence>
        {isOpen && (
          <motion.iframe
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            src={`/widget/${botId}`}
            className="w-[350px] h-[500px] max-h-[70vh] max-w-[90vw] border-0 rounded-2xl shadow-2xl bg-white mb-2"
          />
        )}
      </AnimatePresence>

      {/* 3D Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-16 h-16 rounded-full focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Container for the 3D Content */}
        <div className="absolute inset-0 rounded-full shadow-lg shadow-blue-500/30 overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 border border-white/10">
            {/* Common Background Shine */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    isHovered ? (
                        /* HOVER STATE: 3D Cube/Logo */
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-center text-white"
                        >
                           <MessageSquare className="w-8 h-8 fill-current" />
                        </motion.div>
                    ) : (
                         /* DEFAULT STATE: "Other 3D" (Robot Face) */
                        <motion.div
                            key="robot"
                            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-center bg-zinc-900"
                        >
                            {/* Mini 3D Robot Face */}
                            <div className="relative w-10 h-10 bg-zinc-800 rounded-xl border border-zinc-600 flex items-center justify-center gap-1 shadow-inner overflow-hidden">
                                {/* Eyes */}
                                <motion.div 
                                    animate={{ scaleY: [1, 0.2, 1] }} 
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="w-2 h-3 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,1)]" 
                                />
                                <motion.div 
                                    animate={{ scaleY: [1, 0.2, 1] }} 
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="w-2 h-3 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,1)]" 
                                />
                                {/* Scanline */}
                                <div className="absolute top-0 w-full h-px bg-blue-400/50 animate-[scan_1.5s_linear_infinite]" />
                            </div>
                        </motion.div>
                    )
                ) : (
                    /* OPEN STATE: Close Icon */
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full flex items-center justify-center text-white"
                    >
                        <X className="w-8 h-8" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        {/* Orbital Ring (Decorative) */}
        {!isOpen && (
            <div className="absolute -inset-1 border border-blue-400/30 rounded-full animate-[spin_4s_linear_infinite]" />
        )}
      </motion.button>
    </div>
  );
}
