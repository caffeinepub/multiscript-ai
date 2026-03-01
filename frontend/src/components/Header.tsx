import { useState } from 'react';
import { Diamond } from 'lucide-react';
import ProModal from './ProModal';

export default function Header() {
  const [showProModal, setShowProModal] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight luxury-title">
            MultiScript AI
          </h1>
        </div>
        <button
          onClick={() => setShowProModal(true)}
          className="p-3 rounded-full glassmorphism hover:glow-purple transition-all duration-300 group"
          aria-label="Upgrade to Pro"
        >
          <Diamond className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
        </button>
      </header>

      <ProModal open={showProModal} onOpenChange={setShowProModal} />
    </>
  );
}
