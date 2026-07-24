import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiBell, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi'
import { notifications as initialNotifications } from '../data/mockData'

const icons = {
  success: <FiCheckCircle className="text-ledger-green shrink-0" size={16} />,
  warning: <FiAlertTriangle className="text-ledger-gold shrink-0" size={16} />,
  info: <FiInfo className="text-ink-400 shrink-0" size={16} />,
}

export default function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initialNotifications)
  const ref = useRef(null)
  const unread = items.filter((n) => !n.read).length

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative w-10 h-10 rounded-full flex items-center justify-center text-ink-500 dark:text-paper/80 hover:bg-ink-700/5 dark:hover:bg-paper/10 transition-colors"
      >
        <FiBell size={19} />
        {unread > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-ledger-red ring-2 ring-white dark:ring-ink-700" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 max-w-[90vw] ledger-card z-50 py-2"
          >
            <div className="flex items-center justify-between px-4 py-2">
              <p className="font-display font-semibold text-ink-700 dark:text-paper">Notifications</p>
              {unread > 0 && (
                <button
                  onClick={() => setItems((s) => s.map((n) => ({ ...n, read: true })))}
                  className="text-xs text-ledger-red font-medium hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.map((n) => (
                <div
                  key={n.id}
                  className={`flex gap-3 px-4 py-3 border-t border-ink-700/5 dark:border-paper/5 ${!n.read ? 'bg-ink-700/[0.03] dark:bg-paper/[0.04]' : ''}`}
                >
                  {icons[n.type]}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-700 dark:text-paper">{n.title}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{n.message}</p>
                    <p className="text-[11px] text-ink-300 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
