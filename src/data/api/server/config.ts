import axios, { type AxiosError } from "axios"
import { toast } from "@/lib/toast"
import auth from "@/data/api/server/auth"
import { NEXT_PUBLIC_API_BASIC_AUTH, NEXT_PUBLIC_API_URL } from "@/config/env"

function basicAuthHeader(credentials: string): string {
  return `Basic ${btoa(credentials)}`
}

const ApiServices = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

function getLocaleFromCookie(): string {
  if (typeof document === "undefined") return "en"
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/)
  const raw = match?.[1]?.trim()
  const value = raw && raw.length > 0 ? raw : null
  return value === "es" || value === "en" ? value : "en"
}

const REQUEST_ID_HEADER = "x-request-id"

function generateRequestId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

ApiServices.interceptors.request.use(
  async (config) => {
    if (NEXT_PUBLIC_API_BASIC_AUTH) {
      config.headers.Authorization = basicAuthHeader(NEXT_PUBLIC_API_BASIC_AUTH)
    }

    config.headers[REQUEST_ID_HEADER] = generateRequestId()
    const locale = getLocaleFromCookie()
    config.headers["Accept-Language"] = locale
    config.headers["X-Locale"] = locale
    return config
  },
  (error) => Promise.reject(error),
)

const refreshSession = async (): Promise<void> => {
  await axios.post(
    `${NEXT_PUBLIC_API_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  )
}

ApiServices.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true
      try {
        await refreshSession()
        return ApiServices(originalRequest)
      } catch {
        auth.logout()
        return Promise.reject(error)
      }
    }
    if (error.response?.status === 403) {
      toast.error("You are not authorized to access this resource.")
    }
    return Promise.reject(error)
  },
)

export { ApiServices }
