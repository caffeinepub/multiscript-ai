import { useState } from 'react';
import { Heart, Settings } from 'lucide-react';
import DeveloperControlCenter from './DeveloperControlCenter';

export default function Footer() {
  const [showDCC, setShowDCC] = useState(false);
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'multiscript-ai'
  );

  return (
    <>
      <footer className="mt-8 pt-8 border-t border-border">
        {/* Settings gear icon — 10px above copyright, far right */}
        <div className="relative flex items-end justify-end" style={{ marginBottom: '10px' }}>
          <button
            onClick={() => setShowDCC(true)}
            aria-label="Developer Control Center"
            className="settings-gear-btn p-1 rounded transition-all duration-300"
            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Copyright line */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} Built with{' '}
            <Heart className="w-4 h-4 text-primary fill-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <DeveloperControlCenter open={showDCC} onOpenChange={setShowDCC} />
    </>
  );
}
