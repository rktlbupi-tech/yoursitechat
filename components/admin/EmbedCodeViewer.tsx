'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface EmbedCodeViewerProps {
    botId: string;
}

export default function EmbedCodeViewer({ botId }: EmbedCodeViewerProps) {
    const [host, setHost] = useState('http://localhost:3000');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.origin);
        }
    }, []);

    const embedCode = `<script src="${host}/embed.js" data-bot-id="${botId}"></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
             <div className="relative rounded-md bg-muted p-4 font-mono text-sm break-all bg-gray-100 dark:bg-zinc-800 border border-border">
                {embedCode}
            </div>
            <Button 
                onClick={handleCopy} 
                className="w-full" 
                variant="outline"
            >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
        </div>
    );
}
