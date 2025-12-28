
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <Link href="/admin/bots/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Bot
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Bots</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground mt-1">+0 from last month</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
           <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Conversations</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
           <p className="text-xs text-muted-foreground mt-1">+0% from last month</p>
        </div>
      </div>
      
      <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">You have no recent activity.</p>
        </div>
        <div className="p-6 pt-0">
          <div className="flex items-center justify-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
            No bots created yet.
          </div>
        </div>
      </div>
    </div>
  );
}
