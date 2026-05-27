import { landingContent } from "@/content/landing"

export default function FeaturesSection() {
  const { features } = landingContent

  return (
    <section id={features.id} className="landing-section" aria-labelledby="landing-features-title">
      <div className="landing-container">
        <p className="landing-eyebrow">{features.eyebrow}</p>
        <h2 id="landing-features-title" className="landing-title">
          {features.title}
        </h2>
        <ul className="landing-grid landing-grid--2">
          {features.items.map((item) => (
            <li key={item.title} className="landing-card landing-card--flat">
              <h3 className="landing-card__title">{item.title}</h3>
              <p className="landing-card__text">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
