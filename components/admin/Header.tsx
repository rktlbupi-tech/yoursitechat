
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-50/40 px-6 dark:bg-zinc-800/40">
      <div className="w-full flex-1">
        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <User className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </header>
  );
}
