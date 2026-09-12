import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'

/**
 * WarmBanner — non-blocking toast that appears below the navbar once the
 * backend has finished warming up (i.e. the /api/health ping succeeded).
 *
 * UX rules:
 *   - Positioned at top: 68px so it sits BELOW the fixed navbar (which is
 *     ~56px tall) — doesn't cover the nav links
 *   - Auto-dismisses after 4 seconds (was 12s — too long, made the page
 *     feel cluttered)
 *   - Doesn't block scroll, doesn't capture clicks outside the banner
 *   - Dismiss button (X) on the right for manual close
 *   - sessionStorage remembers dismissal so it doesn't reappear same session
 */
const STORAGE_KEY = 'portfolio:warmBannerDismissed'

export default function WarmBanner({ warmStatus }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (warmStatus !== 'warm') return

    // Don't show if visitor already dismissed it this session
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return

    // Small delay so it doesn't feel jarring on page load
    const showTimeout = setTimeout(() => setVisible(true), 600)
    // Auto-dismiss after 4 seconds (4600ms = 600ms show delay + 4000ms display)
    const hideTimeout = setTimeout(() => setVisible(false), 4600)

    return () => {
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
    }
  }, [warmStatus])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '68px',                // below the navbar (navbar is ~56px tall + 12px gap)
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 14px 9px 16px',
        borderRadius: '999px',
        background: 'rgba(28, 23, 16, 0.95)',
        border: '1px solid rgba(196, 145, 63, 0.35)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(196, 145, 63, 0.08)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        maxWidth: 'calc(100vw - 24px)',
        animation: 'warmBannerSlideIn 280ms ease-out',
      }}
    >
      <Sparkles size={14} style={{ color: '#C4913F', flexShrink: 0 }} />
      <span style={{
        color: '#EDE4CF',
        fontSize: '12px',
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.4,
      }}>
        Assistant is ready — use the chat to learn more about Sandeep in detail.
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#5C5446',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          marginLeft: '4px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#EDE4CF' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#5C5446' }}
      >
        <X size={12} />
      </button>

      <style>{`
        @keyframes warmBannerSlideIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
