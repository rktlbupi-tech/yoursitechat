
import Link from 'next/link';
import { LayoutDashboard, MessageSquare, Settings, LogOut, Bot, Code } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="hidden border-r bg-gray-50/40 lg:block dark:bg-zinc-800/40 w-64 min-h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Bot className="h-6 w-6" />
            <span className="">YourSiteBot</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50 bg-gray-100 dark:bg-zinc-800"
              href="/admin"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/admin/bots"
            >
              <Bot className="h-4 w-4" />
              My Bots
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/admin/conversations"
            >
              <MessageSquare className="h-4 w-4" />
              Conversations
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/admin/settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-1">Need Help?</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Check our documentation for guide.</p>
                <Link href="/docs" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Documentation</Link>
             </div>
        </div>
      </div>
    </aside>
  );
}
