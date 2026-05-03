import { Locale } from "@mannisto/astro-i18n/runtime"

export function useI18n(url: URL) {
  const tBase = Locale.t(url)

  return function t(key: string, params?: Record<string, string | number>): string {
    const parts = key.split(".")
    
    // The top-level key must exist in the JSON
    let result: any = tBase(parts[0])

    // Traverse the nested object
    for (let i = 1; i < parts.length; i++) {
      if (result === undefined || result === null) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      result = result[parts[i]]
    }

    if (typeof result !== "string") {
      console.warn(`Translation key does not resolve to a string: ${key}`)
      return key
    }

    // Interpolate parameters if provided
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(new RegExp(`{${k}}`, "g"), String(v))
      }
    }

    return result
  }
}
