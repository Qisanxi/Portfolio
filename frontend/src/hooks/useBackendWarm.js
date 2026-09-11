import { useEffect, useState } from 'react'

/**
 * useBackendWarm — silently pings /api/health on mount to wake Render's
 * free-tier backend (which sleeps after 15 min of inactivity).
 *
 * Returns one of:
 *   - 'warming'  : request in flight (or not started yet)
 *   - 'warm'      : backend responded 200, ready to chat
 *   - 'cold'      : request failed or timed out — visitor can still try,
 *                   they'll just hit the cold start when they click chat
 *
 * Behavior:
 *   - Silent — never throws, never logs to console
 *   - 8-second timeout — Render free cold start can take 30+ sec, but if
 *     we don't get a response in 8s we stop blocking the toast banner
 *     so the visitor can still try clicking chat (Render will be warmer
 *     by then even if the health check timed out)
 *   - Abort controller cancels the request if the user navigates away
 *     before it completes
 */
export function useBackendWarm(apiUrl) {
  const [status, setStatus] = useState('warming')

  useEffect(() => {
    if (!apiUrl) {
      setStatus('cold')
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      setStatus('cold')
    }, 8000)

    fetch(`${apiUrl}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      // Don't send credentials — Render's CORS will reject preflight if we do
      mode: 'cors',
    })
      .then((res) => {
        if (res.ok) setStatus('warm')
        else setStatus('cold')
      })
      .catch(() => setStatus('cold'))
      .finally(() => clearTimeout(timeoutId))

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [apiUrl])

  return status
}
