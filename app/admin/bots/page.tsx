
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Bot as BotIcon, MessageSquare } from 'lucide-react';
import connectToDatabase from '@/lib/db';
import { Bot } from '@/lib/models'; // Ensure this model exists and is exported correctly

async function getBots() {
  await connectToDatabase();
  // TODO: Filter by actual user ID
  const bots = await Bot.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(bots)); // Serialize ObjectId and Date
}

export default async function BotsPage() {
  const bots = await getBots();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Bots</h2>
        <Link href="/admin/bots/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Bot
          </Button>
        </Link>
      </div>

      {bots.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-gray-50/50">
           <BotIcon className="h-12 w-12 text-gray-400 mb-4" />
           <h3 className="text-lg font-semibold">No bots created yet</h3>
           <p className="text-muted-foreground mb-4">Create your first AI chatbot to get started.</p>
           <Link href="/admin/bots/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Bot
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot: any) => (
            <div key={bot._id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <BotIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold leading-none tracking-tight">{bot.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Created {new Date(bot.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 line-clamp-2">{bot.welcomeMessage}</p>
                </div>
              </div>
              <div className="flex items-center border-t bg-gray-50/50 p-4 dark:bg-zinc-800/50">
                 <Link href={`/admin/bots/${bot._id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        Manage Bot
                    </Button>
                 </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
