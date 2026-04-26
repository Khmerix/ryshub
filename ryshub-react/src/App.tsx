import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FlashStrips from './components/FlashStrips'
import EffectsShowcase from './components/EffectsShowcase'
import GamesGrid from './components/GamesGrid'
import ToolsGrid from './components/ToolsGrid'
import SpotlightBackground from './components/SpotlightBackground'
import FluidBackground from './components/FluidBackground'

function App() {
  return (
    <>
      <FluidBackground />
      <SpotlightBackground />
      <Navbar />
      <Hero />
      <FlashStrips />
      <EffectsShowcase />
      <GamesGrid />
      <ToolsGrid />
    </>
  )
}

export default App
