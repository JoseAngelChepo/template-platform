"use client"

import Link from "next/link"
import { landingContent } from "@/content/landing"
import { useServices } from "@/data/providers/ServicesProvider"

export default function LandingHeader() {
  const { isLoggedIn, stateService } = useServices()
  const { brand, header } = landingContent

  return (
    <header className="landing-header">
      <div className="landing-container landing-header__inner">
        <Link href="/" className="landing-brand">
          {brand.name}
        </Link>
        <nav className="landing-nav" aria-label="Main">
          {header.nav.map((item) => (
            <a key={item.href} href={item.href} className="landing-nav__link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="landing-header__actions">
          {stateService && isLoggedIn ? (
            <Link href="/dashboard" className="landing-btn landing-btn--primary">
              {header.dashboardLabel}
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="landing-btn landing-btn--ghost">
                {header.loginLabel}
              </Link>
              <Link href="/sign-up" className="landing-btn landing-btn--primary">
                {header.signupLabel}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
