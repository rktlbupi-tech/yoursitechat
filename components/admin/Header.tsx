
import { Button } from '@/components/ui/button';
import { User, Bell } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function AdminHeader() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-sm">
      <div className="w-full flex-1">
        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
}
