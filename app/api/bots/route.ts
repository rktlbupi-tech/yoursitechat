
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Bot } from '@/lib/models';

export async function GET() {
  await connectToDatabase();
  try {
    const bots = await Bot.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ bots });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bots' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { name, welcomeMessage, trainingData } = body;
    
    // TODO: Get actual user ID from session
    const userId = "65a000000000000000000000"; // Mock ID
    
    const bot = await Bot.create({
      userId,
      name,
      welcomeMessage,
      trainingData
    });
    
    return NextResponse.json({ bot }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
  }
}
