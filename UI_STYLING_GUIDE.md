# BOD UI Styling Guide - OIESU Reference Patterns

## 📐 Overview
This guide documents the UI patterns extracted from the reference code to ensure consistent styling across all BOD landing page sections.

---

## 🎨 Core Design Patterns

### 1. Font Stack
```css
/* Headings */ 
font-family: 'Poppins', sans-serif;

/* Body Text */
font-family: 'Roboto', sans-serif;
```

**Applied in Tailwind:**
- Headings: Use `font-['Poppins']` or apply globally via CSS
- Body: Use `font-['Roboto']` or apply globally

---

### 2. Container Structure

#### Pattern A: Wide Content Sections
```tsx
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      {/* Content */}
    </div>
  </div>
</section>
```

#### Pattern B: Medium Content Sections
```tsx
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      {/* Content */}
    </div>
  </div>
</section>
```

#### Pattern C: Narrow Content (Forms, FAQs)
```tsx
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-2xl mx-auto">
      {/* Content */}
    </div>
  </div>
</section>
```

---

### 3. Typography Scale

#### Section Headers (Above H2)
```tsx
<div className="text-center mb-16">
  <span className="inline-block px-6 py-2 bg-foreground/5 text-foreground rounded-full text-lg font-bold mb-4">
    SECTION BADGE
  </span>
  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
    Main Section Heading
  </h2>
  <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
    Section description paragraph with larger text
  </p>
</div>
```

#### Hero Headlines
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
  Hero Headline Text
</h1>
<p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0">
  Hero subheadline description
</p>
```

#### Subsection Headings (H3)
```tsx
<h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
  Subsection Title
</h3>
<p className="text-lg text-muted-foreground leading-relaxed">
  Regular paragraph text
</p>
```

#### Card Headings
```tsx
<h3 className="text-xl font-bold text-foreground mb-3">
  Card Title
</h3>
<p className="text-muted-foreground">
  Card description text
</p>
```

#### Small/Support Text
```tsx
<p className="text-sm text-muted-foreground">
  Small supporting text
</p>
```

---

### 4. Section Spacing

#### Standard Section
```tsx
<section className="py-20 bg-white">
  {/* Content with consistent py-20 (5rem = 80px) */}
</section>
```

#### Alternating Backgrounds
```tsx
<section className="py-20 bg-white">...</section>
<section className="py-20 bg-gradient-to-br from-[#f8faff] to-[#e8f0ff]">...</section>
<section className="py-20 bg-white">...</section>
```

---

### 5. Margin Bottom Hierarchy

```tsx
mb-4   // 1rem / 16px - Between small elements
mb-6   // 1.5rem / 24px - Between paragraphs
mb-8   // 2rem / 32px - Between subsections
mb-12  // 3rem / 48px - Between major blocks
mb-16  // 4rem / 64px - Below section headers
```

**Typical Section Header Pattern:**
```tsx
<div className="text-center mb-16">
  <span className="mb-4">Badge</span>
  <h2 className="mb-6">Heading</h2>
  <p>Description</p>
</div>
```

---

### 6. Grid Layouts

#### 2-Column Grid (Desktop)
```tsx
<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

#### 3-Column Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

#### 4-Column Grid (Stats)
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  <div>Stat 1</div>
  <div>Stat 2</div>
  <div>Stat 3</div>
  <div>Stat 4</div>
</div>
```

---

### 7. Card Patterns

#### Feature Card
```tsx
<div className="bg-gradient-to-br from-[#f8faff] to-[#e8f0ff] rounded-3xl p-10 shadow-2xl border-2 border-[#5283ff]/20 hover:border-[#5283ff] transition-all duration-300">
  <div className="w-24 h-24 bg-[#000090] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
    <i className="fas fa-icon text-white text-4xl"></i>
  </div>
  <h3 className="text-2xl md:text-3xl font-bold text-[#12132b] mb-4">
    Feature Title
  </h3>
  <p className="text-xl text-[#12132b]/80 leading-relaxed">
    Feature description
  </p>
</div>
```

#### Benefit Card (Smaller)
```tsx
<div className="group bg-gradient-to-br from-[#f8faff] to-[#e8f0ff] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#5283ff]/20">
  <div className="w-14 h-14 bg-[#000090] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
    <i className="fas fa-icon text-white text-2xl"></i>
  </div>
  <h3 className="text-xl font-bold text-[#12132b] mb-3">Benefit Title</h3>
  <p className="text-[#12132b]/70">
    Benefit description
  </p>
