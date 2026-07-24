import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiTrendingUp, FiCheckCircle, FiClock, FiUsers, FiArrowUpRight, FiArrowDownLeft, FiDownload } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import StatCard from '../components/StatCard'
import QuickActionCard from '../components/QuickActionCard'
import { DueBadge, CreditScoreBadge } from '../components/Badges'
import { StatCardSkeleton, ChartSkeleton, ListRowSkeleton } from '../components/Skeletons'
import { RecoveryAreaChart, WeeklyBarChart, CreditPaymentPie } from '../components/Charts'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { dashboardStats, monthlyRecovery, weeklyTransactions, creditVsPayment } from '../data/mockData'
import { formatINR, formatDate, dueBadgeInfo, creditScoreInfo } from '../utils/formatters'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const { customerList, transactionList } = useData()
  const { showToast } = useToast()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const recentActivity = [...transactionList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  const upcomingDue = transactionList
    .filter((t) => t.dueDate && t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4)

  const topPending = [...customerList]
    .filter((c) => c.balance > 0)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 4)

  function customerName(id) {
    return customerList.find((c) => c.id === id)?.name || 'Unknown'
  }

  return (
    <PageTransition>
      <Topbar title={`Namaste, ${user?.owner?.split(' ')[0] || 'there'} 👋`} subtitle={`${user?.name} · Today, ${formatDate('2026-07-24')}`} />

      <div className="px-4 md:px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard label="Total Udhaar" value={dashboardStats.totalUdhaar} icon={FiTrendingUp} tone="red" trend={{ positive: false, label: '8% vs last month' }} delay={0} />
              <StatCard label="Total Recovered" value={dashboardStats.totalRecovered} icon={FiCheckCircle} tone="green" trend={{ positive: true, label: '14% vs last month' }} delay={0.05} />
              <StatCard label="Pending Amount" value={dashboardStats.pendingAmount} icon={FiClock} tone="gold" delay={0.1} />
              <StatCard label="Active Customers" value={dashboardStats.activeCustomers} isCurrency={false} icon={FiUsers} tone="ink" delay={0.15} />
            </>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard label="Add Transaction" icon="add" delay={0.05} onClick={() => navigate('/add-transaction')} />
          <QuickActionCard label="New Customer" icon="user" delay={0.1} onClick={() => showToast('Opening new customer form...', 'info')} />
          <QuickActionCard label="Send Reminders" icon="bell" delay={0.15} onClick={() => showToast('Reminders queued for 3 overdue customers.', 'success')} />
          <QuickActionCard label="Export Report" icon="download" delay={0.2} onClick={() => showToast('Report exported as PDF.', 'success')} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 ledger-card p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-display font-semibold text-ink-700 dark:text-paper">Monthly Recovery</p>
              <span className="text-xs text-ink-400">Last 6 months</span>
            </div>
            {loading ? <ChartSkeleton /> : <RecoveryAreaChart data={monthlyRecovery} />}
          </div>
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Credit vs Payment</p>
            {loading ? <ChartSkeleton height={240} /> : <CreditPaymentPie data={creditVsPayment} />}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-2">Weekly Transactions</p>
            {loading ? <ChartSkeleton height={220} /> : <WeeklyBarChart data={weeklyTransactions} height={220} />}
          </div>

          {/* Recent activity */}
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-3">Recent Activity</p>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <ListRowSkeleton key={i} />)
            ) : (
              <div className="space-y-1">
                {recentActivity.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 py-2.5 border-b border-ink-700/5 dark:border-paper/5 last:border-0"
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'credit' ? 'bg-ledger-red/10 text-ledger-red' : 'bg-ledger-green/10 text-ledger-green'}`}>
                      {tx.type === 'credit' ? <FiArrowUpRight size={14} /> : <FiArrowDownLeft size={14} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink-700 dark:text-paper truncate">{customerName(tx.customerId)}</p>
                      <p className="text-[11px] text-ink-400">{formatDate(tx.date)}</p>
                    </div>
                    <p className={`text-xs font-mono font-semibold tabular-nums shrink-0 ${tx.type === 'credit' ? 'text-ledger-red' : 'text-ledger-green'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatINR(tx.amount)}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming due dates */}
          <div className="ledger-card p-5">
            <p className="font-display font-semibold text-ink-700 dark:text-paper mb-3">Upcoming Due Dates</p>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <ListRowSkeleton key={i} />)
            ) : (
              <div className="space-y-3">
                {upcomingDue.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink-700 dark:text-paper truncate">{customerName(tx.customerId)}</p>
                      <p className="text-[11px] text-ink-400 font-mono">{formatINR(tx.amount)}</p>
                    </div>
                    <DueBadge info={dueBadgeInfo(tx.dueDate, tx.status)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top pending customers */}
        <div className="ledger-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display font-semibold text-ink-700 dark:text-paper">Top Pending Customers</p>
            <button onClick={() => navigate('/customers')} className="text-xs font-medium text-ledger-red flex items-center gap-1">
              View all
            </button>
          </div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => <ListRowSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topPending.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/customers/${c.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-ink-700/8 dark:border-paper/10 cursor-pointer hover:border-ledger-red/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-paper font-display font-semibold text-xs shrink-0" style={{ backgroundColor: c.avatarColor }}>
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-700 dark:text-paper truncate">{c.name}</p>
                    <p className="text-xs font-mono text-ledger-red">{formatINR(c.balance)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
