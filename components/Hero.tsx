
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming we'll create a generic button or use basic tailwind for now.
import { ArrowRight } from 'lucide-react';
import BotAnimation from './BotAnimation';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center lg:py-32 bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-zinc-900">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
      
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
          Transform Your Business <br className="hidden md:inline" />
          with AI Chatbots
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Create intelligent chatbots trained on your business data in minutes. Engage customers 24/7, boost sales, and reduce support costs. No coding required.
        </p>
        <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row justify-center">
          <Link
            href="/create"
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="#demo"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Demo
          </Link>
        </div>
        
        {/* Interactive 3D Bot Demo */}
        <div className="mt-16 relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl p-8 shadow-2xl ring-1 ring-white/10 dark:ring-white/5">
            <div className="rounded-xl bg-gradient-to-b from-blue-50/50 to-white/50 dark:from-zinc-900/50 dark:to-black/50 border border-border/50 aspect-video flex items-center justify-center overflow-hidden relative group">
                <BotAnimation />
            </div>
        </div>
      </div>
    </section>
  );
}
