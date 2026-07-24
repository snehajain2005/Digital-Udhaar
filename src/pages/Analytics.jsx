import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import { ChartSkeleton } from '../components/Skeletons'
import { RecoveryAreaChart, DistributionPie, DelayLineChart, WeeklyBarChart } from '../components/Charts'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { monthlyRecovery, customerDistribution, avgPaymentDelay, weeklyTransactions } from '../data/mockData'
import { formatINR } from '../utils/formatters'

export default function Analytics() {
  const [loading, setLoading] = useState(true)
  const { customerList } = useData()
  const { showToast } = useToast()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const topCustomers = [...customerList].sort((a, b) => b.balance - a.balance).slice(0, 5)
  const recoveryRate = Math.round(
    (customerList.filter((c) => c.status === 'paid').length / customerList.length) * 100
  )
  const totalIncome = monthlyRecovery.reduce((s, m) => s + m.recovered, 0)

  return (
    <PageTransition>
      <Topbar title="Analytics" subtitle="Deep dive into recovery trends and customer risk" />

      <div className="px-4 md:px-8 py-6 space-y-5">
        <div className="flex justify-end">
          <button
            onClick={() => showToast('Analytics report exported as Excel.', 'success')}
            className="flex items-center gap-2 bg-white dark:bg-ink-600 border border-ink-700/12 dark:border-paper/15 rounded-full px-4 py-2 text-xs font-medium text-ink-600 dark:text-paper"
          >
            <FiDownload size={14} /> Export report
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="ledger-card p-5">
            <p className="text-xs uppercase tracking-wide text-ink-400 font-medium">Monthly Income</p>
            <p className="font-display text-2xl font-semibold mt-2 text-ink-700 dark:text-paper tabular-nums">{formatINR(totalIncome)}</p>
            <p className="text-xs text-ledger-green mt-1.5 font-medium">↑ 12% over 6 months</p>
          </div>
          <div className="ledger-card p-5">
            <p className="text-xs uppercase tracking-wide text-ink-400 font-medium">Recovery Rate</p>
            <p className="font-display text-2xl font-semibold mt-2 text-ink-700 dark:text-paper tabular-nums">{recoveryRate}%</p>
            <p className="text-xs text-ink-400 mt-1.5">of customers fully paid up</p>
          </div>
          <div className="ledger-card p-5">
            <p className="text-xs uppercase tracking-wide text-ink-400 font-medium">Avg Payment Delay</p>
            <p className="font-display text-2xl font-semibold mt-2 text-ink-700 dark:text-paper tabular-nums">4.2 days</p>
            <p className="text-xs text-ledger-green mt-1.5 font-medium">↓ improved from 6.2 days</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Pending Dues Trend</p>
            {loading ? <ChartSkeleton /> : <RecoveryAreaChart data={monthlyRecovery} />}
          </div>
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Customer Risk Distribution</p>
            {loading ? <ChartSkeleton height={240} /> : <DistributionPie data={customerDistribution} />}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Average Payment Delay</p>
            {loading ? <ChartSkeleton height={240} /> : <DelayLineChart data={avgPaymentDelay} />}
          </div>
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Weekly Transaction Volume</p>
            {loading ? <ChartSkeleton height={240} /> : <WeeklyBarChart data={weeklyTransactions} height={240} />}
          </div>
        </div>

        <div className="ledger-card p-5">
          <p className="font-display font-semibold text-ink-700 dark:text-paper mb-4">Top Customers by Outstanding Balance</p>
          <div className="space-y-1">
            {topCustomers.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 py-2.5 border-b border-ink-700/5 dark:border-paper/5 last:border-0">
                <span className="w-6 text-xs font-mono text-ink-300 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-paper font-display font-semibold text-xs shrink-0" style={{ backgroundColor: c.avatarColor }}>
                  {c.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-ink-700 dark:text-paper flex-1 truncate">{c.name}</p>
                <div className="w-32 h-1.5 rounded-full bg-ink-700/8 dark:bg-paper/10 hidden sm:block overflow-hidden">
                  <div
                    className="h-full bg-ledger-red rounded-full"
                    style={{ width: `${Math.min(100, (c.balance / topCustomers[0].balance) * 100)}%` }}
                  />
                </div>
                <p className="text-sm font-mono font-semibold text-ledger-red shrink-0">{formatINR(c.balance)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
