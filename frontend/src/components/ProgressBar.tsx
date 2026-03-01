import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4 py-6">
      <div className="flex items-center justify-center gap-3">
        <div className="w-3 h-3 bg-primary rounded-full processing-glow" />
        <p className="text-base font-medium text-foreground luxury-title">
          Processing...
        </p>
      </div>
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary processing-glow transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
