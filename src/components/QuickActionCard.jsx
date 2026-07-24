import { motion } from 'framer-motion'
import { FiPlusCircle, FiUserPlus, FiBell, FiDownload } from 'react-icons/fi'

const iconMap = { add: FiPlusCircle, user: FiUserPlus, bell: FiBell, download: FiDownload }

export default function QuickActionCard({ label, icon, onClick, delay = 0 }) {
  const Icon = iconMap[icon] || FiPlusCircle
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="ledger-card p-4 flex flex-col items-start gap-3 text-left w-full"
    >
      <div className="w-9 h-9 rounded-lg bg-ledger-gold/15 text-[#8a6412] flex items-center justify-center">
        <Icon size={17} />
      </div>
      <span className="text-sm font-medium text-ink-700 dark:text-paper">{label}</span>
    </motion.button>
  )
}
