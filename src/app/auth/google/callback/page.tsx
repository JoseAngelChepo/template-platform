"use client"

import { Suspense, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/lib/toast"
import Loader from "@/components/ui/Loader"
import { normalizeAuthRedirect, parseGoogleAuthState } from "@/lib/auth-redirect"
import { useServices } from "@/data/providers/ServicesProvider"


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
      const stateRedirect = parseGoogleAuthState(stateParam)
      const finalRedirect =
        stateRedirect || normalizeAuthRedirect(redirect, "/dashboard")

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
