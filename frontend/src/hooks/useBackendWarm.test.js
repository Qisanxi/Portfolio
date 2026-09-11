/**
 * Tests for useBackendWarm hook — the silent pre-warm that pings
 * /api/health on mount to wake Render's sleeping backend.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBackendWarm } from './useBackendWarm'

describe('useBackendWarm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns "warming" initially', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))  // never resolves
    const { result } = renderHook(() => useBackendWarm('https://api.example.com'))
    expect(result.current).toBe('warming')
  })

  it('returns "warm" when fetch succeeds with 200', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    const { result } = renderHook(() => useBackendWarm('https://api.example.com'))
    // Let microtasks flush
    await act(async () => { await vi.runAllTimersAsync() })
    expect(result.current).toBe('warm')
  })

  it('returns "cold" when fetch returns non-200', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    const { result } = renderHook(() => useBackendWarm('https://api.example.com'))
    await act(async () => { await vi.runAllTimersAsync() })
    expect(result.current).toBe('cold')
  })

  it('returns "cold" when fetch rejects (network error)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const { result } = renderHook(() => useBackendWarm('https://api.example.com'))
    await act(async () => { await vi.runAllTimersAsync() })
    expect(result.current).toBe('cold')
  })

  it('returns "cold" when apiUrl is undefined', () => {
    vi.stubGlobal('fetch', vi.fn())
    const { result } = renderHook(() => useBackendWarm(undefined))
    expect(result.current).toBe('cold')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('hits /api/health on the provided apiUrl', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchSpy)
    renderHook(() => useBackendWarm('https://api.example.com'))
    await act(async () => { await vi.runAllTimersAsync() })
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.example.com/api/health',
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('times out after 8 seconds if backend is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))  // never resolves
    const { result } = renderHook(() => useBackendWarm('https://api.example.com'))
    // Fast-forward 8 seconds
    await act(async () => { await vi.advanceTimersByTimeAsync(8100) })
    expect(result.current).toBe('cold')
  })
})
