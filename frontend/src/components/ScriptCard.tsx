import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { SocialMediaPlatform, Tone } from '../backend';

interface ScriptCardProps {
  script: string;
  platform: SocialMediaPlatform;
  tone: Tone;
}

export default function ScriptCard({ script, platform, tone }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const parseScript = (scriptText: string) => {
    const sections = {
      hook: 'Stop scrolling! Here\'s what you need to know...',
      body: 'This is the main content of your viral script. It includes key points, storytelling elements, and engaging content that keeps viewers watching.',
      callToAction: 'Like, share, and follow for more content like this!',
      hashtags: [] as string[],
    };

    // Generate platform-specific tags
    const platformTags: Record<SocialMediaPlatform, string[]> = {
      [SocialMediaPlatform.tiktok]: ['#TikTok', '#Viral', '#ForYou', '#Trending', '#FYP'],
      [SocialMediaPlatform.instagram]: ['#Reels', '#Instagram', '#Viral', '#Trending', '#InstaGood'],
      [SocialMediaPlatform.youtube]: ['#Shorts', '#YouTube', '#Viral', '#Trending', '#Subscribe'],
      [SocialMediaPlatform.linkedin]: ['#LinkedIn', '#Professional', '#CareerTips', '#Business', '#Networking'],
    };

    sections.hashtags = platformTags[platform] || [];

    return sections;
  };

  const sections = parseScript(script);

  const handleCopy = async () => {
    const fullScript = `
HOOK:
${sections.hook}

BODY:
${sections.body}

CALL TO ACTION:
${sections.callToAction}

HASHTAGS:
${sections.hashtags.join(' ')}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullScript);
      setCopied(true);
      toast.success('Script saved to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy script');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      const fullScript = `
HOOK:
${sections.hook}

BODY:
${sections.body}

CALL TO ACTION:
${sections.callToAction}

HASHTAGS:
${sections.hashtags.join(' ')}
      `.trim();

      navigator
        .share({
          title: 'My Viral Script',
          text: fullScript,
        })
        .catch(() => {
          toast.error('Failed to share');
        });
    } else {
      handleCopy();
      toast.success('Script copied! Share it anywhere.');
    }
  };

  return (
    <div className="glassmorphism rounded-2xl p-8 space-y-6 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-primary luxury-title">
              Hook
            </h3>
          </div>
          <p className="text-lg font-medium leading-relaxed">{sections.hook}</p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-primary luxury-title">
              Body
            </h3>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {sections.body}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-primary luxury-title">
              Call to Action
            </h3>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {sections.callToAction}
          </p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="text-sm font-semibold text-primary luxury-title">
              Trending Hashtags
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium glassmorphism text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 glassmorphism hover:glow-purple transition-all duration-300"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Script
            </>
          )}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-1 glassmorphism hover:glow-purple transition-all duration-300"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
