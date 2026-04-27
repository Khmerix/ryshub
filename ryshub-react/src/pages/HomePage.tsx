import Hero from '../components/Hero';
import FlashStrips from '../components/FlashStrips';
import EffectsShowcase from '../components/EffectsShowcase';
import GamesGrid from '../components/GamesGrid';
import ToolsGrid from '../components/ToolsGrid';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlashStrips />
      <EffectsShowcase />
      <GamesGrid />
      <ToolsGrid />
    </>
  );
}
