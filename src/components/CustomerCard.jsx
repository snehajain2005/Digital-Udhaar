import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiChevronRight, FiPhone } from 'react-icons/fi'
import { formatINR, formatDate, creditScoreInfo } from '../utils/formatters'
import { CreditScoreBadge, Badge } from './Badges'

export default function CustomerCard({ customer, index = 0 }) {
  const navigate = useNavigate()
  const scoreInfo = creditScoreInfo(customer.creditScore)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/customers/${customer.id}`)}
      className="ledger-card p-4 cursor-pointer flex items-center gap-4 group"
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-paper font-display font-semibold shrink-0 text-sm"
        style={{ backgroundColor: customer.avatarColor }}
      >
        {customer.name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink-700 dark:text-paper truncate">{customer.name}</p>
        <div className="flex items-center gap-1.5 text-xs text-ink-400 mt-0.5">
          <FiPhone size={11} />
          <span className="truncate">{customer.phone}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <CreditScoreBadge info={scoreInfo} />
          <Badge label={customer.status === 'paid' ? 'Paid up' : 'Pending'} tone={customer.status === 'paid' ? 'green' : 'red'} />
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className={`font-mono font-semibold tabular-nums ${customer.balance > 0 ? 'text-ledger-red' : 'text-ledger-green'}`}>
          {formatINR(customer.balance)}
        </p>
        <p className="text-[11px] text-ink-300 mt-1">{formatDate(customer.lastActivity)}</p>
      </div>

      <FiChevronRight className="text-ink-300 group-hover:text-ledger-red group-hover:translate-x-0.5 transition-all shrink-0" size={18} />
    </motion.div>
  )
}
