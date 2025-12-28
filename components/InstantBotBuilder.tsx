'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Globe, Phone, Mail, MapPin, Info, Check, Copy, ArrowRight, ArrowLeft, Palette, Building2, User, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function InstantBotBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedBotId, setGeneratedBotId] = useState<string | null>(null);
  const [showTestBot, setShowTestBot] = useState(false);
  
  const [formData, setFormData] = useState({
    yourName: '',
    businessName: '',
    websiteUrl: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    primaryColor: '#3B82F6', // Default blue from image
    secondaryColor: '#06B6D4' // Default cyan/teal from image
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
        const res = await fetch('/api/bots/instant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await res.json();
        
        if (res.ok && data.botId) {
            setGeneratedBotId(data.botId);
            setStep(4); // Success step
        } else {
            alert('Error creating bot: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error(error);
        alert('Failed to create bot');
    } finally {
        setLoading(false);
    }
  };

  const nextStep = () => {
      // Basic validation
      if (step === 1) {
          if (!formData.yourName || !formData.businessName || !formData.websiteUrl) return alert("Please fill in all required fields.");
      }
      setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const getEmbedCode = (botId: string) => {
    const host = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `<script src="${host}/embed.js" data-bot-id="${botId}"></script>`;
  };

  // Steps configuration
  const steps = [
      { id: 1, title: "Identity", icon: User },
      { id: 2, title: "Details", icon: Building2 },
      { id: 3, title: "Style", icon: Palette },
      { id: 4, title: "Done", icon: PartyPopper },
  ];

  /* Simple Confetti Component using Framer Motion */
  const Confetti = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: "50%", y: "50%", scale: 0 }}
            animate={{ 
              opacity: 0,
              x: `${50 + (Math.random() - 0.5) * 100}%`, 
              y: `${50 + (Math.random() - 0.5) * 100}%`,
              rotate: Math.random() * 360,
              scale: Math.random() * 1.5 + 0.5
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: Math.random() * 0.2 }}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                left: '0%', 
                top: '0%' 
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-1">
      <div className="bg-card border border-border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Sidebar - Vertical Stepper */}
        <div className="w-full md:w-1/3 bg-muted/30 border-r border-border p-8 flex flex-col items-center relative overflow-hidden">
            <div className="relative z-10 mb-12 text-center">
                <h2 className="text-3xl font-bold mb-2">Build Your Bot</h2>
                <p className="text-muted-foreground">Follow the steps to launch your AI assistant.</p>
            </div>

            <div className="relative z-10 flex-1 w-full max-w-sm">
                <div className="relative space-y-12 flex flex-col items-center">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-muted/50 rounded-full -z-10"></div>
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-4 w-1 bg-primary rounded-full -z-10 transition-all duration-500 ease-in-out"
                        style={{ height: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>



                    {steps.map((s) => (
                        <div key={s.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 relative w-full">
                             {/* Popup for Style Step - Positioned relative to the grid */}
                             {s.id === 3 && step === 2 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="absolute -top-10 left-[50%] -translate-x-1/2 w-32 bg-primary text-primary-foreground text-[10px] font-bold py-1 px-2 rounded-lg shadow-xl text-center z-20"
                                >
                                    You are about to <br/>create your bot!
                                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                                </motion.div>
                            )}

                            {/* Left Side (Invisible for balance) */}
                            <div className="invisible"></div>

                            {/* Center Icon (Grid Column 2) */}
                            <div className="col-start-2 flex justify-center">
                                <div className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 shadow-sm bg-card",
                                    step >= s.id 
                                        ? "border-primary bg-primary text-primary-foreground scale-110" 
                                        : "border-muted/50 text-muted-foreground"
                                )}>
                                    {step > s.id ? <Check className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                                </div>
                            </div>

                            {/* Right Side Text (Grid Column 3) */}
                            <div className={cn("text-left transition-opacity duration-300 pl-2", step === s.id ? "opacity-100" : "opacity-60")}>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Step 0{s.id}</div>
                                <div className="font-bold text-sm whitespace-nowrap">{s.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Curve Circle */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Content - Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col">
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 max-w-xl mx-auto md:mx-0"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold mb-2">Identity</h3>
                                <p className="text-muted-foreground">Let's start with the basics of your business.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Your Name *</label>
                                    <input 
                                        required
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.yourName}
                                        onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Business Name *</label>
                                    <input 
                                        required
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="Acme Inc."
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Website URL *</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input 
                                            required
                                            type="url"
                                            className="w-full pl-10 bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="https://example.com"
                                            value={formData.websiteUrl}
                                            onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                             key="step2"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="space-y-6 max-w-xl"
                        >
                             <div className="mb-6">
                                <h3 className="text-2xl font-semibold mb-2">Details</h3>
                                <p className="text-muted-foreground">Help the AI understand how to contact you.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <input 
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="+1 234 567 890"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input 
                                        type="email"
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="support@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium">Business Address</label>
                                <input 
                                    className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="123 Tech St, Silicon Valley, CA"
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea 
                                    className="w-full h-32 bg-background border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="Tell us about your services..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                         <motion.div 
                             key="step3"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="space-y-6"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold mb-2">Style & Preview</h3>
                                <p className="text-muted-foreground">Customize your bot's look.</p>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 items-start">
                                <div className="space-y-6 flex-1 w-full">
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium">Primary Color</label>
                                        <div className="flex items-center gap-4 p-3 border border-border rounded-xl">
                                             <input 
                                                type="color" 
                                                className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                                                value={formData.primaryColor}
                                                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                            />
                                            <div className="font-mono text-sm">{formData.primaryColor}</div>
                                        </div>
                                    </div>
                                     <div className="space-y-4">
                                        <label className="text-sm font-medium">Secondary Color</label>
                                        <div className="flex items-center gap-4 p-3 border border-border rounded-xl">
                                             <input 
                                                type="color" 
                                                className="w-12 h-12 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                                                value={formData.secondaryColor}
                                                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                                            />
                                            <div className="font-mono text-sm">{formData.secondaryColor}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Card */}
                                <div className="w-full lg:w-72 shrink-0">
                                    <div className="border border-border rounded-xl shadow-lg overflow-hidden bg-background">
                                         <div className="p-4 flex items-center gap-3 text-white" style={{ backgroundColor: formData.primaryColor }}>
                                             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                 <Check className="w-5 h-5" />
                                             </div>
                                             <div className="font-medium text-sm">Gchat Support</div>
                                         </div>
                                         <div className="p-4 space-y-3 h-64 bg-muted/10">
                                             <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-xs w-[85%]">
                                                 Hello! How can I help you with {formData.businessName || 'your business'} today?
                                             </div>
                                             <div className="bg-primary/10 p-3 rounded-2xl rounded-tr-none text-xs w-[85%] ml-auto text-right" style={{ color: formData.secondaryColor, backgroundColor: `${formData.secondaryColor}15` }}>
                                                 I'd like to know more about your pricing.
                                             </div>
                                         </div>
                                    </div>
                                    <p className="text-center text-xs text-muted-foreground mt-2">Live Preview</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-10"
                        >
                            <div className="relative">
                                {step === 4 && <Confetti />}
                                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 animate-in zoom-in-50 duration-500 relative z-10">
                                    <PartyPopper className="w-12 h-12" />
                                </div>
                            </div>
                            <div className="space-y-2 z-10">
                                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-pulse">Hip Hip Hooray!</h2>
                                <p className="text-muted-foreground max-w-md mx-auto">Your Gchat bot is ready to be deployed.</p>
                            </div>
                            
                            <div className="w-full max-w-lg bg-zinc-950 rounded-xl border border-zinc-800 p-6 relative group text-left">
                                <pre className="text-zinc-400 font-mono text-xs overflow-x-auto">
                                    {generatedBotId && getEmbedCode(generatedBotId)}
                                </pre>
                                <button 
                                    onClick={() => {
                                        if (generatedBotId) {
                                            navigator.clipboard.writeText(getEmbedCode(generatedBotId));
                                            alert('Copied!');
                                        }
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>



                            <div className="flex gap-4 pt-4 flex-wrap justify-center">
                                <Button size="lg" variant="outline" onClick={() => setShowTestBot(!showTestBot)}>
                                    {showTestBot ? "Close Test" : "Test Live Bot"}
                                </Button>
                                <Button size="lg" onClick={() => router.push('/admin/bots')}>
                                    Go to Dashboard
                                </Button>
                            </div>

                            {/* Inline Test Bot Iframe */}
                            <AnimatePresence>
                                {showTestBot && generatedBotId && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="w-full mt-6"
                                    >
                                        <div className="w-full h-[500px] border border-border rounded-2xl shadow-2xl overflow-hidden bg-background relative">
                                            <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                                <div className="mx-auto text-xs text-muted-foreground font-mono">Simulating your website...</div>
                                            </div>
                                            <iframe 
                                                src={`/widget/${generatedBotId}`}
                                                className="w-full h-full pt-10"
                                                style={{ border: 'none' }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Footer (Right Side) */}
            {step < 4 && (
                <div className="flex justify-between items-center pt-8 mt-4 border-t border-border">
                    <Button 
                        variant="ghost" 
                        onClick={prevStep} 
                        disabled={step === 1}
                        className={cn("text-muted-foreground hover:text-foreground", step === 1 && "opacity-0 pointer-events-none")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    
                    <Button 
                        onClick={step === 3 ? handleSubmit : nextStep} 
                        disabled={loading}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 rounded-xl px-8"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (step === 3 ? 'Create Bot' : 'Next Step')}
                        {!loading && step !== 3 && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
