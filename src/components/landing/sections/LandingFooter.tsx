import Link from "next/link"
import { landingContent } from "@/content/landing"

export default function LandingFooter() {
  const { brand, footer } = landingContent
  const year = new Date().getFullYear()
  const copyright = footer.copyright.replace("{year}", String(year))

  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer__inner">
        <div>
          <p className="landing-footer__brand">{brand.name}</p>
          <p className="landing-footer__tagline">{footer.tagline}</p>
        </div>
        <nav className="landing-footer__links" aria-label="Footer">
          {footer.links.map((link) => (
            <Link key={link.label} href={link.href} className="landing-footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="landing-container">
        <p className="landing-footer__copy">{copyright}</p>
      </div>
    </footer>
  )
}
