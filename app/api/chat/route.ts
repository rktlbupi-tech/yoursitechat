
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Bot, Conversation } from '@/lib/models';
import { Types } from 'mongoose';

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { botId, message, conversationId } = await req.json();

    if (!botId || !message) {
      return NextResponse.json({ error: 'Missing botId or message' }, { status: 400 });
    }

    const bot = await Bot.findById(botId);
    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    if (!conversation) {
      conversation = await Conversation.create({
        botId,
        messages: []
      });
    }

    // Add User Message
    conversation.messages.push({
      role: 'user',
      content: message,
      createdAt: new Date()
    });

    // Mock AI Logic
    // In a real app, I would call OpenAI/Gemini here using bot.trainingData as system prompt context.
    // For now, I will use a simple heuristic or echo.
    // Enhanced NLP / Heuristic Logic
    // 0. Pre-process User Message
    const lowerMsg = message.toLowerCase();
    
    // 1. Define Semantic Aliases (Map user intent to data keys)
    const aliases: Record<string, string[]> = {
        'phone': ['phone', 'call', 'mobile', 'contact', 'number', 'reach'],
        'email': ['email', 'mail', 'contact', 'reach'],
        'address': ['address', 'location', 'where', 'located', 'visit', 'office'],
        'services': ['service', 'product', 'offer', 'do', 'help', 'provide'],
        'pricing': ['price', 'cost', 'pay', 'plan', 'pricing']
    };

    // 2. Specialized Field Extraction (Explicitly look for structured data provided in form)
    let explicitAnswer = '';
    
    // Check for Phone/Contact intent
    if (aliases.phone.some(k => lowerMsg.includes(k))) {
        // If user specifically asks about "website" or "online", look for scraped phone first
        if (lowerMsg.includes('website') || lowerMsg.includes('online') || lowerMsg.includes('web')) {
             const scrapedPhoneMatch = bot.trainingData.match(/Scraped Phone:\s*(.+)/i);
             if (scrapedPhoneMatch && scrapedPhoneMatch[1].trim()) {
                 explicitAnswer += `On the website, I found this number: ${scrapedPhoneMatch[1].trim()}. `;
             } else {
                 // Website number requested but not found
                 explicitAnswer += `I couldn't find a specific phone number on the website content. `;
             }
        }
        
        // If we haven't given a definitive number yet (or just gave a "not found" message), offer the business phone
        const phoneMatch = bot.trainingData.match(/Phone:\s*(.+)/i);
        if (phoneMatch) {
            if (explicitAnswer.includes('I couldn\'t find')) {
                 explicitAnswer += `However, our registered business contact number is ${phoneMatch[1].trim()}. `;
            } else if (!explicitAnswer) {
                 explicitAnswer += `You can reach us at ${phoneMatch[1].trim()}. `;
            }
        }
    }

    // Check for Email intent (if not already answered by phone check or combined)
    if (aliases.email.some(k => lowerMsg.includes(k)) && !explicitAnswer.includes('@')) {
         const emailMatch = bot.trainingData.match(/Email:\s*(.+)/i); // Assuming we added Email: to data? We didn't explicitly in instant route, checking...
         // In instant route we didn't add Email label, let's look for emails in text generally
         const emails = bot.trainingData.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
         if (emails && emails.length > 0) {
             explicitAnswer += `Our email address is ${emails[0]}. `;
         }
    }

    // Check for Address
    if (aliases.address.some(k => lowerMsg.includes(k))) {
         const addrMatch = bot.trainingData.match(/Address:\s*(.+)/i);
         if (addrMatch) explicitAnswer += `We are located at ${addrMatch[1].trim()}. `;
    }

    let botResponseContent = '';

    if (explicitAnswer) {
        // Use the explicit structured answer if found
        botResponseContent = explicitAnswer;
    } else {
        // 3. Fallback to General RAG (Keyword Matching on Scraped Content)
        
        // Split data into meaningful chunks (lines or sentences)
        const dataChunks = bot.trainingData.split(/[\n.!?]+/).filter((c: string) => c.trim().length > 15);
        
        const userKeywords = lowerMsg.split(' ').filter((w: string) => w.length > 3);
        
        // Score chunks
        const scoredChunks = dataChunks.map((chunk: string) => {
            const lowerChunk = chunk.toLowerCase();
            let score = 0;
            userKeywords.forEach((keyword: string) => {
                if (lowerChunk.includes(keyword)) score += 1;
            });
            return { chunk, score };
        });

        // Get top results
        const topChunks = scoredChunks
            .filter((item: any) => item.score > 0)
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 2)
            .map((item: any) => item.chunk.trim());

        if (topChunks.length > 0) {
            // Natural language wrapping
            const templates = [
                "Here is what I found: ",
                "According to our information: ",
                "Regarding that: ",
                ""
            ];
            const prefix = templates[Math.floor(Math.random() * templates.length)];
            botResponseContent = `${prefix}${topChunks.join('. ')}.`;
        } else {
            // 4. Conversational Fallbacks
            if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
                botResponseContent = bot.welcomeMessage;
            } else if (lowerMsg.includes('thank')) {
                botResponseContent = "You're welcome! Is there anything else I can help you with?";
            } else if (lowerMsg.includes('bye')) {
                botResponseContent = "Goodbye! Have a great day.";
            } else {
                botResponseContent = `I understand you're asking about "${message}", but I don't have that specific information right now. Requires an LLM for deeper understanding.`;
            }
        }
    }
    
    // Add Bot Message
    conversation.messages.push({
      role: 'assistant',
      content: botResponseContent,
      createdAt: new Date()
    });

    await conversation.save();

    return NextResponse.json({
      conversationId: conversation._id,
      message: {
        role: 'assistant',
        content: botResponseContent
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
