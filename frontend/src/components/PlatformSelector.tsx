import { SocialMediaPlatform } from '../backend';
import { SiTiktok, SiInstagram, SiYoutube, SiLinkedin } from 'react-icons/si';

interface PlatformSelectorProps {
  selected: SocialMediaPlatform;
  onSelect: (platform: SocialMediaPlatform) => void;
}

const platforms = [
  {
    id: SocialMediaPlatform.tiktok,
    label: 'TikTok',
    icon: SiTiktok,
  },
  {
    id: SocialMediaPlatform.instagram,
    label: 'Instagram',
    icon: SiInstagram,
  },
  {
    id: SocialMediaPlatform.youtube,
    label: 'YouTube',
    icon: SiYoutube,
  },
  {
    id: SocialMediaPlatform.linkedin,
    label: 'LinkedIn',
    icon: SiLinkedin,
  },
];

export default function PlatformSelector({
  selected,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-muted-foreground luxury-title">
        Select Platform
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selected === platform.id;

          return (
            <button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className={`
                relative p-6 rounded-xl transition-all duration-300
                flex flex-col items-center gap-3 glassmorphism
                ${
                  isSelected
                    ? 'glow-purple-strong'
                    : 'hover:glow-purple'
                }
              `}
            >
              <Icon className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-center luxury-title">
                {platform.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
