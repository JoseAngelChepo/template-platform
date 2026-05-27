import { landingContent } from "@/content/landing"

export default function FaqSection() {
  const { faq } = landingContent

  return (
    <section id={faq.id} className="landing-section" aria-labelledby="landing-faq-title">
      <div className="landing-container landing-container--narrow">
        <p className="landing-eyebrow">{faq.eyebrow}</p>
        <h2 id="landing-faq-title" className="landing-title">
          {faq.title}
        </h2>
        <dl className="landing-faq">
          {faq.items.map((item) => (
            <div key={item.question} className="landing-faq__item">
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
