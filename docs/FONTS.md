# Recommended fonts

Google Fonts that work well with this template’s light UI. Load them with [`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for zero layout shift and no extra requests at runtime.

**Shipped default:** [Poppins](https://fonts.google.com/specimen/Poppins) (`src/config/fonts.ts` + `--app-font` in `globals.css`).

---

## Poppins (default)

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

const raleway = Raleway({
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

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Playfair Display

- **Style:** high-contrast serif (display)  
- **Good for:** hero titles, quotes, editorial accents — not for long body copy  
- **Pair with:** any of the sans families above for paragraphs and UI  

```ts
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
```

---

## Switching the app default

1. Replace the loader in `src/config/fonts.ts` (or add a second font and point `appFont` to it).  
2. Set `className={appFont.variable}` on `<body>` in `src/app/layout.tsx`.  
3. Update `--app-font` in `src/app/globals.css`, e.g. `var(--font-raleway), system-ui, sans-serif`.  

Use a second variable only where needed, e.g. `font-family: var(--font-playfair), Georgia, serif` on `.hero-title`.
