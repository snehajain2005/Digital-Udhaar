import { motion } from 'framer-motion'
import { formatINR } from '../utils/formatters'

const rows = [
  { name: 'Ramesh Traders', amount: 4200, type: 'credit' },
  { name: 'Sunita Kirana Store', amount: 1800, type: 'payment' },
  { name: 'Vikas Auto Parts', amount: 15000, type: 'credit' },
  { name: 'Priya Beauty Corner', amount: 3200, type: 'credit' },
]

export default function LedgerMockup({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl bg-white dark:bg-ink-600 shadow-2xl shadow-ink-700/20 border border-ink-700/8 overflow-hidden ${className}`}
    >
      <div className="bg-ink-700 px-5 py-3.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-ledger-red/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-ledger-gold/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-ledger-green/70" />
        <span className="ml-3 text-paper/70 text-xs font-mono">smartkhata.app/dashboard</span>
      </div>
      <div className="p-5 bg-ledger-lines">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink-400 font-medium">Pending amount</p>
            <p className="font-display font-semibold text-2xl text-ink-700">{formatINR(41850)}</p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-ledger-red/10 text-ledger-red">10 customers</span>
        </div>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
              className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2.5 border border-ink-700/5"
            >
              <span className="text-xs font-medium text-ink-600">{r.name}</span>
              <span className={`text-xs font-mono font-semibold ${r.type === 'credit' ? 'text-ledger-red' : 'text-ledger-green'}`}>
                {r.type === 'credit' ? '+' : '-'}{formatINR(r.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
