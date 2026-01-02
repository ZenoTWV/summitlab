# Footer Logo Hover Animation - Implementation Guide

This document explains how the footer logo hover animation was implemented for Summit Labs. The effect shows an abbreviated "SL" logo by default, which transitions to reveal the full "SUMMIT LABS" wordmark on hover.

## Overview

The animation creates a professional reveal effect:
- **Default state**: Shows abbreviated SL icon in neutral grey
- **On hover**: SL icon fades out while the full wordmark scales in from center
- **Smooth transition**: 600ms cubic-bezier easing for premium feel
- **Universal color**: Uses neutral grey that works on both light and dark backgrounds
- **Accessibility**: Supports keyboard focus and respects prefers-reduced-motion

## File Structure

### Required SVG Files

Place these files in your `public/brand/` directory:

```
public/brand/
├── black_icon.svg        # SL abbreviated logo (will be colored grey via CSS)
└── black_wordmark.svg    # Full SUMMIT LABS wordmark (will be colored grey via CSS)
```

**Note**: Only the black versions are needed. CSS filters apply a neutral grey color that works on both light and dark backgrounds.

## Component Implementation

### 1. Create FooterLogo Component

Create `src/components/ui/FooterLogo.astro`:

```astro
---
// Footer hover logo component - SL splits and reveals SUMMIT LABS wordmark
// Uses neutral grey color that works on both light and dark backgrounds

interface Props {
  clientName?: string; // Optional: for client websites
}

const { clientName } = Astro.props;

// Generate appropriate hover text
const hoverText = clientName
  ? `De website van ${clientName} is gerealiseerd door Summit Labs`
  : 'Deze website is gerealiseerd door Summit Labs';
---

<a
  href="https://summitlab.dev"
  class="footer-credit"
  aria-label="Made by Summit Labs"
  title={hoverText}
>
  <div class="footer-credit__container">
    <!-- SL Icon (visible by default, fades on hover) -->
    <div class="footer-credit__icon">
      <img
        src="/brand/black_icon.svg"
        alt="SL"
        class="footer-credit__sl"
      />
    </div>

    <!-- Wordmark (hidden, revealed on hover) -->
    <img
      src="/brand/black_wordmark.svg"
      alt="Summit Labs"
      class="footer-credit__wordmark"
    />
  </div>
</a>

<style>
  .footer-credit {
    display: inline-block;
    text-decoration: none;
    position: relative;
  }

  .footer-credit__container {
    position: relative;
    width: 200px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* SL Icon - starts visible, fades on hover */
  .footer-credit__icon {
    position: absolute;
    height: 100%;
    width: auto;
  }

  .footer-credit__sl {
    height: 100%;
    width: auto;
    object-fit: contain;
    opacity: 1;
    transition: opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
    /* Apply grey filter - works on both light and dark backgrounds */
    filter: brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%);
  }

  /* Wordmark - starts hidden, revealed on hover */
  .footer-credit__wordmark {
    position: absolute;
    height: 50%;
    width: auto;
    object-fit: contain;
    transform: scaleX(0);
    opacity: 0;
    transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1),
                opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
    image-rendering: crisp-edges;
    /* Apply grey filter - works on both light and dark backgrounds */
    filter: brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%);
  }

  /* Hover state - show wordmark, hide SL */
  .footer-credit:hover .footer-credit__sl,
  .footer-credit:focus-visible .footer-credit__sl {
    opacity: 0;
  }

  .footer-credit:hover .footer-credit__wordmark,
  .footer-credit:focus-visible .footer-credit__wordmark {
    transform: scaleX(1);
    opacity: 1;
  }

  /* Reduced motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    .footer-credit__wordmark,
    .footer-credit__sl {
      transition: none;
    }
    /* Show SL by default for reduced motion */
    .footer-credit__sl {
      opacity: 1;
    }
    .footer-credit__wordmark {
      transform: scaleX(0);
      opacity: 0;
    }
  }
</style>
```

### 2. Add to Footer

In your `Footer.astro` component:

```astro
---
import FooterLogo from '../ui/FooterLogo.astro';
// ... other imports
---

<footer class="bg-surface-100 border-t border-surface-200">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <!-- ... other footer content ... -->

    <!-- Copyright & Made by Summit Labs -->
    <div class="mt-8 pt-8 border-t border-surface-200 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-surface-500">
        &copy; {currentYear} Your Company
      </p>
      <FooterLogo />
    </div>
  </div>
</footer>
```

