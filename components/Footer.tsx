
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container flex flex-col gap-8 py-12 px-4 md:px-6 mx-auto md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link className="flex items-center gap-2 font-bold text-xl" href="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Gchat</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transform your business with intelligent AI chatbots trained on your data.
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Product</h3>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg">Contact</h3>
            <a href="mailto:contact@gchat.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">contact@gchat.com</a>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2025 Gchat. All rights reserved.
          </p>
          <div className="flex gap-4">
             <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground hover:underline">Privacy</Link>
             <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
