# TOEFL iBT Design System

## Overview
A consistent, modern dark-themed design system for TOEFL iBT test sections with section-specific color accents.

---

## File Structure

```
TOEFL iBT/
├── toefl-styles.css          # Shared components & base styles
├── toefl-section-colors.css  # Section-specific color overrides
├── TEMPLATE.html             # Starter template for new sections
└── DESIGN-SYSTEM.md          # This documentation
```

---

## Quick Start

### 1. For New Sections
Copy `TEMPLATE.html` and:
1. Change `[SECTION NAME]` to your section name
2. Set `body class="section-[name]"` (reading/listening/speaking/writing)
3. Replace `[SECTION_ICON]` with appropriate Font Awesome icon
4. Add your content

### 2. For Existing Sections
Add these lines to your HTML `<head>`:
```html
<link rel="stylesheet" href="toefl-styles.css">
<link rel="stylesheet" href="toefl-section-colors.css">
```

Add section class to `<body>`:
```html
<body class="section-reading">  <!-- or section-listening, etc. -->
```

---

## Color Palette

### Core Colors (All Sections)
| Token | Value | Usage |
|-------|-------|-------|
| `--dark-bg` | `#0f172a` | Main background |
| `--darker-bg` | `#020617` | Gradient start |
| `--card-bg` | `#1e293b` | Card backgrounds |
| `--text-primary` | `#f8fafc` | Headings, primary text |
| `--text-secondary` | `#94a3b8` | Secondary text |
| `--success` | `#10b981` | Correct answers, success states |
| `--warning` | `#f59e0b` | Warnings, timers |
| `--error` | `#ef4444` | Errors, incorrect answers |

### Section Accent Colors
| Section | Primary | Dark | Light | Accent |
|---------|---------|------|-------|--------|
| **Reading** | `#2563eb` 🔵 | `#1e40af` | `#3b82f6` | `#06b6d4` |
| **Listening** | `#10b981` 🟢 | `#047857` | `#34d399` | `#2dd4bf` |
| **Speaking** | `#f97316` 🟠 | `#c2410c` | `#fb923c` | `#fbbf24` |
| **Writing** | `#a855f7` 🟣 | `#7e22ce` | `#c084fc` | `#e879f9` |

---

## Components

### 1. Header
```html
<header class="toefl-header">
    <div class="toefl-header-content">
        <!-- Logo -->
        <div class="toefl-brand">
            <div class="toefl-logo">
                <i class="fas fa-[icon] toefl-logo-icon"></i>
                <div class="toefl-logo-text">
                    <h1>TOEFL iBT</h1>
                    <p>Section Name</p>
                </div>
            </div>
        </div>
        <!-- Actions -->
        <div class="toefl-header-actions">
            <div class="timer-display">00:00</div>
            <button class="btn-3d">Submit</button>
        </div>
    </div>
</header>
```

### 2. Layout Grid
```html
<div class="toefl-container">
    <aside class="toefl-sidebar">
        <div class="toefl-sidebar-content">
            <!-- Sidebar content -->
        </div>
    </aside>
    <main class="toefl-main">
        <!-- Main content -->
    </main>
</div>
```

### 3. Glass Card
```html
<div class="glass-frame p-6">
    <!-- Content -->
</div>

<!-- With section color border -->
<div class="glass-frame glass-frame-section p-6">
    <!-- Content -->
</div>
```

### 4. Buttons

#### Primary Button
```html
<button class="btn-3d">
    <i class="fas fa-icon mr-2"></i>Button Text
</button>
```

#### Secondary Button
```html
<button class="btn-3d btn-3d-secondary">Secondary</button>
```

#### Record Button (Speaking only)
```html
<button class="btn-3d btn-record">
    <i class="fas fa-microphone mr-2"></i>Record
</button>
```

### 5. Badges

#### Type Badges
```html
<span class="badge badge-blue">Complete the Words</span>
<span class="badge badge-green">Read in Daily Life</span>
<span class="badge badge-purple">Academic Passage</span>
<span class="badge badge-orange">Announcement</span>
```

#### Status Badges
```html
<span class="status-badge status-pending">
    <i class="fas fa-clock"></i> Pending
</span>
<span class="status-badge status-recording">
    <i class="fas fa-circle"></i> Recording
</span>
<span class="status-badge status-uploading">
    <i class="fas fa-spinner fa-spin"></i> Uploading
</span>
<span class="status-badge status-completed">
    <i class="fas fa-check"></i> Completed
</span>
```

### 6. Question Frame
```html
<div class="question-frame">
    <!-- Question header -->
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
            <span class="badge badge-blue">Type</span>
            <span class="text-slate-500 text-sm">Q1-5</span>
        </div>
        <span class="status-badge status-pending" id="status-q1">
            <i class="fas fa-clock"></i> Pending
        </span>
    </div>
    
    <!-- Question number + text -->
    <div class="flex items-start gap-4 mb-4">
        <div class="q-number">1</div>
        <p class="font-medium text-white text-lg">Question text here</p>
    </div>
    
    <!-- Options -->
    <div class="space-y-3 ml-12">
        <label class="option-3d" onclick="selectOption('q1', 'A', this)">
            <div class="option-radio"></div>
            <span class="text-slate-300">(A) Option</span>
        </label>
        <!-- More options... -->
    </div>
</div>
```

