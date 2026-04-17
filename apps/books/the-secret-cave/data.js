/* =====================================================================
   The Secret Cave - Story Data
   Format:
   {
     nodeId: {
       text: "Scene text",
       choices: [ { text: "Button label", next: "nodeId" }, ... ]
     }
   }
   - Nodes with empty choices [] are endings.
   ===================================================================== */

var STORY_DATA = {

    /* ── OPENING ──────────────────────────────────────── */
    start: {
        text: "The sun is setting behind the mountains as you arrive at the mouth of an ancient cave. The locals warned you not to come here — something about a cave that swallows explorers whole. But the map you found in your grandmother's attic brought you to this exact spot.\n\nCold air drifts from the darkness inside. On the rock wall beside the entrance, three things are carved into the stone: a torch, a rope, and a compass.\n\nWhat do you do?",
        choices: [
            { text: "🔦 You brought supplies. Step inside confidently.", next: "enter_confident" },
            { text: "📝 Study the carved symbols on the wall first.", next: "symbols" },
            { text: "⏰ It's getting dark. Set up camp and go in at dawn.", next: "camp_night" }
        ]
    },

    symbols: {
        text: "You trace the three carvings with your fingertip. Torch. Rope. Compass. They're arranged in a triangle, and at the center there's a fourth symbol — a small flame surrounded by a broken circle.\n\nThen you notice something unusual. The carvings aren't just decorations. There's a narrow groove connecting them, and moss has grown into the grooves to form a word in an older script. After a moment, you decipher it:\n\n\"Only one who is lost may truly find.\"\n\nYou're not sure what that means, but you feel strangely prepared.",
        choices: [
            { text: "🔦 That's enough — step inside the cave.", next: "enter_confident" },
            { text: "🌙 Make camp first and study the map again.", next: "camp_night" }
        ]
    },

    camp_night: {
        text: "You set up a small camp near the cave entrance. The night is clear, and stars fill the sky above you. You study your grandmother's map again by firelight. There are three marked areas inside the cave — a chamber marked with a star, a passage marked with a question mark, and a dead end marked with an 'X'.\n\nBefore dawn, you hear something inside the cave. A low, steady sound — like breathing.",
        choices: [
            { text: "😤 Investigate the sound immediately.", next: "cave_breathing" },
            { text: "⏳ Wait until full sunrise before entering.", next: "enter_sunrise" }
        ]
    },

    cave_breathing: {
        text: "You grab your torch and step quietly into the cave. The breathing sound stops the moment you cross the threshold. Silence wraps around you like a blanket.\n\nInside the entrance, the cave opens into a wider corridor. Your torch reveals carved walls on both sides — scenes of people, animals, and symbols painted in fading reds and yellows. They seem to tell a story.\n\nAhead, the corridor splits into two paths.",
        choices: [
            { text: "⬅️ Take the left path — you see a faint light.", next: "left_path_light" },
            { text: "➡️ Take the right path — the paintings continue here.", next: "right_path_paintings" }
        ]
    },

    /* ── MAIN ENTRANCE ───────────────────────────────── */
    enter_confident: {
        text: "You take a steady breath and step into the cave. Your torch blazes to life, pushing back the darkness. The ceiling is higher than you expected — twenty, maybe thirty feet above you. The walls are wet and glittering.\n\nAs your eyes adjust, you realize the cave floor has been worn smooth, as though thousands of feet walked here before you. This wasn't just a natural cave. People lived here, or at least passed through regularly.\n\nDeep ahead, you can make out a split in the path.",
        choices: [
            { text: "⬅️ Take the left path.", next: "left_path_light" },
            { text: "➡️ Take the right path.", next: "right_path_paintings" },
            { text: "🔍 Look for something hidden near the entrance first.", next: "entrance_search" }
        ]
    },

    enter_sunrise: {
        text: "You wait for dawn. The golden morning light cuts into the cave entrance like a spotlight, illuminating something on the ground you hadn't noticed before — a worn leather bag, half-buried in dust.\n\nInside the bag: a handwritten journal with faded ink, a small key on a cord, and an old lantern still half-full of oil. Someone was here before you, and didn't come back for their bag.",
        choices: [
            { text: "📖 Read the journal before going deeper.", next: "read_journal" },
            { text: "🔑 Pocket the key and move into the cave.", next: "enter_confident" }
        ]
    },

    entrance_search: {
        text: "You sweep your torch low along the entrance floor. Between two stones, you spot a small carved tile — the same broken-circle symbol from outside. When you press it, a section of the wall clicks open, revealing a hidden alcove.\n\nInside: a lantern, an oil flask, and a crude map scratched onto a flat stone. The map shows the cave layout — three chambers, two of which are marked with warnings. One chamber has a star drawn beside it.\n\nYou've found a shortcut that leads directly to the star chamber.",
        choices: [
            { text: "⭐ Use the shortcut to the star chamber.", next: "star_chamber_shortcut" },
            { text: "🗺️ Take the map and explore the regular path.", next: "left_path_light" }
        ]
    },

    /* ── LEFT PATH ────────────────────────────────────── */
    left_path_light: {
        text: "You follow the faint glow down the left corridor. The air grows warmer with every step, and the smell of minerals sharpens. The glow turns out to be coming from the walls — thin streaks of luminescent crystal embedded in the rock, pulsing with a soft blue light.\n\nAt the end of the corridor, you find a chamber unlike anything you've seen. The floor is covered in ancient tiles, and in the center stands a stone pedestal with a shallow bowl on top. In the bowl: a single, still-burning flame.\n\nA flame with no fuel. A flame that shouldn't exist.",
        choices: [
            { text: "🤲 Reach out and touch the flame.", next: "touch_flame" },
            { text: "🔍 Search the chamber walls for clues.", next: "chamber_search" },
            { text: "🪙 Place something small into the bowl.", next: "offer_item" }
        ]
    },

    touch_flame: {
        text: "Your fingers enter the flame — and you feel nothing. No heat. No burn. But the moment your hand passes through it, the world goes quiet. Then, all around you, words begin to appear on the walls, glowing in the same blue-white light as the flame.\n\nThey form a sentence, word by word:\n\n'BENEATH THE WEST STONE — THE KEY TO THE DEEPER CHAMBER.'\n\nThe flame flickers once, and then returns to its steady burn.",
        choices: [
            { text: "🧱 Investigate the west wall.", next: "west_stone_secret" },
            { text: "⬅️ Return to the main corridor and take the right path.", next: "right_path_paintings" }
        ]
    },

    chamber_search: {
        text: "You move carefully around the chamber, running your hands along the carved tiles on the walls. Many depict travelers — some finding treasure, some turning back, some never returning. You notice that every traveler who found something was depicted carrying three items: a light, a rope, and a key.\n\nYou have two of the three. But you don't have a key.",
        choices: [
            { text: "🧱 Check the west wall for a loose stone.", next: "west_stone_secret" },
            { text: "🪙 Try placing your torch in the bowl.", next: "offer_item" }
        ]
    },

    offer_item: {
        text: "You reach into your pocket and place a small coin into the bowl. The flame swells, doubling in size for just a moment — then three tiles in the floor shift with a grinding sound. When the dust settles, a narrow staircase leads downward into a deeper level of the cave.\n\nIt looks old. And it looks deliberate.",
        choices: [
            { text: "⬇️ Descend the stairs immediately.", next: "deep_chamber" },
            { text: "🧱 Check the west wall before descending.", next: "west_stone_secret" }
        ]
    },

    west_stone_secret: {
        text: "You press along the west wall until one stone slides inward with a soft scrape. Behind it: a small iron key on a hook, still perfectly preserved after who knows how many years. With it, there's a folded piece of ancient parchment.\n\nThe parchment shows a single symbol — the same broken circle from the entrance — with the word: 'DEEPER' written underneath.",
        choices: [
            { text: "⬇️ Find the deeper chamber and use the key.", next: "deep_chamber" },
            { text: "➡️ Head back and take the right path first.", next: "right_path_paintings" }
        ]
    },

    /* ── RIGHT PATH ───────────────────────────────────── */
    right_path_paintings: {
        text: "The right corridor is longer and narrower. The painted walls here are more detailed — scenes of hunters, festivals, and what looks like a council of elders standing before an open stone door. You begin to piece together a history.\n\nThis was a sacred place. People brought offerings here, made decisions here, protected something here.\n\nAt the end of the corridor, you find a heavy wooden door — reinforced with iron and sealed with a padlock. Beside it, scratched at eye level: 'WRONG WAY. THE TRUE PATH IS BEHIND THE FIRE.'",
        choices: [
            { text: "🔑 Try the small key from the alcove if you found it.", next: "locked_door_key" },
            { text: "🔥 Return to the flame chamber — 'behind the fire'.", next: "left_path_light" },
            { text: "💪 Try forcing the door open.", next: "door_force" }
        ]
    },

    locked_door_key: {
        text: "The small iron key slides into the padlock perfectly. The lock springs open with a satisfying click. Beyond the door: a narrow room stacked with clay jars, each sealed with wax. In the center of the room, an ornate box sits on a shelf. The lid is carved with the broken-circle symbol.",
        choices: [
            { text: "🏺 Open the ornate box.", next: "ornate_box" },
            { text: "🔍 Examine the clay jars first.", next: "clay_jars" }
        ]
    },

    door_force: {
        text: "You throw your shoulder against the door. It doesn't budge. On your second attempt, your foot slips and you stumble into the wall — and your hand lands on a loose stone. Behind it, a hidden lever.\n\nYou pull the lever. The door swings open smoothly, as though it was never locked at all.",
        choices: [
            { text: "👣 Step inside.", next: "locked_door_key" }
        ]
    },

    clay_jars: {
        text: "You carefully open one of the sealed jars. Inside: a rolled scroll of thin animal skin, covered in faded script. You can make out enough to understand — these jars contain records. Histories. Names of people and places long forgotten. Someone stored an entire library here.\n\nAmong the jars, one is different: smaller, heavier, sealed with dark wax. When you pick it up, something shifts inside.",
        choices: [
            { text: "🔓 Break the dark-wax jar open.", next: "jar_treasure" },
            { text: "📦 Take it with you and open the ornate box.", next: "ornate_box" }
        ]
    },

    /* ── DEEPER CAVE ──────────────────────────────────── */
    deep_chamber: {
        text: "The staircase opens into a vast underground hall. The ceiling is so high you can't see it. Massive stone columns rise from the floor like a cathedral. And at the far end of the hall, visible even from the staircase:\n\nA door. Enormous. Made of polished black stone. Covered in the broken-circle symbol repeated hundreds of times.\n\nAs you step closer, the floor vibrates faintly beneath your feet.",
        choices: [
            { text: "🚪 Approach the black stone door.", next: "final_door" },
            { text: "🏛️ Explore the hall before the door.", next: "hall_explore" }
        ]
    },

    star_chamber_shortcut: {
        text: "The hidden passage is tight but passable. You crawl through and emerge directly inside a large chamber. The walls are black, but the ceiling — the ceiling is covered in inlaid stone shaped and colored to look exactly like a night sky.\n\nYou're inside the star chamber. Everything on the stone map points here. In the center: a plinth with an impression the exact shape of the broken-circle symbol.",
        choices: [
            { text: "🔑 Press the key into the impression.", next: "final_door" },
            { text: "🔍 Explore the star chamber before touching anything.", next: "hall_explore" }
        ]
    },

    hall_explore: {
        text: "You spend time moving between the columns. Each column has a face carved into it — not frightening, but solemn. Watchful. Between two columns near the eastern wall, you find a chest half-buried in rubble. The lock is rusted away.\n\nInside the chest: a journal — more recent than you'd expect. The last entry is dated forty years ago. The final line reads:\n\n'I found it. I left it there. Some things should stay buried. Go home.'\n\nYou look toward the black stone door.",
        choices: [
            { text: "🚪 Open the door anyway.", next: "final_door" },
            { text: "🏃 Heed the warning. Leave the cave.", next: "ending_wise" }
        ]
    },

    /* ── FINAL CHAMBER & ENDINGS ─────────────────────── */
    final_door: {
        text: "The black stone door opens silently, as though it was waiting for you. Beyond it: a chamber the size of a house, lit by more of those impossible blue-white flames — dozens of them, in niches along every wall.\n\nAt the center, a raised stone platform. On the platform: a carved chest of pale stone, sealed with a simple latch.\n\nThere's no danger here. No trap. Just the chest, the light, and silence so deep you can hear your own pulse.",
        choices: [
            { text: "🎁 Open the chest.", next: "ending_treasure" },
            { text: "📷 Document everything without touching the chest.", next: "ending_scholar" },
            { text: "🚶 Leave the chest undisturbed and exit the cave.", next: "ending_wise" }
        ]
    },

    ornate_box: {
        text: "The ornate box opens easily. Inside, wrapped in old cloth: a carved stone medallion. The broken-circle symbol is on one side. On the other: a map etched into the stone with incredible precision — a map of the cave, but showing a level far deeper than you've reached.\n\nA map no one alive could have made, pointing to something that no one alive has found.",
        choices: [
            { text: "⬇️ Take the map and head deeper.", next: "deep_chamber" },
            { text: "🚶 This is enough. Take the medallion and leave.", next: "ending_medallion" }
        ]
    },

    jar_treasure: {
        text: "The dark-wax jar cracks open. Inside, embedded in packed sand, is a small key — almost identical to the iron one you may have found, but made of a darker metal and warm to the touch.\n\nOn the flat end of the key: the broken-circle symbol.",
        choices: [
            { text: "⬇️ Take the key and find the deeper chamber.", next: "deep_chamber" },
            { text: "📦 Combine this clue with the ornate box.", next: "ornate_box" }
        ]
    },

    read_journal: {
        text: "The journal belongs to someone named Mara — an archaeologist, based on the notes. The entries chart weeks of exploration and growing excitement, then a final entry written in shaking handwriting:\n\n'Chamber found. Contents intact after millennia. I understand now why the villagers say this place is alive. I'm leaving everything here. This knowledge shouldn't travel lightly. If you're reading this, you're already deeper than you should be. Be careful. And be honest about why you came.'\n\nYou sit with that last line for a moment.",
        choices: [
            { text: "🔦 Enter the cave — your intentions are good.", next: "enter_confident" },
            { text: "🌅 Go home. Some things are best left alone.", next: "ending_wise" }
        ]
    },

    /* ── ENDINGS ──────────────────────────────────────── */
    ending_treasure: {
        text: "You open the chest.\n\nInside: nothing you expected. No gold. No jewels. Instead, hundreds of rolled scrolls, each sealed and labeled in a script you can barely read. A library — an entire lost civilization's collected knowledge, preserved here for thousands of years.\n\nThis isn't a treasure to take. It's a treasure to protect.\n\nYou photograph everything carefully. You seal the chest. You mark the location on every device you have. And when you walk out of the cave as dawn breaks outside, you know exactly what comes next: not fame, not fortune — but years of patient, careful work to bring this history back into the world.\n\n✨ THE END — The Keeper's Path",
        choices: []
    },

    ending_scholar: {
        text: "You document every detail. Every carving, every flame, every inch of the chamber. Your camera fills with hundreds of photographs. You take nothing. Touch nothing. Disturb nothing.\n\nWhen you finally leave the cave and breathe outside air again, you already know who needs to hear about this — the historians, the archaeologists, the linguists who've spent their lives looking for exactly this kind of place.\n\nYou sit on a rock outside the cave entrance and begin writing your report.\n\n📚 THE END — The Scholar's Path",
        choices: []
    },

    ending_wise: {
        text: "You look at the cave one last time. Then you turn around.\n\nSome places are older than human curiosity. Some discoveries are better left for a different time, a different person, a different kind of readiness.\n\nYou walk back the way you came. The cave is still there when you reach your car. The map is still in your bag. Maybe next year. Maybe with the right team. Maybe when you understand more clearly what you're looking for.\n\nThe cave will wait.\n\n🌿 THE END — The Patient Path",
        choices: []
    },

    ending_medallion: {
        text: "You wrap the stone medallion carefully and tuck it into your bag. A souvenir, yes — but more than that. A beginning. A question.\n\nThe deeper map etched on its back will take months to decode properly. The library you know must exist down there isn't going anywhere. You have time to do this right, with the right expertise, with the right permissions.\n\nAs you step back into daylight, you hold the medallion up against the sun. The broken-circle symbol glows amber.\n\n🧩 THE END — The First Step",
        choices: []
    }

};

/* ── Story metadata (used by the engine) ──── */
var STORY_META = {
    title: 'The Secret Cave',
    author: 'Teacher Ry',
    totalNodes: Object.keys(STORY_DATA).length,
    startNode: 'start'
};
