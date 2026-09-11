/**
 * Tests for WarmBanner component — the non-blocking toast that appears
 * above the navbar once the backend is warm.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import WarmBanner from './WarmBanner'

describe('WarmBanner', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sessionStorage.clear()
  })
  afterEach(() => {
    vi.useRealTimers()
    cleanup()
  })

  it('renders nothing when warmStatus is "warming"', () => {
    render(<WarmBanner warmStatus="warming" />)
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
  })

  it('renders nothing when warmStatus is "cold"', () => {
    render(<WarmBanner warmStatus="cold" />)
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
  })

  it('appears 600ms after warmStatus becomes "warm"', () => {
    render(<WarmBanner warmStatus="warm" />)
    // Should not be visible immediately
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
    // Should appear after 600ms
    act(() => { vi.advanceTimersByTime(700) })
    expect(screen.getByText(/Assistant is ready/i)).toBeInTheDocument()
  })

  it('auto-dismisses after 12 seconds', () => {
    render(<WarmBanner warmStatus="warm" />)
    act(() => { vi.advanceTimersByTime(700) })  // appear
    expect(screen.getByText(/Assistant is ready/i)).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(13000) })  // 12s display + buffer
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
  })

  it('dismiss button hides the banner and sets sessionStorage', () => {
    render(<WarmBanner warmStatus="warm" />)
    act(() => { vi.advanceTimersByTime(700) })
    const dismissBtn = screen.getByLabelText('Dismiss')
    fireEvent.click(dismissBtn)
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
    expect(sessionStorage.getItem('portfolio:warmBannerDismissed')).toBe('1')
  })

  it('does not reappear in the same session once dismissed', () => {
    sessionStorage.setItem('portfolio:warmBannerDismissed', '1')
    render(<WarmBanner warmStatus="warm" />)
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.queryByText(/Assistant is ready/i)).not.toBeInTheDocument()
  })
})
