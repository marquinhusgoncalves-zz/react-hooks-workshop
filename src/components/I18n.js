// I18n.js
import React, { createContext, useState, useContext, useMemo } from 'react'

// I18n context, it's private
const I18nContext = createContext()

// A provider
export function I18nProvider({ translations, defaultLocale, children }) {
  // The object will have the following keys: `translations`, `locale` and `setLocale`.
  const [locale, setLocale] = useState(defaultLocale)

  return (
    <I18nContext.Provider value={{ translations, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

// A collector
export function useT(id) {
  // Récupérations des "translations" et de la "locale" depuis le contexte
  const { translations, locale } = useContext(I18nContext)
  // Tant que rien n'a changé, on utilisera la même traduction
  // si par la suite notre fonction fait des calculs, ce sera optimisé
  return useMemo(() => translations[locale][id], [locale, translations, id])
}

// A simple component to render a translation key
export function T({ id }) {
  return useT(id)
}

// Hook permettant de récupérer le contexte i18n
export function useI18n() {
  return useContext(I18nContext)
}
