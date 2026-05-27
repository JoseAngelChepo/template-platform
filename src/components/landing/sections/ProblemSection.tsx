import { landingContent } from "@/content/landing"

export default function ProblemSection() {
  const { problem } = landingContent

  return (
    <section
      id={problem.id}
      className="landing-section landing-section--muted"
      aria-labelledby="landing-problem-title"
    >
      <div className="landing-container">
        <p className="landing-eyebrow">{problem.eyebrow}</p>
        <h2 id="landing-problem-title" className="landing-title">
          {problem.title}
        </h2>
        <p className="landing-lede">{problem.lede}</p>
        <ul className="landing-grid landing-grid--3">
          {problem.items.map((item) => (
            <li key={item.title} className="landing-card">
              <h3 className="landing-card__title">{item.title}</h3>
              <p className="landing-card__text">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