## How It Works

### Universal Grey Color

The component uses CSS filters to convert the black SVG logos to a neutral grey color that works on both light and dark backgrounds:

```css
filter: brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%);
```

This creates a medium grey (#727272 approximately) that:
- Is visible on light backgrounds
- Is visible on dark backgrounds
- Doesn't compete with colorful website designs
- Maintains a professional, subtle appearance

### Animation Mechanism

1. **Initial State**:
   - SL icon: `opacity: 1` (visible)
   - Wordmark: `opacity: 0` and `transform: scaleX(0)` (hidden, collapsed)

2. **On Hover**:
   - SL icon: `opacity: 0` (fades out)
   - Wordmark: `opacity: 1` and `transform: scaleX(1)` (fades in, expands from center)

3. **Timing**: Both transitions use `600ms cubic-bezier(0.2, 0.8, 0.2, 1)` for smooth, professional animation

### Key CSS Properties

- **`transform: scaleX(0/1)`**: Creates horizontal scale animation from center
- **`opacity`**: Creates cross-fade effect
- **`transition`**: Animates both properties smoothly
- **`position: absolute`**: Overlays logos in same space
- **`image-rendering: crisp-edges`**: Keeps SVG sharp at smaller sizes

## Customization Options

### Adjust Container Size

```css
.footer-credit__container {
  width: 200px;   /* Adjust width */
  height: 32px;   /* Adjust height */
}
```

### Adjust Wordmark Size

```css
.footer-credit__wordmark {
  height: 50%;    /* Percentage of container height */
}
```

### Adjust Animation Speed

```css
transition: opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
            /* Change 600ms to your preferred duration */
```

### Change Easing Curve

Common alternatives:
- `ease-in-out` - Standard browser easing
- `cubic-bezier(0.4, 0.0, 0.2, 1)` - Material Design
- `cubic-bezier(0.2, 0.8, 0.2, 1)` - Current (smooth, premium feel)

### Adjust Grey Color

To make the logos lighter or darker, modify the `brightness()` and `contrast()` values:

```css
/* Lighter grey */
filter: brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(110%) contrast(80%);

/* Darker grey */
filter: brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(80%) contrast(100%);
```

## Usage

### For Summit Labs Website (Your Own Site)

Simply add the component to your footer:

```astro
<FooterLogo />
```

Hover text will be: *"Deze website is gerealiseerd door Summit Labs"*

### For Client Websites

Pass the client's company name:

```astro
<FooterLogo clientName="FitCity" />
```

Hover text will be: *"De website van FitCity is gerealiseerd door Summit Labs"*

### More Examples

```astro
<!-- For By Shakir -->
<FooterLogo clientName="By Shakir" />
<!-- Hover: "De website van By Shakir is gerealiseerd door Summit Labs" -->

<!-- For Restaurant De Koperen Hoogte -->
<FooterLogo clientName="Restaurant De Koperen Hoogte" />
<!-- Hover: "De website van Restaurant De Koperen Hoogte is gerealiseerd door Summit Labs" -->
```

The grey color automatically works on any background color, so no theme prop is needed.

## Accessibility Features

1. **Keyboard Navigation**: Works with `:focus-visible` for keyboard users
2. **Screen Readers**: Includes `aria-label` and `title` attributes
3. **Reduced Motion**: Respects `prefers-reduced-motion` media query
4. **Semantic HTML**: Uses proper `<a>` tag with meaningful attributes

## Browser Support

Works in all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Opera

**Requirements**:
- CSS transforms
- CSS transitions
- SVG support

## Troubleshooting

### Logo appears bold or blurry
- Ensure SVG files are high quality
- Try adjusting `image-rendering` property
- Check SVG viewBox and dimensions

### Animation feels slow/fast
- Adjust the `600ms` duration value
- Try different easing curves

### Grey color not visible on certain backgrounds
- Adjust the `brightness()` value in the filter
- Try different contrast values
- Test on both light and dark backgrounds

### Animation not smooth
- Check for CSS conflicts
- Verify `transition` property is not overridden
- Ensure `overflow: hidden` is set on container

## Performance Notes

- Uses CSS transitions (GPU accelerated)
- SVG files load once and cached by browser
- No JavaScript required
- Minimal DOM manipulation
- Optimized for 60fps animations

## Credits

Animation created for Summit Labs portfolio website.
Implementation: Claude Sonnet 4.5
Design pattern: Split & Reveal Logo Effect
