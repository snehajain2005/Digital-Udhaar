import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="w-16 h-16 rounded-full bg-ink-700/5 dark:bg-paper/8 flex items-center justify-center mb-4">
        {Icon && <Icon size={26} className="text-ink-300" />}
      </div>
      <p className="font-display font-semibold text-lg text-ink-700 dark:text-paper">{title}</p>
      <p className="text-sm text-ink-400 mt-1.5 max-w-xs">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}
