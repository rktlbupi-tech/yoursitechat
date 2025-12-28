
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-zinc-900/50 dark:border-zinc-800">
      <div className="container flex flex-col gap-8 py-12 px-4 md:px-6 mx-auto md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link className="flex items-center gap-2 font-bold text-xl" href="/">
              <Bot className="h-6 w-6" />
              <span>YourSiteChat</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Transform your business with intelligent AI chatbots trained on your data.
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Product</h3>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Pricing</Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Blog</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Contact</Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Company</h3>
            <Link href="/about" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">About Us</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">Terms of Service</Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Contact</h3>
            <a href="mailto:contact@yoursitechat.com" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">contact@yoursitechat.com</a>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-8 border-t dark:border-zinc-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 YourSiteChat. All rights reserved.
          </p>
          <div className="flex gap-4">
             <Link href="/privacy" className="text-xs text-gray-500 hover:underline">Privacy</Link>
             <Link href="/terms" className="text-xs text-gray-500 hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
