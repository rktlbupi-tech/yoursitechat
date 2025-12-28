'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Settings, LogOut, Bot, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bots', label: 'My Bots', icon: Bot },
    { href: '/admin/conversations', label: 'Conversations', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden border-r border-border bg-muted/20 lg:block w-64 min-h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b border-border px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot className="h-5 w-5" />
            </div>
            <span className="">Gchat</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            {links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            isActive 
                                ? "bg-primary text-primary-foreground hover:text-primary-foreground shadow-sm" 
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {link.label}
                    </Link>
                );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
             <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <h4 className="font-semibold mb-1 text-sm text-blue-900 dark:text-blue-100">Need Help?</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">Check our documentation for guide.</p>
                <Link href="/docs">
                    <Button size="sm" variant="outline" className="w-full h-8 text-xs border-blue-200 dark:border-blue-800 bg-white dark:bg-transparent text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                        Documentation
                    </Button>
                </Link>
             </div>
        </div>
      </div>
    </aside>
  );
}
