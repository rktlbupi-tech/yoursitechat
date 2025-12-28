
import connectToDatabase from '@/lib/db';
import { Bot } from '@/lib/models';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Code, MessageSquare, Save } from 'lucide-react';
import { notFound } from 'next/navigation';
import EmbedCodeViewer from '@/components/admin/EmbedCodeViewer';

async function getBot(id: string) {
  await connectToDatabase();
  try {
    const bot = await Bot.findById(id);
    if (!bot) return null;
    return JSON.parse(JSON.stringify(bot));
  } catch (error) {
    return null;
  }
}

export default async function BotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bot = await getBot(id);

  if (!bot) {
    notFound();
  }

  // TODO: Use actual host
  const embedCode = `<script src="http://localhost:3000/embed.js" data-bot-id="${bot._id}"></script>`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/admin/bots">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{bot.name}</h2>
          <p className="text-sm text-muted-foreground">ID: {bot._id}</p>
        </div>
        <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Configuration
            </h3>
            <div className="space-y-4">
                 <div className="grid gap-2">
                    <label className="text-sm font-medium">Bot Name</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" defaultValue={bot.name} />
                 </div>
                 <div className="grid gap-2">
                    <label className="text-sm font-medium">Welcome Message</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" defaultValue={bot.welcomeMessage} />
                 </div>
                 <div className="grid gap-2">
                    <label className="text-sm font-medium">Training Data</label>
                    <textarea className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" defaultValue={bot.trainingData} />
                 </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
             <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-4 w-4" /> Embed Code
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Copy and paste this code into your website's HTML to add the chatbot.
                </p>
                <EmbedCodeViewer botId={bot._id} />
            </div>
             <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold mb-4">Preview</h3>
                <div className="flex h-[400px] items-center justify-center border-2 border-dashed rounded-lg bg-gray-50/50">
                    <p className="text-muted-foreground">Chat Preview (Coming Soon)</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
