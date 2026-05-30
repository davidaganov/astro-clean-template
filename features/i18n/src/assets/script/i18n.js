/**
 * Simple i18n helper for client-side language switching.
 * Follows the logic of @mannisto/astro-i18n without requiring the runtime in the browser.
 * This keeps the client-side JS "predictable" and "handoff-friendly".
 */

const LOCALES = ["en", "ru"]

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`
}

const getNewUrl = (targetLocale, currentPath) => {
  const segments = currentPath.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (LOCALES.includes(firstSegment)) {
    // Replace existing locale
    segments[0] = targetLocale
  } else {
    // Prepend locale
    segments.unshift(targetLocale)
  }

  // Ensure trailing slash for consistency with Astro static build
  return `/${segments.join("/")}/`.replace(/\/+/g, "/")
}

export const initI18n = () => {
  const buttons = document.querySelectorAll("[data-locale]")

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const locale = button.getAttribute("data-locale")
      if (locale) {
        setCookie("locale", locale)
        const newUrl = getNewUrl(locale, window.location.pathname)
        window.location.assign(newUrl)
      }
    })
  })
}
