import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function GenerateButton({
  onClick,
  disabled,
  isLoading,
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 luxury-title"
      style={{
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Generate Viral Script
          <Sparkles className="w-5 h-5 ml-2" />
        </>
      )}
    </Button>
  );
}
