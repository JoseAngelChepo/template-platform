import { landingContent } from "@/content/landing"

export default function SolutionSection() {
  const { solution } = landingContent

  return (
    <section id={solution.id} className="landing-section" aria-labelledby="landing-solution-title">
      <div className="landing-container landing-split">
        <div>
          <p className="landing-eyebrow">{solution.eyebrow}</p>
          <h2 id="landing-solution-title" className="landing-title">
            {solution.title}
          </h2>
          <p className="landing-lede">{solution.lede}</p>
        </div>
        <ul className="landing-checklist">
          {solution.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
