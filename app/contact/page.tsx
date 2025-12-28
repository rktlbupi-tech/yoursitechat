
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Nav would be here, assuming layout handles it or we make a minimal one */}
       <header className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl">
           <span>YourSiteChat</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">get in touch</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-[600px] text-lg">
                Have a question or need a custom solution? We'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-zinc-800 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <a href="mailto:contact@yoursitechat.com" className="text-gray-500 hover:text-blue-600 dark:text-gray-400">contact@yoursitechat.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-zinc-800 text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

               <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-zinc-800 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-gray-500 dark:text-gray-400">123 AI Boulevard, Tech City, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 dark:bg-zinc-900/50">
             {submitted ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-12">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                    <p className="text-gray-500">We'll get back to you as soon as possible.</p>
                     <Button onClick={() => setSubmitted(false)} variant="outline">Send another message</Button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="firstName">First name</label>
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="firstName" placeholder="John" required />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="lastName">Last name</label>
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="lastName" placeholder="Doe" required />
                         </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="m@example.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-medium leading-none" htmlFor="message">Message</label>
                         <textarea className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="message" placeholder="How can we help you?" required></textarea>
                    </div>
                     <Button className="w-full" type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Message
                    </Button>
                </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
