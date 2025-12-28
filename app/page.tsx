
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

import { Navbar } from "@/components/Navbar";

import InstantBotBuilder from "@/components/InstantBotBuilder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />
      <Hero />
      
      {/* Instant Bot Builder Section */}
      <section id="create" className="py-20 bg-muted/30 border-y border-border">
         <div className="container mx-auto px-4">
             <div className="text-center mb-10">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Build Your Bot Now</h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                     Experience the power of Gchat immediately. Create a custom trained chatbot for your business in seconds.
                 </p>
             </div>
             <InstantBotBuilder />
         </div>
      </section>

      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}
