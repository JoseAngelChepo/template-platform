import Link from "next/link"
import { landingContent } from "@/content/landing"

export default function FinalCtaSection() {
  const { finalCta } = landingContent

  return (
    <section className="landing-section landing-section--cta" aria-labelledby="landing-final-cta-title">
      <div className="landing-container landing-cta">
        <h2 id="landing-final-cta-title" className="landing-title">
          {finalCta.title}
        </h2>
        <p className="landing-lede">{finalCta.lede}</p>
        <div className="landing-hero__actions">
          <Link href={finalCta.primaryCta.href} className="landing-btn landing-btn--primary landing-btn--lg">
            {finalCta.primaryCta.label}
          </Link>
          <Link href={finalCta.secondaryCta.href} className="landing-btn landing-btn--secondary landing-btn--lg">
            {finalCta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