</div>
```

---

### 8. Button Patterns (CTA Groups)

#### Primary CTA Group
```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <a href="https://wa.me/PHONE" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-xl hover:bg-[#20bd5a] transition-all shadow-lg transform hover:-translate-y-1">
    <i className="fab fa-whatsapp text-2xl"></i>
    <span>WhatsApp Now</span>
  </a>
  <a href="tel:PHONE" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#000090] text-white rounded-full font-bold text-xl hover:bg-[#12132b] transition-all shadow-lg transform hover:-translate-y-1">
    <i className="fas fa-phone text-2xl"></i>
    <span>Call Now</span>
  </a>
</div>
```

---

## 🎯 Component-Specific Patterns

### Hero Section
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid lg:grid-cols-2 gap-8 items-center`
- **H1**: `text-4xl md:text-5xl lg:text-6xl font-bold`
- **Subheading**: `text-xl md:text-2xl`
- **Badges**: `text-sm font-semibold`

### Benefits/Features Grid
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Card Title**: `text-xl font-bold`
- **Card Description**: `text-[#12132b]/70` (70% opacity)

### Testimonials/Stats
- **Container**: `max-w-6xl mx-auto`
- **Stats Numbers**: `text-5xl md:text-6xl font-bold`
- **Stats Label**: `text-xl font-semibold`

### FAQ Section
- **Container**: `max-w-4xl mx-auto` (narrower)
- **Question**: `text-lg font-bold`
- **Answer**: `text-[#12132b]/80 leading-relaxed`

### Contact Form
- **Container**: `max-w-4xl mx-auto` (narrower)
- **Input**: `px-4 py-3 rounded-xl border-2`
- **Label**: `font-semibold mb-2`

### Service Cards Section
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Card Title**: `text-xl font-bold`
- **Card Icon**: `w-14 h-14 bg-[#000090] rounded-xl`

### Reviews Section
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Review Text**: `text-[#12132b]/80 leading-relaxed`
- **Author**: `text-lg font-bold`

### Final CTA Section
- **Container**: `max-w-4xl mx-auto` (narrower, focused)
- **Heading**: `text-4xl md:text-5xl font-bold`
- **Button Group**: `flex flex-col sm:flex-row gap-4 justify-center`

### Expert Services Section
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid md:grid-cols-2 gap-8`
- **Service Title**: `text-2xl md:text-3xl font-bold`

### Trust Badges Section
- **Container**: `max-w-6xl mx-auto`
- **Grid**: `grid grid-cols-2 md:grid-cols-4 gap-6`
- **Badge**: `bg-gradient-to-br rounded-xl p-6`

### Brands Carousel Section
- **Container**: `max-w-6xl mx-auto`
- **Layout**: Full-width carousel with slight padding
- **Logo Size**: Consistent height/width constraints

---

## 🔄 Before & After Examples

### ❌ Before (Inconsistent)
```tsx
<section className="py-12">
  <div className="container">
    <div className="max-w-7xl">
      <h2 className="text-3xl font-semibold mb-4">
        Heading
      </h2>
      <p className="text-base">Description</p>
    </div>
  </div>
</section>
```

### ✅ After (Following Pattern)
```tsx
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block px-6 py-2 bg-[#5283ff]/10 text-[#5283ff] rounded-full text-lg font-bold mb-4">
          SECTION BADGE
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#12132b] mb-6">
          Heading
        </h2>
        <p className="text-xl md:text-2xl text-[#12132b]/70 max-w-4xl mx-auto leading-relaxed">
          Description
        </p>
      </div>
      {/* Content */}
    </div>
  </div>
</section>
```

---

## 📝 Implementation Checklist

### For Each Section Component:

- [ ] Use `py-20` for section padding
- [ ] Add `container mx-auto px-4 sm:px-6 lg:px-8`
- [ ] Choose appropriate max-width (`max-w-6xl`, `max-w-4xl`, or `max-w-2xl`)
- [ ] Apply typography scale:
  - [ ] H2: `text-4xl md:text-5xl font-bold`
  - [ ] H3: `text-2xl md:text-3xl font-bold`
  - [ ] Large paragraph: `text-xl md:text-2xl`
  - [ ] Regular paragraph: `text-lg`
- [ ] Use `mb-16` after section headers
- [ ] Use `mb-6` between paragraphs
- [ ] Apply `font-['Poppins']` to headings
- [ ] Apply `font-['Roboto']` to body text
- [ ] Ensure gap-6 or gap-8 for grids
- [ ] Add rounded-2xl or rounded-3xl to cards
- [ ] Include hover transitions on interactive elements

---

## 🚀 Quick Start: Updating Your Components

1. **Start with Hero Section** - Set the tone
2. **Update Section Headers** - Consistent pattern across all
3. **Standardize Cards** - Same size/spacing
4. **Align CTAs** - Same button patterns everywhere
5. **Fix Typography** - One pass through all text sizes

---

## 📦 Recommended Order of Updates

1. `HeroSection.tsx` ⭐ (Most important)
2. `BenefitsGridSection.tsx`
3. `ServiceCardsSection.tsx`
4. `ReviewsSection.tsx`
5. `FAQSection.tsx`
6. `FinalCTASection.tsx`
7. `ExpertServicesSection.tsx`
8. `StatsSection.tsx`
9. `TrustBadgesSection.tsx`
10. `BrandsCarouselSection.tsx`

---

## 💡 Pro Tips

1. **Consistency > Creativity**: Stick to the patterns
2. **Mobile-First**: Always test responsive breakpoints
3. **Copy-Paste-Adapt**: Use proven patterns from reference
4. **Test Typography**: Ensure readability at all sizes
5. **Check Spacing**: Use browser DevTools to verify margins

---

## 🎨 Color Palette Reference

```tsx
// Primary Colors
bg-[#000090]    // Dark Blue
bg-[#5283ff]    // Medium Blue
bg-[#f8faff]    // Very Light Blue
bg-[#e8f0ff]    // Light Blue

// Text Colors
text-[#12132b]         // Almost Black (headings)
text-[#12132b]/80      // 80% opacity (subheadings)
text-[#12132b]/70      // 70% opacity (body)

// CTA Colors
bg-[#25D366]    // WhatsApp Green
bg-[#000090]    // Primary Button
bg-[#fe42ac]    // Accent Pink
```

---

## 📸 Screenshot Reference Points

Key visual patterns to match:
- Section headers: Badge → Large Heading → Description
- Cards: Icon (large) → Title → Description
- CTAs: Always in groups, rounded-full, shadow-lg
- Spacing: Generous whitespace, consistent gaps
- Grids: 2-3-4 column patterns with proper gaps

---

This guide ensures all sections follow the same professional, polished design system. Apply these patterns systematically for a cohesive user experience.
