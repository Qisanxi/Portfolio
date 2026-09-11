// Vitest global setup — runs before every test file.
// Adds jest-dom matchers (toBeInTheDocument, toHaveClass, etc.) so React
// component tests can use semantic assertions instead of comparing strings.
import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement matchMedia — some components (like ChatWidget's
// pulsing ring animation) reference it via prefers-reduced-motion. Polyfill.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// jsdom doesn't implement IntersectionObserver — useScrollAnimation uses it
// to add the 'visible' class when an element enters the viewport. Stub it
// so tests don't crash; elements just won't get the 'visible' class.
class MockIntersectionObserver {
  constructor(callback) { this.callback = callback }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
window.IntersectionObserver = MockIntersectionObserver
// eslint-disable-next-line no-undef
global.IntersectionObserver = MockIntersectionObserver

// scrollTo isn't implemented in jsdom either — make it a no-op so
// scrollIntoView calls don't throw.
Element.prototype.scrollIntoView = () => {}
