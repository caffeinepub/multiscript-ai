import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Diamond, Check } from 'lucide-react';

interface ProModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProModal({ open, onOpenChange }: ProModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glassmorphism">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display flex items-center gap-2 luxury-title">
            <Diamond className="w-6 h-6 text-primary" />
            Upgrade to MultiScript Pro
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Unlock the Unlimited Viral Engine
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">$0.99</div>
            <div className="text-muted-foreground">per month</div>
          </div>

          <div className="space-y-3">
            {[
              'Unlock ChatGPT-4o & Gemini Ultra',
              '100+ daily scripts',
              'AI-generated thumbnail ideas',
              'Priority AI processing',
              'Advanced tone customization',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 luxury-title"
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
            }}
          >
            Unlock Unlimited Scripts
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
