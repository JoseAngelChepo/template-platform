import { landingContent } from "@/content/landing"

export default function HowItWorksSection() {
  const { howItWorks } = landingContent

  return (
    <section
      id={howItWorks.id}
      className="landing-section landing-section--muted"
      aria-labelledby="landing-how-title"
    >
      <div className="landing-container">
        <p className="landing-eyebrow">{howItWorks.eyebrow}</p>
        <h2 id="landing-how-title" className="landing-title">
          {howItWorks.title}
        </h2>
        <ol className="landing-steps">
          {howItWorks.steps.map((step) => (
            <li key={step.step} className="landing-step">
              <span className="landing-step__number">{step.step}</span>
              <div>
                <h3 className="landing-step__title">{step.title}</h3>
                <p className="landing-step__text">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
