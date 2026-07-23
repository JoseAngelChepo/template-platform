"use client"

import { Suspense, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/lib/toast"
import Loader from "@/components/ui/Loader"
import { useServices } from "@/data/providers/ServicesProvider"

function normalizeRedirectPath(input: unknown): string | null {
  if (typeof input !== "string") return null
  if (!input.startsWith("/") || input.startsWith("//")) return null
  return input
}

function GoogleCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    services: { refreshUser },
  } = useServices()
  const processedRef = useRef(false)

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (processedRef.current) return
      processedRef.current = true

      const userData = await refreshUser()
      if (!userData || typeof userData !== "object") {
        toast.error("Google sign-in could not be completed")
        router.replace("/sign-in")
        return
      }

      const redirect = searchParams.get("redirect")
      const stateParam = searchParams.get("state")
      let finalRedirect = "/dashboard"

      if (stateParam) {
        try {
          const decodedState = JSON.parse(atob(stateParam)) as { redirect?: string }
          finalRedirect = normalizeRedirectPath(decodedState.redirect) || finalRedirect
        } catch {
          // Keep default redirect when state cannot be parsed.
        }
      } else {
        finalRedirect = normalizeRedirectPath(redirect) || finalRedirect
      }

      router.replace(finalRedirect)
    }

    void handleGoogleCallback()
  }, [searchParams, router, refreshUser])

  return <p className="page-status">Signing you in…</p>
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<Loader />}>
      <GoogleCallbackContent />
    </Suspense>
  )
}
