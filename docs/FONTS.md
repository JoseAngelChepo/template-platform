# Recommended fonts

Load fonts with [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for zero layout shift. The stock template ships **system-ui** in `src/config/fonts.ts` so builds work offline; **when you fork or rebrand, pick a font and wire it in the layout** (see below).

---

## For AI agents — choose a font first

When starting template customization (fork, rebrand, or new product), **choose one primary sans-serif** before editing landing or auth UI. Do not leave the default system stack unless the user explicitly wants no web font.

### Checklist (three files)

| Step | File | Action |
|------|------|--------|
| 1 | `src/config/fonts.ts` | Import from `next/font/google`, export `appFont` with `variable: "--font-<name>"` and weights `400`–`700` |
| 2 | `src/app/layout.tsx` | Keep `className={appFont.variable}` on `<body>` (already wired) |
| 3 | `src/app/globals.css` | Set `--app-font: var(--font-<name>), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |

Optional: second font (e.g. Playfair Display) only for hero/display — add another loader in `fonts.ts`, apply its variable on specific elements via styled-jsx, not on `<body>`.

### Example (Poppins)

`src/config/fonts.ts`:

```ts
import { Poppins } from "next/font/google"

export const appFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

`src/app/globals.css` (`:root`):

```css
--app-font: var(--font-poppins), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

`src/app/layout.tsx` already applies `appFont.variable` on `<body>` — no change needed if you only swap the loader in `fonts.ts` and update `--app-font`.

---

## Poppins (recommended default for products)

- **Style:** geometric sans-serif  
- **Good for:** product UI, forms, dashboards, marketing blocks  
- **Pair with:** Playfair Display for display headings  

```ts
import { Poppins } from "next/font/google"

export const appFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Raleway

- **Style:** elegant sans with open counters  
- **Good for:** landing pages, sign-in/sign-up, light headlines  
- **Pair with:** Poppins or Plus Jakarta Sans for body  

```ts
import { Raleway } from "next/font/google"

export const appFont = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Plus Jakarta Sans

- **Style:** neutral contemporary sans  
- **Good for:** SaaS, B2B, dense tables and data UI  
- **Pair with:** Playfair Display or Raleway for marketing hero lines  

```ts
import { Plus_Jakarta_Sans } from "next/font/google"

export const appFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Playfair Display (display only — not for body)

- **Style:** high-contrast serif (display)  
- **Good for:** hero titles, quotes, editorial accents — not for long body copy  
- **Pair with:** any sans above for paragraphs and UI  

```ts
import { Playfair_Display } from "next/font/google"

export const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

Use on specific elements, e.g. `font-family: var(--font-playfair), Georgia, serif` in a section’s `<style jsx>`.

---

## Offline / CI builds

If Google Fonts must not run at build time, keep `src/config/fonts.ts` as the system fallback (`variable: ""`) and rely on `--app-font` in `globals.css`. Document that choice for the user.
