# ESL Memory Master 🧠

A competitive, interactive memory matching game designed for ESL learners. Challenge yourself and a friend to match English words with their meanings!

## Features ✨

- **🎮 Two-Player Mode**: Play against a friend with custom player names
- **⚡ Three Difficulty Levels**: Easy (8 pairs), Medium (12 pairs), Hard (18 pairs)
- **📊 Live Scoring**: Real-time score tracking with combo multipliers
- **⏱️ Game Timer**: Track how fast you complete the game
- **🔊 Sound Effects**: Audio feedback for flips, matches, and wins
- **🏆 Winner Modal**: See final scores and celebrate victory
- **📱 Fully Responsive**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Stunning gradients, animations, and visual effects

## How to Play 🎯

### Setup Phase
1. **Enter Player Names**: Customize names for both players (default: "Player 1" & "Player 2")
2. **Select Difficulty**:
   - 🌟 **Easy**: 8 pairs - Perfect for beginners
   - ⚡ **Medium**: 12 pairs - Intermediate challenge
   - 🔥 **Hard**: 18 pairs - Expert difficulty
3. **Click Start Game**: Begin the match!

### Gameplay
1. **Take Turns**: Players alternate turns trying to find matching pairs
2. **Flip Cards**: Click cards to reveal the word and its meaning
3. **Match Pairs**: Find matching word-meaning pairs to score points
4. **Earn Points**:
   - Base: 100 points per match
   - Combo Bonus: Additional 50 points for consecutive matches within 5 seconds
5. **Switch Turns**: If cards don't match, turn passes to the other player
6. **Win Condition**: First to match all pairs wins! (Highest score in case of a tie)

### Scoring System 📈

| Event | Points |
|-------|--------|
| Match Found | 100 |
| Combo x2 | +50 |
| Combo x3 | +100 |
| Combo x4+ | +150+ |

### Controls 🎮

- **Click Cards**: Flip and reveal cards
- **New Game**: Start a fresh match with the same settings
- **Settings**: Change player names and difficulty level
- **Escape Key**: Return to setup screen

## Vocabulary Levels 📚

### Easy Level (Beginner)
Basic everyday words with simple meanings:
- Apple, Book, Cat, Dog, Sun, Moon, Car, Tree, House, Phone, Water, Fire

### Medium Level (Intermediate)
Common objects and concepts:
- Elephant, Guitar, Pizza, Computer, Beach, Doctor, Airplane, Camera, Bicycle, Rainbow, Mountain, Library, Kitchen, Garden, Station

### Hard Level (Advanced)
Academic and complex vocabulary:
- Architecture, Astronomy, Biology, Chemistry, Democracy, Economy, Geography, History, Literature, Mathematics, Philosophy, Psychology, Technology, Volcano, Zoology, Meteorology, Archaeology, Astronaut

## Tips for Better Gameplay 💡

1. **Concentrate**: Try to remember card positions as you flip them
2. **Look for Patterns**: Group similar categories mentally (animals, objects, concepts)
3. **Use Combos**: Find multiple matches in succession for bonus points
4. **Fast Thinking**: Complete the game quickly to maximize time efficiency
5. **Take Notes**: On paper, track which cards you've seen (in competitive play)

## Keyboard Shortcuts ⌨️

| Key | Action |
|-----|--------|
| **Escape** | Return to setup screen |

## Browser Compatibility ✅

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser supporting HTML5 Audio and CSS3

## Technical Details 🔧

### Built With
- **HTML5**: Semantic markup
- **CSS3**: Advanced animations and styling
- **Vanilla JavaScript**: No dependencies
- **Web Audio API**: Sound effects generation

### Features
- **Responsive Design**: Mobile-first approach
- **Local Game State**: All data stored in session memory
- **Sound Synthesis**: Procedurally generated sound effects
- **Smooth Animations**: CSS transforms and keyframes
- **Touch Friendly**: Full mobile support

## Game Mechanics 🎲

### Card Matching Algorithm
- Each card has a `pairId` linking it to its matching card
- Cards are randomly shuffled on each new game
- Matching is confirmed when both cards have the same `pairId`

### Combo System
- Tracks time between matches (5-second window)
- Increases multiplier for consecutive matches
- Resets on failed match or turn pass

### Turn System
- Automatic turn switching on failed matches
- Current player highlighted in scoreboard
- Turn indicator animates on switch

## Customization Options 🎨

Players can customize:
- Player names
- Game difficulty
- Card content (in code)
- Color scheme (CSS variables)
- Sound volume (via browser settings)

## Accessibility ♿

- Semantic HTML structure
- Keyboard navigation support
- High contrast UI elements
- Clear visual feedback on interactions
- Audio cues for game events

## Future Enhancements 🚀

Potential additions:
- Single-player mode with AI opponent
- Time attack challenges
- Leaderboard system
- Custom vocabulary sets
- Different card themes
- Language selection
- Volume controls
- Difficulty progression

## Credits 👏

**ESL Memory Master** - Designed for English language learners of all levels.

---

**Ready to test your memory? Start a game and challenge your vocabulary skills!** 🎯
