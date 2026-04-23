import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FlashStrips from './components/FlashStrips'
import GamesGrid from './components/GamesGrid'
import ToolsGrid from './components/ToolsGrid'
import SpotlightBackground from './components/SpotlightBackground'

function App() {
  return (
    <>
      <SpotlightBackground />
      <Navbar />
      <Hero />
      <FlashStrips />
      <GamesGrid />
      <ToolsGrid />
    </>
  )
}

export default App
