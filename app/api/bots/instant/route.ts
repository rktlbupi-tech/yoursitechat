
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Bot, User } from '@/lib/models';
import { Types } from 'mongoose';
import { scrapeWebsite } from '@/lib/scraper';

export async function POST(req: Request) {
  await connectToDatabase();
  
  try {
    const body = await req.json();
    const { 
        yourName, 
        businessName, 
        websiteUrl, 
        phone, 
        email, 
        address, 
        description, 
        primaryColor, 
        secondaryColor 
    } = body;

    // Validate essential fields
    if (!businessName || !websiteUrl) {
         return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since this is an "Instant" creator, we need to handle User creation implicitly 
    // or link to a temporary user.
    // For now, let's create a User if one doesn't exist with this email, or find the existing one.
    // Password will be random or they will need to reset it. 
    // Or we just store a "Guest" user ID.
    
    // For MVP, if email is provided, try to find user. 
    // If not, use a valid ObjectId placeholder for "Guest/Instant" user. 
    // Note: User Model requires email/password.
    // Real implementation: Create a user with temp password and email them.
    
    // Hack for Demo:
    let userId = new Types.ObjectId(); // Random ID
    
    // Check if user exists (if email provided)
    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            userId = existingUser._id;
        } else {
            // Create new user (simplified)
            // Warning: Model requires password.
            const newUser = await User.create({
                email,
                password: Math.random().toString(36).slice(-8), // Temp password
                businessName,
                name: yourName
            });
            userId = newUser._id;
        }
    }

    // Scrape Website (Multi-page Smart Scrape)
    let scrapedData = null;
    let extractedPhones: string[] = [];
    let extractedEmails: string[] = [];

    try {
        if (websiteUrl) {
           scrapedData = await scrapeWebsite(websiteUrl);
           extractedPhones = scrapedData.contacts.phones;
           extractedEmails = scrapedData.contacts.emails;
        }
    } catch (e) {
        console.error("Failed to scrape website:", e);
    }
    
    // Combine training data
    const trainingData = `
        Business Name: ${businessName}
        Website: ${websiteUrl}
        Phone: ${phone}
        Address: ${address}
        Description: ${description}
        
        --- Scraped Contacts ---
        Emails: ${extractedEmails.join(', ')}
        Phones: ${extractedPhones.join(', ')}

        --- Scraped Website Content ---
        ${scrapedData ? scrapedData.rawText : '(Could not scrape content)'}
    `;

    const bot = await Bot.create({
        userId,
        name: businessName + " Assistant", // Auto-name bot
        welcomeMessage: `Hi! Welcome to ${businessName}. How can I assist you today?`,
        trainingData,
        primaryColor,
        // We might want to store secondaryColor too in schema if not present, but ignoring for now.
    });
    
    return NextResponse.json({ botId: bot._id }, { status: 201 });

  } catch (error: any) {
    console.error('Instant Bot Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
