
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming we'll create a generic button or use basic tailwind for now.
import { ArrowRight } from 'lucide-react';

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
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="#demo"
            className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            View Demo
          </Link>
        </div>
        
        {/* Interactive 3D Bot Demo */}
        <div className="mt-16 relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-gray-50/50 p-2 shadow-2xl lg:rounded-2xl dark:bg-zinc-900/50 dark:border-zinc-800">
            <div className="rounded-lg bg-white dark:bg-black aspect-video flex items-center justify-center overflow-hidden">
                <iframe 
                    src='https://my.spline.design/robot-1865c92c816073155822363765181930/' 
                    frameBorder='0' 
                    width='100%' 
                    height='100%'
                    className="w-full h-full pointer-events-auto"
                    title="3D Robot Demo"
                ></iframe>
            </div>
        </div>
      </div>
    </section>
  );
}
