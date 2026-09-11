# Design System Strategy: Architectural Clarity & Refraction

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Light."** Much like a diamond’s value is defined by its interaction with light, this system focuses on clarity, precision, and the intentional use of "negative space" as a luxury material. 

We are moving away from the "template" look of traditional e-commerce. Instead of rigid grids and boxes, we embrace **Architectural Minimalism**. This is achieved through:
*   **Intentional Asymmetry:** Off-center imagery and typography that invite the eye to move across the page like an editorial magazine.
*   **Structural Sharpness:** A strict 0px radius policy across all elements to mimic the precision of a master-cut stone.
*   **Tonal Depth:** Replacing harsh lines with shifts in surface temperature and light.

## 2. Colors: The Palette of Luxury
The color strategy uses a base of warm, "gallery" whites and deep charcoal, accented by a signature Champagne Gold that serves as a beacon of craftsmanship.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or containers. The UI must feel like a singular, fluid environment. Boundaries are created through background shifts:
*   Use `surface` (#fcf9f8) for the primary canvas.
*   Transition to `surface_container_low` (#f6f3f2) for secondary content areas.
*   Use `surface_container_high` (#ebe7e7) for interactive sidebars or drawers.
*   **Visual Soul:** For main CTAs or high-impact hero sections, use a subtle linear gradient from `primary` (#735c00) to `primary_container` (#d4af37) to create a metallic luster that flat color cannot replicate.

### Glass & Gradient Rule
Floating elements (such as navigation bars or quick-view overlays) should utilize **Glassmorphism**. Apply a semi-transparent `surface` color with a 20px–40px backdrop-blur. This ensures the jewelry photography remains the protagonist, even when UI elements are layered over it.

## 3. Typography: Editorial Authority
The typography scale is designed to feel like a high-end masthead. We pair the timeless authority of a serif with the technical precision of a modern sans-serif.

*   **Display & Headlines (notoSerif):** These are your "statements." Use `display-lg` (3.5rem) with reduced letter-spacing (-0.02em) for hero headlines to create a sense of gravity and heritage.
*   **Body & Titles (manrope):** The technical workhorse. Use `body-md` (0.875rem) for product descriptions. Increase letter-spacing (+0.05em) for `label-sm` (0.6875rem) to evoke the feel of a luxury watch face or a diamond certification report.
*   **Hierarchy:** Always prioritize the Serif for storytelling and the Sans-serif for utility. Never mix them within the same sentence.

## 4. Elevation & Depth: Tonal Layering
In this system, depth is a result of light, not physics. We avoid "drop shadows" in favor of **Ambient Tonal Layering**.

*   **The Layering Principle:** To lift a product card, do not add a shadow. Instead, place a `surface_container_lowest` (#ffffff) card on top of a `surface_container_low` (#f6f3f2) background. This creates a "soft lift" that feels natural and premium.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow for legibility, it must be extra-diffused. Use a 40px–60px blur at 4% opacity, using the `on_surface` color (#1c1b1b) to tint the shadow. It should look like a soft glow, not a dark smudge.
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use the `outline_variant` (#d0c5af) at **20% opacity**. This creates a "whisper" of a boundary that guides the user without cluttering the aesthetic.

## 5. Components
All components must adhere to the **0px Roundedness Scale**—no exceptions. Sharp corners convey precision and high-end manufacturing.

*   **Buttons:**
    *   *Primary:* Filled with `primary` (#735c00), text in `on_primary` (#ffffff). High-contrast, sharp edges.
    *   *Secondary:* A "Ghost" style. No fill, `outline` (#7f7663) at 40% opacity. On hover, the background shifts to `surface_container`.
*   **Input Fields:** Avoid boxes. Use a single bottom-aligned "Ghost Border" using `outline_variant`. The label should be in `label-md` (manrope) sitting 8px above the input line.
*   **Cards & Lists:** **Strictly prohibit divider lines.** Separate product items using vertical whitespace from the spacing scale (e.g., 64px or 80px). Use background shifts to differentiate the "Cart" summary from the "Product List."
*   **Jewelry Feature Chips:** For selecting gold carats or diamond cuts, use sharp-edged chips. The 'Selected' state should use a `primary_container` (#d4af37) background to mimic a gold inlay.
*   **Image Scanners:** Given the jewelry context, include a "Loupe" component—a circular glassmorphic hover state that magnifies the diamond's facets, reinforcing the "Modern Ethical Tech" vibe.

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme whitespace. If a section feels "finished," add 20% more padding.
*   **Do** overlap typography. A Serif headline can slightly overlap a high-quality product image to create depth.
*   **Do** use "Optical Centering." Because of the sharp corners, elements can sometimes look heavy; adjust layouts by eye to ensure they feel balanced, even if they aren't mathematically centered.

### Don't:
*   **Don't** use standard "Material" icons. Use ultra-thin (1pt) custom stroke icons to match the `manrope` weight.
*   **Don't** use pure black (#000000). Use `on_surface` (#1c1b1b) for text to maintain a softer, more sophisticated "charcoal" feel.
*   **Don't** use motion blurs or "bouncy" animations. Transitions should be linear or "ease-out" and timed at 300ms–500ms to feel deliberate and cinematic.