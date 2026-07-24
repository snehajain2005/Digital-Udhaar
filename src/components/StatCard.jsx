import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { formatINR } from '../utils/formatters'

export default function StatCard({ label, value, isCurrency = true, icon: Icon, tone = 'ink', trend, delay = 0 }) {
  const animated = useCountUp(value, 1100)

  const toneStyles = {
    ink: 'bg-ink-700 text-paper',
    red: 'bg-ledger-red text-paper',
    green: 'bg-ledger-green text-paper',
    gold: 'bg-ledger-gold text-ink-700',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
      className="ledger-card p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide font-medium text-ink-400">{label}</p>
          <p className="font-display text-2xl md:text-3xl font-semibold mt-2 text-ink-700 dark:text-paper tabular-nums">
            {isCurrency ? formatINR(animated) : animated}
          </p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.positive ? 'text-ledger-green' : 'text-ledger-red'}`}>
              {trend.positive ? '↑' : '↓'} {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${toneStyles[tone]}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
