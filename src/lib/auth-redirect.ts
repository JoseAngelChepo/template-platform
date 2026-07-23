const DEFAULT_AUTH_REDIRECT = "/dashboard"
const SAFE_ORIGIN = "http://localhost"
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/

function isSafeRelativePath(value: string): boolean {
  if (!value.startsWith("/") || value.startsWith("//")) return false
  if (value.includes("\\") || CONTROL_CHARS.test(value)) return false

  try {
    const url = new URL(value, SAFE_ORIGIN)
    return url.origin === SAFE_ORIGIN && url.pathname.startsWith("/")
  } catch {
    return false
  }
}

export function normalizeAuthRedirect(
  input: unknown,
  fallback: string = DEFAULT_AUTH_REDIRECT,
): string {
  if (typeof input !== "string") return fallback
  const candidate = input.trim()
  if (!isSafeRelativePath(candidate)) return fallback
  return candidate
}

export function buildGoogleAuthState(redirectPath: unknown): string {
  const redirect = normalizeAuthRedirect(redirectPath)
  return btoa(JSON.stringify({ redirect }))
}

export function parseGoogleAuthState(stateParam: string | null): string | null {
  if (!stateParam) return null
  try {
    const parsed = JSON.parse(atob(stateParam)) as { redirect?: unknown }
    return normalizeAuthRedirect(parsed?.redirect)
  } catch {
    return null
  }
}
