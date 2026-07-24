import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPhone, FiMessageCircle, FiPlus, FiCalendar } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import ProgressRing from '../components/ProgressRing'
import TransactionTimeline from '../components/TransactionTimeline'
import EmptyState from '../components/EmptyState'
import { CreditScoreBadge, Badge } from '../components/Badges'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { formatINR, formatDate, creditScoreInfo } from '../utils/formatters'

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { customerList, transactionList } = useData()
  const { showToast } = useToast()

  const customer = customerList.find((c) => c.id === id)
  const customerTx = transactionList
    .filter((t) => t.customerId === id)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  if (!customer) {
    return (
      <PageTransition>
        <Topbar title="Customer not found" />
        <EmptyState title="We couldn't find this customer" message="They may have been removed from your khata." />
      </PageTransition>
    )
  }

  const scoreInfo = creditScoreInfo(customer.creditScore)
  const totalCredit = customerTx.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
  const totalPaid = customerTx.filter((t) => t.type === 'payment').reduce((s, t) => s + t.amount, 0)

  return (
    <PageTransition>
      <Topbar title="Customer Profile" />

      <div className="px-4 md:px-8 py-6">
        <button onClick={() => navigate('/customers')} className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700 dark:hover:text-paper mb-5">
          <FiArrowLeft size={15} /> Back to customers
        </button>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="ledger-card p-6 lg:col-span-1 h-fit">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-paper font-display font-semibold text-2xl mb-4"
                style={{ backgroundColor: customer.avatarColor }}
              >
                {customer.name.charAt(0)}
              </div>
              <p className="font-display text-xl font-semibold text-ink-700 dark:text-paper">{customer.name}</p>
              <div className="flex items-center gap-1.5 text-sm text-ink-400 mt-1.5">
                <FiPhone size={13} /> {customer.phone}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <CreditScoreBadge info={scoreInfo} />
                <Badge label={customer.status === 'paid' ? 'Paid up' : 'Pending'} tone={customer.status === 'paid' ? 'green' : 'red'} />
              </div>

              <div className="flex gap-3 mt-5 w-full">
                <button
                  onClick={() => showToast(`Reminder message drafted for ${customer.name}.`, 'success')}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-ledger-green/10 text-ledger-green rounded-full py-2.5 text-xs font-medium"
                >
                  <FiMessageCircle size={14} /> Remind
                </button>
                <button
                  onClick={() => navigate(`/add-transaction?customer=${customer.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-ledger-red text-paper rounded-full py-2.5 text-xs font-medium"
                >
                  <FiPlus size={14} /> Add Entry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-ink-700/8 dark:border-paper/10">
              <div>
                <p className="text-[11px] text-ink-400 uppercase tracking-wide">Outstanding</p>
                <p className="font-mono font-semibold text-ledger-red mt-1">{formatINR(customer.balance)}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-400 uppercase tracking-wide">Customer since</p>
                <p className="text-sm text-ink-600 dark:text-paper/80 mt-1">{formatDate(customer.since)}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-400 uppercase tracking-wide">Total credit given</p>
                <p className="font-mono text-sm text-ink-600 dark:text-paper/80 mt-1">{formatINR(totalCredit)}</p>
              </div>
              <div>
                <p className="text-[11px] text-ink-400 uppercase tracking-wide">Total paid</p>
                <p className="font-mono text-sm text-ink-600 dark:text-paper/80 mt-1">{formatINR(totalPaid)}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-ink-700/8 dark:border-paper/10">
              <ProgressRing percentage={customer.repaymentRate} label="repaid" />
              <div className="text-left">
                <p className="text-sm font-medium text-ink-700 dark:text-paper">Repayment rate</p>
                <p className="text-xs text-ink-400 mt-1 max-w-[140px]">Share of credit this customer has paid back on time.</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FiCalendar className="text-ink-400" size={16} />
              <p className="font-display font-semibold text-ink-700 dark:text-paper">Transaction Timeline</p>
            </div>
            {customerTx.length === 0 ? (
              <EmptyState title="No transactions yet" message="Entries you add for this customer will show up here." />
            ) : (
              <TransactionTimeline transactions={customerTx} />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
