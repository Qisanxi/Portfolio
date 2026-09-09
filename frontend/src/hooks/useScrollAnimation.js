import { useEffect, useRef } from 'react'

/**
 * Attaches a scroll-reveal observer to the returned ref.
 * When the element enters the viewport, it gains the "visible" class,
 * which triggers the CSS transitions defined in index.css.
 *
 * @param {number} threshold - 0–1, how much of the element must be visible
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect() // fire once — stays visible after reveal
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
