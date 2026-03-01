import { useGetScriptHistory } from '../hooks/useQueries';
import { SocialMediaPlatform } from '../backend';
import { SiTiktok, SiInstagram, SiYoutube, SiLinkedin } from 'react-icons/si';
import { Clock } from 'lucide-react';

const platformIcons = {
  [SocialMediaPlatform.tiktok]: SiTiktok,
  [SocialMediaPlatform.instagram]: SiInstagram,
  [SocialMediaPlatform.youtube]: SiYoutube,
  [SocialMediaPlatform.linkedin]: SiLinkedin,
};

const platformLabels = {
  [SocialMediaPlatform.tiktok]: 'TikTok',
  [SocialMediaPlatform.instagram]: 'Instagram',
  [SocialMediaPlatform.youtube]: 'YouTube',
  [SocialMediaPlatform.linkedin]: 'LinkedIn',
};

export default function HistoryTab() {
  const { data: history, isLoading } = useGetScriptHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading history...</div>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="glassmorphism rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">
          No scripts generated yet. Create your first viral script!
        </p>
      </div>
    );
  }

  // Sort by timestamp descending (newest first)
  const sortedHistory = [...history].sort((a, b) => {
    return Number(b.timestamp - a.timestamp);
  });

  return (
    <div className="space-y-4">
      {sortedHistory.map((item, index) => {
        const Icon = platformIcons[item.platform];
        const platformLabel = platformLabels[item.platform];
        const date = new Date(Number(item.timestamp) / 1000000);

        return (
          <div
            key={index}
            className="glassmorphism rounded-xl p-6 hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-primary">
                    {platformLabel}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {item.tone}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock className="w-3 h-3" />
                    {date.toLocaleDateString()}
                  </div>
                </div>

                <h3 className="font-medium mb-2 line-clamp-1">{item.topic}</h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
