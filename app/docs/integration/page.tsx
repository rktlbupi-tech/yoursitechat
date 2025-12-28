'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Copy, Code, Terminal, MonitorSmartphone, Globe, Smartphone, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function IntegrationGuide() {
  const [activeTab, setActiveTab] = useState<'html' | 'react' | 'nextjs' | 'flutter' | 'reactnative'>('html');

  const tabs = [
    { id: 'html', label: 'HTML / Website', icon: Globe },
    { id: 'react', label: 'React', icon: Code },
    { id: 'nextjs', label: 'Next.js', icon: Terminal },
    { id: 'flutter', label: 'Flutter', icon: Smartphone },
    { id: 'reactnative', label: 'React Native', icon: MonitorSmartphone },
  ];

  const getCode = (type: string) => {
    switch(type) {
      case 'html':
        return `<!-- Add this before the closing </body> tag -->
<script 
  src="https://yoursitebot.com/embed.js" 
  data-bot-id="YOUR_BOT_ID">
</script>`;
      case 'react':
        return `// App.js or Main Component
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://yoursitebot.com/embed.js";
    script.setAttribute('data-bot-id', 'YOUR_BOT_ID');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div className="App">...</div>;
}`;
      case 'nextjs':
        return `// app/layout.tsx or page.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="https://yoursitebot.com/embed.js"
          data-bot-id="YOUR_BOT_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}`;
      case 'flutter':
        return `// pubspec.yaml
dependencies:
  webview_flutter: ^4.0.0

// lib/chat_widget.dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class ChatWidget extends StatefulWidget {
  final String botId;
  const ChatWidget({Key? key, required this.botId}) : super(key: key);

  @override
  State<ChatWidget> createState() => _ChatWidgetState();
}

class _ChatWidgetState extends State<ChatWidget> {
  late final WebViewController controller;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('https://yoursitebot.com/widget/\${widget.botId}'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Chat Support")),
      body: WebViewWidget(controller: controller),
    );
  }
}`;
      case 'reactnative':
        return `// Install react-native-webview
// npm install react-native-webview

import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://yoursitebot.com/widget/YOUR_BOT_ID' }} 
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});`;
      default: return '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-20 max-w-5xl">
        <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Integration Guide</h1>
            <p className="text-xl text-muted-foreground">How to add Gchat to any platform in seconds.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-muted/20 border-r border-border p-4">
                <div className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                activeTab === tab.id 
                                    ? "bg-primary text-primary-foreground shadow-md" 
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10 relative">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            {tabs.find(t => t.id === activeTab)?.icon && (() => {
                                const Icon = tabs.find(t => t.id === activeTab)!.icon;
                                return <Icon className="w-6 h-6 text-primary" />;
                            })()}
                            Integrate with {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <p className="text-muted-foreground mt-1">Copy and paste the code below into your project.</p>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute top-4 right-4 z-10">
                        <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => copyToClipboard(getCode(activeTab))}
                            className="bg-card/20 backdrop-blur-sm hover:bg-card/40 border border-border/50 text-foreground"
                        >
                            <Copy className="w-3 h-3 mr-2" /> Copy
                        </Button>
                    </div>
                    <pre className="w-full h-[400px] bg-zinc-950 rounded-xl border border-zinc-800 p-6 overflow-auto text-sm font-mono leading-relaxed text-zinc-300">
                        {getCode(activeTab)}
                    </pre>
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-4 items-start">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Info className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-1">Don't forget your Bot ID!</h4>
                        <p className="text-muted-foreground text-xs">
                            Replace <code className="bg-muted px-1 py-0.5 rounded text-foreground">YOUR_BOT_ID</code> with the actual ID from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Info(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
