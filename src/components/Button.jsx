import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({ children, to, onClick, variant = 'primary', className = '', type = 'button', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-colors'
  const variants = {
    primary: 'bg-ledger-red text-paper hover:bg-ledger-redDark',
    ghost: 'bg-transparent border border-ink-700/15 dark:border-paper/20 text-ink-700 dark:text-paper hover:bg-ink-700/5 dark:hover:bg-paper/10',
    dark: 'bg-ink-700 text-paper hover:bg-ink-800',
  }

  const Comp = to ? Link : motion.button

  return (
    <Comp
      to={to}
      onClick={onClick}
      type={to ? undefined : type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
