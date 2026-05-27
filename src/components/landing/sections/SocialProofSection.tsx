import { landingContent } from "@/content/landing"

export default function SocialProofSection() {
  const { socialProof } = landingContent

  return (
    <section className="landing-section landing-section--muted" aria-labelledby="landing-proof-title">
      <div className="landing-container">
        <p className="landing-eyebrow">{socialProof.eyebrow}</p>
        <h2 id="landing-proof-title" className="landing-title">
          {socialProof.title}
        </h2>
        <ul className="landing-stats">
          {socialProof.stats.map((stat) => (
            <li key={stat.label} className="landing-stat">
              <span className="landing-stat__value">{stat.value}</span>
              <span className="landing-stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>
        <blockquote className="landing-quote">
          <p>&ldquo;{socialProof.quote.text}&rdquo;</p>
          <footer>{socialProof.quote.attribution}</footer>
        </blockquote>
      </div>
    </section>
  )
}
