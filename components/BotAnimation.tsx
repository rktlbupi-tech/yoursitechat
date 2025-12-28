'use client';

import { motion } from 'framer-motion';

export default function BotAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[250px] h-[250px] border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute w-[350px] h-[350px] border-t border-b border-blue-400/10 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Main Bot Entity */}
      <motion.div 
        animate={{ 
            y: [0, -20, 0],
            rotateZ: [0, 2, -2, 0]
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
        }}
        className="relative z-10"
      >
        {/* Robot Head */}
        <div className="relative w-32 h-40 bg-gradient-to-b from-white to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-700 overflow-hidden flex flex-col items-center pt-8 backdrop-blur-sm">
            
            {/* Antenna */}
             <div className="absolute -top-6 w-1 h-8 bg-gray-300 dark:bg-zinc-600">
                <div className="absolute -top-2 -left-1.5 w-4 h-4 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
             </div>

            {/* Face Screen */}
            <div className="w-24 h-20 bg-black rounded-xl border border-gray-800 flex items-center justify-center gap-3 relative overflow-hidden group">
                {/* Scanline */}
                <div className="absolute top-0 w-full h-full bg-linear-to-b from-transparent via-blue-500/10 to-transparent animate-[scan_2s_linear_infinite]" />
                
                {/* Eyes */}
                <motion.div 
                    animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 1] }}
                    className="w-6 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                />
                <motion.div 
                    animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 1] }}
                    className="w-6 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                />
            </div>

            {/* Mouth / Speaker */}
            <div className="mt-4 flex gap-1">
                <div className="w-1 h-3 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                <div className="w-1 h-3 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                <div className="w-1 h-3 bg-gray-300 dark:bg-zinc-700 rounded-full" />
            </div>
            
            {/* Glow Reflection */}
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Floating Shadow */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 dark:bg-black/50 blur-xl rounded-full" />
      </motion.div>

      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono shadow-sm border dark:border-zinc-700"
         >
            AI Online
         </motion.div>
         <motion.div 
            animate={{ x: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono shadow-sm border dark:border-zinc-700"
         >
            Analyzing...
         </motion.div>
      </div>
    </div>
  );
}