### 7. Audio Player
```html
<div class="audio-player" id="audio-player-id">
    <button class="play-btn" onclick="playAudio('id')">
        <i class="fas fa-play"></i>
    </button>
    <p class="text-slate-400 text-sm mb-2">Click to play</p>
    <div class="audio-wave">
        <div class="audio-bar"></div>
        <!-- 9 bars total -->
    </div>
    <audio id="id" src="file.mp3" onended="audioEnded('id')"></audio>
</div>
```

### 8. Progress Bar
```html
<div class="progress-container h-3">
    <div id="progress-bar" class="progress-fill" style="width: 0%"></div>
</div>
```

### 9. Timer Display
```html
<!-- Standard timer -->
<div class="timer-display">00:00</div>

<!-- Warning timer (for timed tasks) -->
<div class="timer-box">
    <i class="fas fa-clock"></i>
    <span>07:00</span>
</div>
```

### 10. Modal
```html
<div id="modal-id" class="modal-backdrop hidden">
    <div class="modal-content text-center">
        <div class="modal-icon">
            <i class="fas fa-trophy text-3xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Title</h3>
        <p class="text-slate-400 mb-8">Description</p>
        <button class="btn-3d px-8 py-3">Action</button>
    </div>
</div>
```

### 11. Writing Components

#### Textarea
```html
<textarea class="writing-textarea" rows="12" placeholder="Type here..."></textarea>
<div class="word-counter">0 words</div>
```

#### Word Box (Sentence Building)
```html
<div class="word-box" draggable="true">word</div>
```

#### Sentence Builder
```html
<div class="sentence-builder" ondrop="drop(event)" ondragover="allowDrop(event)">
    <span class="text-slate-500 text-sm italic">Drag words here...</span>
</div>
```

### 12. Fill-in-the-Blank
```html
<input type="text" class="fill-input" placeholder="___" onchange="checkAnswer(this, 'correct')">
```

---

## Section-Specific Icons

| Section | Header Icon | Task Icons |
|---------|-------------|------------|
| **Reading** | `fa-graduation-cap` | `fa-book-open`, `fa-envelope`, `fa-bullhorn` |
| **Listening** | `fa-headphones` | `fa-headphones`, `fa-comments`, `fa-broadcast-tower`, `fa-university` |
| **Speaking** | `fa-microphone` | `fa-microphone`, `fa-headphones`, `fa-user-tie` |
| **Writing** | `fa-pen-fancy` | `fa-puzzle-piece`, `fa-envelope`, `fa-users` |

---

## JavaScript Patterns

### Module Switching
```javascript
function switchModule(moduleNum) {
    document.querySelectorAll('.module-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('module-' + moduleNum).classList.remove('hidden');
    document.getElementById('module-' + moduleNum).classList.add('fade-in');
    
    // Update button states
    document.getElementById('mod1-btn').className = moduleNum === 1 ? 'module-btn active' : 'module-btn';
    document.getElementById('mod2-btn').className = moduleNum === 2 ? 'module-btn active' : 'module-btn';
}
```

### Progress Tracking
```javascript
function updateProgress() {
    const total = 20;
    const answered = Object.keys(userAnswers).length;
    const progress = Math.round((answered / total) * 100);
    
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = progress + '%';
}
```

### Timer
```javascript
let seconds = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = mins + ':' + secs;
    }, 1000);
}
```

### Audio Playback
```javascript
let currentlyPlaying = null;

function playAudio(audioId) {
    const audio = document.getElementById(audioId);
    const player = document.getElementById('audio-' + audioId);
    
    if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        document.querySelectorAll('.audio-player').forEach(p => p.classList.remove('playing'));
    }
    
    if (audio.paused) {
        audio.play();
        player.classList.add('playing');
        currentlyPlaying = audio;
    } else {
        audio.pause();
        player.classList.remove('playing');
        currentlyPlaying = null;
    }
}

function audioEnded(audioId) {
    document.getElementById('audio-' + audioId).classList.remove('playing');
    currentlyPlaying = null;
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | >1024px | Full layout with sidebar |
| Tablet | ≤1024px | Stacked layout, sidebar below |
| Mobile | ≤640px | Compact header, full-width cards |

---

## Best Practices

1. **Always use the CSS variables** for colors - don't hardcode
2. **Add section class to body** for automatic color theming
3. **Use the glass-frame class** for all card-like containers
4. **Maintain consistent spacing** - use the utility classes
5. **Test all interactive elements** - hover, focus, active states
6. **Ensure proper contrast** - text is always readable
7. **Use loading states** for async operations (uploading, saving)

---

## Migration Guide

### From Old HTML to New System

**Before:**
```html
<style>
    :root { --primary-blue: #2563eb; ... }
    .glass-frame { ... }
    /* 500+ lines of CSS */
</style>
```

**After:**
```html
<link rel="stylesheet" href="toefl-styles.css">
<link rel="stylesheet" href="toefl-section-colors.css">
<body class="section-reading">
```

### Class Name Changes

| Old Class | New Class |
|-----------|-----------|
| `bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50` | `toefl-header` |
| `max-w-7xl mx-auto px-6 py-4 flex gap-8` | `toefl-container` |
| `w-72 flex-shrink-0` | `toefl-sidebar` |
| `flex-1` | `toefl-main` |

---

## Support & Updates

To update the design system:
1. Edit `toefl-styles.css` for global changes
2. Edit `toefl-section-colors.css` for color adjustments
3. All HTML files automatically get the updates

---

## Credits

- **Fonts:** Inter, Space Grotesk (Google Fonts)
- **Icons:** Font Awesome 6.4.0
- **Design:** Modern glass morphism with dark theme
- **Colors:** Tailwind-inspired palette with section accents
