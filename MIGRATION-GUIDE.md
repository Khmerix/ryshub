# TOEFL Design System - Migration Guide

## What Was Created

### New Files
1. **`toefl-styles.css`** (26KB) - All shared CSS components
2. **`toefl-section-colors.css`** (4KB) - Section-specific color themes
3. **`TEMPLATE.html`** (13KB) - Starter template for consistency
4. **`DESIGN-SYSTEM.md`** - Complete documentation
5. **`MIGRATION-GUIDE.md`** - This file

---

## Benefits of New System

| Before | After |
|--------|-------|
| ~500 lines of duplicated CSS per file | 1 shared CSS file (26KB) |
| All sections look identical | Each section has unique color accent |
| Hard to update all files | Change 1 file, all sections update |
| Inconsistent class names | Standardized component classes |
| No documentation | Complete design system docs |

---

## Migration Steps (Per HTML File)

### Step 1: Add CSS Links
Replace the entire `<style>` block with these 2 lines:
```html
<link rel="stylesheet" href="toefl-styles.css">
<link rel="stylesheet" href="toefl-section-colors.css">
```

### Step 2: Add Section Class
Add the appropriate class to `<body>`:
```html
<!-- Reading -->
<body class="section-reading">

<!-- Listening -->
<body class="section-listening">

<!-- Speaking -->
<body class="section-speaking">

<!-- Writing -->
<body class="section-writing">
```

### Step 3: Update Header Structure

**OLD:**
```html
<header class="bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
```

**NEW:**
```html
<header class="toefl-header">
    <div class="toefl-header-content">
        <div class="toefl-brand">
```

### Step 4: Update Logo Box

**OLD:**
```html
<div class="glass-frame px-6 py-3 flex items-center gap-3">
    <i class="fas fa-graduation-cap text-3xl text-blue-500"></i>
```

**NEW:**
```html
<div class="toefl-logo">
    <i class="fas fa-graduation-cap toefl-logo-icon"></i>
```

### Step 5: Update Layout Container

**OLD:**
```html
<div class="max-w-7xl mx-auto px-6 py-8 flex gap-8">
    <aside class="w-72 flex-shrink-0">
```

**NEW:**
```html
<div class="toefl-container">
    <aside class="toefl-sidebar">
        <div class="toefl-sidebar-content">
```

### Step 6: Update Main Content

**OLD:**
```html
<main class="flex-1">
```

**NEW:**
```html
<main class="toefl-main">
```

### Step 7: Update Progress Fill

**OLD:**
```html
<div id="progress-bar" class="progress-fill" style="width: 0%"></div>
```

**NEW:**
No change needed - class name stays the same, but now uses CSS variables for colors.

---

## Visual Changes

### Reading Section (Blue - Default)
- Primary: `#2563eb` 🔵
- No changes needed if already blue

### Listening Section (Emerald)
- Primary: `#10b981` 🟢
- Progress bars, buttons, icons turn green

### Speaking Section (Orange)
- Primary: `#f97316` 🟠
- Record button already red, other elements turn orange

### Writing Section (Purple)
- Primary: `#a855f7` 🟣
- Word boxes, buttons, progress turn purple

---

## Testing Checklist

After migration, verify:

- [ ] Header displays correctly with section icon
- [ ] Timer shows proper monospace font
- [ ] Progress bar animates with section color
- [ ] Buttons have hover effects
- [ ] Question numbers show section color
- [ ] Modal has proper styling
- [ ] Responsive layout works on mobile
- [ ] Scrollbar matches section color

---

## Rollback Plan

If you need to revert:
1. Keep your original HTML files as backup
2. Remove the 2 CSS `<link>` tags
3. Restore the original `<style>` block
4. Remove `section-xxx` class from body

---

## Need Help?

1. **Check TEMPLATE.html** - Copy/paste ready structure
2. **Read DESIGN-SYSTEM.md** - Complete component reference
3. **Compare with original** - Keep backups for reference

---

## Estimated Time Savings

| Task | Before | After |
|------|--------|-------|
| Add new component | Edit 4 files | Edit 1 file |
| Change color scheme | Edit 4 files | Edit 1 file |
| Fix bug in buttons | Edit 4 files | Edit 1 file |
| Add new section | Copy/paste 500 lines | Copy TEMPLATE.html |

**Total CSS reduction:** ~2000 lines → ~600 lines (70% smaller)
