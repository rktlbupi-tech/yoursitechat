
'use client';

import { useState, useEffect, useRef, use } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Assuming cn utility is there or in button.tsx I exported it? 
// Wait, I put cn in button.tsx but generally it should be in lib/utils.ts. 
// I will check if lib/utils.ts exists or create it. 
// For now I'll inline a simple class merger or import from button (awkward but works if exported).
// Actually, I'll creates lib/utils.ts quickly or just use `clsx` and `tailwind-merge` directly here if needed, 
// but creating lib/utils.ts is better practice. I'll mock it for now inside the file or assume I can create it.
// I'll create `lib/utils.ts` in the same batch or just assume I can use `clsx` and `twMerge` here if installed.


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function Typewriter({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayText(''); // Reset on new text
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Speed

    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
}

export default function WidgetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [botName, setBotName] = useState('Assistant');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch Bot Info
    async function fetchBot() {
      try {
        // We can create a specific endpoint for widget-bot-info or just use the bots API if public (it's not secured yet so fine)
        // Or I can use a server action. 
        // I'll fetch from a new endpoint or just hardcode for demo if complexity is too high, 
        // but cleaner is to fetch. 
        // Note: The /api/bots route returns ALL bots. I need /api/bots/[id].
        // I haven't created /api/bots/[id] GET route yet. I only made /api/bots GET/POST.
        // I will implement fetching logic inside this component via a direct server action wrapper or just 
        // add a useEffect to call an endpoint I WILL create or just fetch the list and find (inefficient but works for 1 bot).
        // Better: I'll create /api/widgets/config/[id] or similar.
        // Or just `GET /api/bots?id=...` I'll assume I can add a route or usage.
        // For now, I'll fetch the list and filter. (MVP Hack).
        
        const res = await fetch('/api/bots');
        const data = await res.json();
        const bot = data.bots.find((b: any) => b._id === id);
        
        if (bot) {
            setBotName(bot.name);
            setWelcomeMessage(bot.welcomeMessage);
            setMessages([{ role: 'assistant', content: bot.welcomeMessage }]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchBot();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botId: id,
          message: userMsg,
          conversationId
        }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.conversationId) setConversationId(data.conversationId);
      setMessages(prev => [...prev, data.message]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="flex h-screen items-center justify-center p-4">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-semibold">{botName}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
              msg.role === 'user' 
                ? "ml-auto bg-blue-600 text-white rounded-br-none" 
                : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
            )}
          >
            {/* Apply typewriter effect only to the latest assistant message */}
            {msg.role === 'assistant' && idx === messages.length - 1 ? (
               <Typewriter text={msg.content} />
            ) : (
               msg.content
            )}
          </div>
        ))}
        {loading && (
             <div className="max-w-[80%] bg-white rounded-2xl rounded-bl-none px-4 py-2 border border-gray-100 shadow-sm w-fit">
                <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
            </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-blue-600 hover:bg-blue-700 shrink-0"
            disabled={loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {/* <div className="mt-2 text-center text-[10px] text-gray-400">
            For your love. No hidden fees. Completly Free.
        </div> */}
      </div>
    </div>
  );
}
