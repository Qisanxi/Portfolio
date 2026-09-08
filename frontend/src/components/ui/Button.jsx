/**
 * Button — reusable CTA component.
 * Used by: Hero.jsx, Contact.jsx
 *
 * Variants:
 *   primary  — filled indigo (default)
 *   outline  — bordered indigo, monospace label
 *   ghost    — no border, muted text
 */
export default function Button({
  children,
  onClick,
  variant = 'primary',
  href,
  download,
  disabled,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/20',
    outline: 'text-indigo-400 border border-indigo-400/40 hover:border-indigo-400 hover:bg-indigo-400/10 font-mono text-sm',
    ghost:   'text-slate-400 hover:text-white',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} download={download} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}
