/**
 * Badge — coloured pill label used on project cards.
 * Used by: Projects.jsx
 */
export default function Badge({ children, color }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full w-fit"
      style={{
        color,
        background: color + '18',
        border: `1px solid ${color}35`,
      }}
    >
      {children}
    </span>
  )
}
