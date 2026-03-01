import { Tone } from '../backend';
import { Flame, Briefcase, Laugh } from 'lucide-react';

interface ToneSelectorProps {
  selected: Tone;
  onSelect: (tone: Tone) => void;
}

const tones = [
  {
    id: Tone.hype,
    label: 'Hype',
    icon: Flame,
  },
  {
    id: Tone.professional,
    label: 'Professional',
    icon: Briefcase,
  },
  {
    id: Tone.funny,
    label: 'Funny',
    icon: Laugh,
  },
];

export default function ToneSelector({ selected, onSelect }: ToneSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-muted-foreground luxury-title">
        Select Tone
      </h2>
      <div className="flex gap-3 flex-wrap">
        {tones.map((tone) => {
          const Icon = tone.icon;
          const isSelected = selected === tone.id;

          return (
            <button
              key={tone.id}
              onClick={() => onSelect(tone.id)}
              className={`
                px-6 py-3 rounded-full transition-all duration-200
                flex items-center gap-2 font-medium glassmorphism
                ${
                  isSelected
                    ? 'bg-primary text-primary-foreground glow-purple'
                    : 'hover:glow-purple'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {tone.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
