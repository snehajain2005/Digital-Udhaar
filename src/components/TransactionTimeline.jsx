import { motion } from 'framer-motion'
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi'
import { formatINR, formatDate, dueBadgeInfo } from '../utils/formatters'
import { DueBadge } from './Badges'

export default function TransactionTimeline({ transactions }) {
  if (!transactions.length) return null

  return (
    <div className="relative pl-8">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-ink-700/10 dark:bg-paper/15" />
      <div className="space-y-5">
        {transactions.map((tx, i) => {
          const isCredit = tx.type === 'credit'
          const badgeInfo = dueBadgeInfo(tx.dueDate, tx.status)
          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4) }}
              className="relative"
            >
              <span
                className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-paper dark:ring-ink-800 ${
                  isCredit ? 'bg-ledger-red/12 text-ledger-red' : 'bg-ledger-green/12 text-ledger-green'
                }`}
              >
                {isCredit ? <FiArrowUpRight size={13} /> : <FiArrowDownLeft size={13} />}
              </span>

              <div className="ledger-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-ink-700 dark:text-paper">
                      {isCredit ? 'Credit given' : 'Payment received'}
                    </p>
                    <p className="text-xs text-ink-400 mt-0.5">{tx.items || tx.notes || '—'}</p>
                    <p className="text-[11px] text-ink-300 mt-1.5">{formatDate(tx.date)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-mono font-semibold tabular-nums ${isCredit ? 'text-ledger-red' : 'text-ledger-green'}`}>
                      {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                    </p>
                    {tx.dueDate && <div className="mt-1.5"><DueBadge info={badgeInfo} /></div>}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
