"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { toast } from "@/lib/toast"
import createServices, {
  normalizeAuthMeUser,
  type AuthSessionPayload,
  type UsernameAvailabilityResponse,
} from "@/data/api/server"
import { ApiServices } from "@/data/api/server/config"

type UserProfile = Record<string, unknown> | null

type ServicesContextValue = {
  stateService: boolean
  isLoggedIn: boolean
  role: string | null
  user: UserProfile
  services: {
    signUp: (payload: {
      username: string
      firstName: string
      lastName: string
      email: string
      password: string
    }) => Promise<AuthSessionPayload | false>
    checkUsernameAvailability: (
      username: string,
    ) => Promise<UsernameAvailabilityResponse>
    login: (payload: { email: string; password: string }) => Promise<AuthSessionPayload | false>
    logout: () => Promise<void>
    getUser: (options?: { silent?: boolean }) => Promise<Record<string, unknown> | false | null>
    refreshUser: () => Promise<Record<string, unknown> | false | null>
  }
}

const ServicesContext = createContext<ServicesContextValue | undefined>(undefined)

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [stateService, setStateService] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile>(null)
  const Services = useMemo(() => createServices(ApiServices), [])

  const getUser = useCallback(
    async (options?: { silent?: boolean }) => {
      try {
        return await Services.getUser()
      } catch (err: unknown) {
        if (!options?.silent) {
          const message =
            err &&
            typeof err === "object" &&
            "response" in err &&
            err.response &&
            typeof err.response === "object" &&
            "data" in err.response &&
            err.response.data &&
            typeof err.response.data === "object" &&
            "message" in err.response.data
              ? String((err.response.data as { message?: string }).message)
              : "An error occurred while getting user"
          toast.error(message)
        }
        return false
      }
    },
    [Services],
  )

  const refreshUser = useCallback(async () => {
    const userData = await getUser({ silent: true })
    if (userData && typeof userData === "object") {
      setUser(userData)
      setRole(userData.role != null ? String(userData.role) : null)
      setIsLoggedIn(true)
    } else {
      setUser(null)
      setRole(null)
      setIsLoggedIn(false)
    }
    return userData
  }, [getUser])

  const checkUsernameAvailability = useCallback(
    async (username: string) => Services.checkUsernameAvailability(username),
    [Services],
  )

  const signUp = useCallback(
    async (payload: {
      username: string
      firstName: string
      lastName: string
      email: string
      password: string
    }) => {
      try {
        const data = await Services.signUp(payload)
        const normalized = normalizeAuthMeUser(data.user)
        if (normalized != null && typeof normalized === "object" && !Array.isArray(normalized)) {
          const profile = normalized as Record<string, unknown> & { role?: unknown }
          setUser(profile)
          setRole(profile.role != null ? String(profile.role) : null)
        } else {
          setUser(null)
          setRole(null)
        }
        setIsLoggedIn(true)
        return data
      } catch {
        toast.error("Sign up failed")
        return false
      }
    },
    [Services],
  )

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      try {
        const data = await Services.login(payload)
        const normalized = normalizeAuthMeUser(data.user)
        if (normalized != null && typeof normalized === "object" && !Array.isArray(normalized)) {
          const profile = normalized as Record<string, unknown> & { role?: unknown }
          setUser(profile)
          setRole(profile.role != null ? String(profile.role) : null)
        } else {
          setUser(null)
          setRole(null)
        }
        setIsLoggedIn(true)
        return data
      } catch {
        toast.error("Invalid email or password")
        return false
      }
    },
    [Services],
  )

  const logout = useCallback(async () => {
    try {
      await Services.logout()
    } catch {
      // ignore (e.g. already invalid token/session)
    }
    setIsLoggedIn(false)
    setRole(null)
    setUser(null)
  }, [Services])

  const refreshData = useCallback(async () => {
    await refreshUser()
    setStateService(true)
  }, [refreshUser])

  useEffect(() => {
    void refreshData()
  }, [refreshData])

  const value = useMemo<ServicesContextValue>(
    () => ({
      stateService,
      isLoggedIn,
      role,
      user,
      services: {
        signUp,
        checkUsernameAvailability,
        login,
        logout,
        getUser,
        refreshUser,
      },
    }),
    [
      stateService,
      isLoggedIn,
      role,
      user,
      signUp,
      checkUsernameAvailability,
      login,
      logout,
      getUser,
      refreshUser,
    ],
  )

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}

export function useServices(): ServicesContextValue {
  const ctx = useContext(ServicesContext)
  if (ctx === undefined) {
    throw new Error("useServices must be used within ServicesProvider")
  }
  return ctx
}
