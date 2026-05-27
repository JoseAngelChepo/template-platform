import Link from "next/link"
import { landingContent } from "@/content/landing"

export default function HeroSection() {
  const { hero } = landingContent

  return (
    <section className="landing-section landing-section--hero" aria-labelledby="landing-hero-title">
      <div className="landing-container landing-hero">
        <p className="landing-eyebrow">{hero.eyebrow}</p>
        <h1 id="landing-hero-title" className="landing-title landing-title--xl">
          {hero.title}
        </h1>
        <p className="landing-lede landing-lede--lg">{hero.lede}</p>
        <div className="landing-hero__actions">
          <Link href={hero.primaryCta.href} className="landing-btn landing-btn--primary landing-btn--lg">
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} className="landing-btn landing-btn--secondary landing-btn--lg">
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
