
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Bot, User } from '@/lib/models';
import { Types } from 'mongoose';

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

    // Scrape Website
    let scrapedContent = '';
    try {
        if (websiteUrl) {
            const cheerio = require('cheerio');
            const res = await fetch(websiteUrl);
            const html = await res.text();
            const $ = cheerio.load(html);
            
            // Extract text from reasonable elements
            $('p, h1, h2, h3, h4, h5, li, a, span').each((_: any, el: any) => {
                const text = $(el).text().trim();
                // Filter out short snippets unless it looks like a phone number
                if (text.length > 20 || (text.length > 7 && text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/))) { 
                    scrapedContent += text + '\n';
                }
            });
            
            // Limit scraped content length
            scrapedContent = scrapedContent.slice(0, 10000); 
        }
    } catch (e) {
        console.error("Failed to scrape website:", e);
        scrapedContent = "(Could not scrape website content)";
    }

    // Try to extract a specific phone number from scraped content
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const scrapedPhones = scrapedContent.match(phoneRegex);
    const scrapedPhone = scrapedPhones ? scrapedPhones[0] : '';
    
    // Combine training data
    const trainingData = `
        Business Name: ${businessName}
        Website: ${websiteUrl}
        Phone: ${phone}
        Address: ${address}
        Description: ${description}
        Scraped Phone: ${scrapedPhone}
        
        --- Scraped Website Content ---
        ${scrapedContent}
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
