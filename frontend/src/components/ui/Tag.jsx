/**
 * Tag — small monospace label for tech stack and skill chips.
 * Used by: Projects.jsx, Skills.jsx
 *
 * Props:
 *   color  — optional hex accent color; defaults to muted slate
 *   size   — 'sm' (default) | 'xs'
 */
export default function Tag({ children, color, size = 'sm' }) {
  const padding = size === 'xs' ? 'px-2 py-1' : 'px-3 py-1.5'

  const style = color
    ? { color, background: color + '12', border: `1px solid ${color}30` }
    : { color: '#64748b', background: 'rgba(255,255,255,0.04)' }

  return (
    <span className={`text-xs font-mono rounded-lg ${padding}`} style={style}>
      {children}
    </span>
  )
}
