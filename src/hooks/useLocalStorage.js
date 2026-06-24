import { useState, useEffect, useCallback } from 'react'

// Persist any JSON-serializable state to Local Storage. Progress, notes, todos,
// theme and the mission start date all survive page reloads through this hook.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) return JSON.parse(stored)
    } catch (e) {
      console.warn(`Could not read localStorage key "${key}"`, e)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn(`Could not write localStorage key "${key}"`, e)
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
