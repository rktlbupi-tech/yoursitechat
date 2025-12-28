
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Globe, Phone, Mail, MapPin, Info, Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InstantBotBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedBotId, setGeneratedBotId] = useState<string | null>(null);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            setStep(2);
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

  const getEmbedCode = (botId: string) => {
    // Using simple concatenation for the script tag string to avoid hydration issues with dangerouslySetInnerHTML potentially
    // The previous implementation had `src="..."` 
    // We'll mimic that format.
    const host = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `<script src="${host}/embed.js" data-bot-id="${botId}"></script>`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-[#0B1120] text-gray-100 border border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Create Your AI Chatbot</h1>
        <p className="text-gray-400">Launch your AI chatbot in under 5 minutes</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-4 mb-10 text-sm font-medium">
        <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>1</span>
            <span className={step === 1 ? 'text-white' : 'text-gray-400'}>Business Details</span>
        </div>
        <div className="w-16 h-[2px] bg-gray-700"></div>
        <div className="flex items-center gap-2">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}>2</span>
            <span className={step === 2 ? 'text-white' : 'text-gray-400'}>Embed Code</span>
        </div>
      </div>

      {step === 1 ? (
          /* Step 1: Business Details Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Your Name *</label>
                    <input 
                        required
                        className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="John Doe"
                        value={formData.yourName}
                        onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                    />
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Business Name *</label>
                     <input 
                        required
                        className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="e.g., Acme Corporation"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                </div>

                {/* Website URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Website URL *
                    </label>
                     <input 
                        required
                        type="url"
                        className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="https://www.example.com/"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    />
                    <p className="text-xs text-blue-400 mt-1">We'll analyze your website to train the chatbot</p>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4" /> Contact Phone
                        </label>
                        <input 
                            className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Contact Email
                        </label>
                        <input 
                            type="email"
                            className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                 {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Business Address
                    </label>
                     <input 
                        className="w-full bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="123 Main St, City, Country"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        Describe Your Services <Info className="w-3 h-3 text-gray-500" />
                    </label>
                    <textarea 
                        className="w-full h-32 bg-[#151b2b] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                        placeholder="Describe your products, services, pricing, and key information that will help the AI understand your business..."
                        value={formData.description}
                        maxLength={2000}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <div className="text-right text-xs text-gray-500">{formData.description.length} / 2000</div>
                    <p className="text-xs text-gray-500 mt-1">Help the AI understand your business</p>
                </div>

                 {/* Appearance */}
                 <div className="space-y-4 pt-4 border-t border-gray-800">
                    <h3 className="font-semibold text-lg text-white">Chatbot Appearance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Primary Color</label>
                             <div className="flex items-center gap-2 bg-[#151b2b] border border-gray-700 rounded-lg p-2">
                                <input 
                                    type="color" 
                                    className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                                    value={formData.primaryColor}
                                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                />
                                <span className="text-gray-300 uppercase">{formData.primaryColor}</span>
                             </div>
                        </div>
                         <div className="space-y-2">
                             <label className="text-sm font-medium text-gray-300">Secondary Color</label>
                             <div className="flex items-center gap-2 bg-[#151b2b] border border-gray-700 rounded-lg p-2">
                                <input 
                                    type="color" 
                                    className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
                                    value={formData.secondaryColor}
                                    onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                                />
                                <span className="text-gray-300 uppercase">{formData.secondaryColor}</span>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>

            <Button 
                type="submit" 
                className="w-full h-12 bg-[#0E7490] hover:bg-[#0891b2] text-white font-semibold rounded-lg text-lg transition-all"
                disabled={loading}
            >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Generate Chatbot'}
                {!loading && <span className="ml-2">→</span>}
            </Button>
          </form>
      ) : (
          /* Step 2: Embed Code */
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                      <Check className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Your Chatbot is Ready!</h2>
                  <p className="text-gray-400">Copy the code below and paste it into your website&apos;s HTML.</p>
              </div>

               <div className="relative group">
                    <pre className="w-full bg-[#151b2b] border border-gray-700 rounded-xl p-6 overflow-x-auto text-gray-300 font-mono text-sm">
                        {generatedBotId && getEmbedCode(generatedBotId)}
                    </pre>
                    <button 
                        onClick={() => {
                            if (generatedBotId) {
                                navigator.clipboard.writeText(getEmbedCode(generatedBotId));
                                alert('Copied to clipboard!');
                            }
                        }}
                        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
               </div>

                <div className="flex justify-center gap-4">
                     <Button 
                        variant="outline" 
                        onClick={() => window.open(`/widget/${generatedBotId}`, '_blank')}
                        className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                        Test Chatbot
                    </Button>
                    <Button 
                        onClick={() => router.push(`/admin/bots`)}
                        className="bg-[#0E7490] hover:bg-[#0891b2] text-white"
                    >
                        Go to Dashboard
                    </Button>
                </div>
          </div>
      )}
    </div>
  );
}
