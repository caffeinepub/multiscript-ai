import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import PlatformSelector from './components/PlatformSelector';
import TopicInput from './components/TopicInput';
import ToneSelector from './components/ToneSelector';
import GenerateButton from './components/GenerateButton';
import ProgressBar from './components/ProgressBar';
import ScriptCard from './components/ScriptCard';
import HistoryTab from './components/HistoryTab';
import Footer from './components/Footer';
import { SocialMediaPlatform, Tone } from './backend';
import { useGenerateScript } from './hooks/useQueries';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform>(
    SocialMediaPlatform.tiktok
  );
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState<Tone>(Tone.hype);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const generateMutation = useGenerateScript();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      return;
    }

    try {
      const script = await generateMutation.mutateAsync({
        platform: selectedPlatform,
        topic: topic.trim(),
        tone: selectedTone,
      });
      setGeneratedScript(script);
    } catch (error) {
      console.error('Failed to generate script:', error);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Header />

          {!showHistory ? (
            <main className="space-y-8 mt-12">
              <PlatformSelector
                selected={selectedPlatform}
                onSelect={setSelectedPlatform}
              />

              <TopicInput value={topic} onChange={setTopic} />

              <ToneSelector selected={selectedTone} onSelect={setSelectedTone} />

              <GenerateButton
                onClick={handleGenerate}
                disabled={!topic.trim() || generateMutation.isPending}
                isLoading={generateMutation.isPending}
              />

              {generateMutation.isPending && <ProgressBar />}

              {generatedScript && !generateMutation.isPending && (
                <ScriptCard
                  script={generatedScript}
                  platform={selectedPlatform}
                  tone={selectedTone}
                />
              )}

              {/* Reduced gap: was mt-12, now mt-6 (50% reduction) */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowHistory(true)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  View History →
                </button>
              </div>
            </main>
          ) : (
            <main className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold font-display luxury-title">Script History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  ← Back to Generator
                </button>
              </div>
              <HistoryTab />
            </main>
          )}

          <Footer />
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
