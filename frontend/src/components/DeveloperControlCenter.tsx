import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Key, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { useGetAdminKeys, useSetAdminKeys } from '../hooks/useQueries';

interface DeveloperControlCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeveloperControlCenter({ open, onOpenChange }: DeveloperControlCenterProps) {
  const { data: adminKeys } = useGetAdminKeys();
  const setAdminKeysMutation = useSetAdminKeys();

  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showGemini, setShowGemini] = useState(false);
  const [showGroq, setShowGroq] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await setAdminKeysMutation.mutateAsync({ geminiKey, groqKey });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save admin keys:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glassmorphism">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display flex items-center gap-2 luxury-title">
            <Settings className="w-6 h-6 text-primary" />
            Developer Control Center
          </DialogTitle>
          <DialogDescription className="text-base pt-1">
            Configure API keys and advanced settings for MultiScript AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Keys Status */}
          {adminKeys && (
            <div className="rounded-lg border border-border/40 bg-white/5 p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground/70 uppercase tracking-wider text-[10px] mb-2">Current Keys</p>
              <p>Gemini: {adminKeys.geminiKey ? `••••${adminKeys.geminiKey.slice(-4)}` : <span className="text-destructive">Not set</span>}</p>
              <p>Groq: {adminKeys.groqKey ? `••••${adminKeys.groqKey.slice(-4)}` : <span className="text-destructive">Not set</span>}</p>
            </div>
          )}

          {/* Gemini Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" />
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter Gemini API key..."
                className="w-full bg-white/5 border border-border/40 rounded-lg px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showGemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Groq Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" />
              Groq API Key
            </label>
            <div className="relative">
              <input
                type={showGroq ? 'text' : 'password'}
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder="Enter Groq API key..."
                className="w-full bg-white/5 border border-border/40 rounded-lg px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowGroq(!showGroq)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showGroq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={(!geminiKey && !groqKey) || setAdminKeysMutation.isPending}
            className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 luxury-title"
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
          >
            {setAdminKeysMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : saved ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Saved!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save API Keys
              </span>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Keys are stored securely on-chain. Only authorized admins can access them.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
