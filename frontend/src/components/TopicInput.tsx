import { Textarea } from '@/components/ui/textarea';

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TopicInput({ value, onChange }: TopicInputProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-muted-foreground luxury-title">
        Your Topic or Idea
      </h2>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your raw idea or topic here (e.g., Why 16-year-olds should learn AI...)"
        className="min-h-[150px] text-base glassmorphism focus:glow-purple resize-none"
      />
    </div>
  );
}
