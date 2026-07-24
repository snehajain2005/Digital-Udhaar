import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMic, FiCheck, FiEdit3, FiArrowLeft, FiCalendar } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import { useData } from '../context/DataContext'
import { useToast } from '../context/ToastContext'
import { formatINR } from '../utils/formatters'

const sampleVoiceEntries = [
  { items: 'Rice 5kg, Sugar 2kg, Tea packet', amount: 850, notes: 'Regular monthly order' },
  { items: 'Cooking oil 1L, Atta 10kg', amount: 1240, notes: '' },
  { items: 'Soap, Shampoo, Toothpaste', amount: 460, notes: 'Household items' },
  { items: 'Biscuits, Cold drinks x6', amount: 320, notes: 'For evening customers' },
]

export default function AddTransaction() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { customerList, addTransaction } = useData()
  const { showToast } = useToast()

  const [type, setType] = useState('credit')
  const [customerId, setCustomerId] = useState(searchParams.get('customer') || '')
  const [amount, setAmount] = useState('')
  const [items, setItems] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [listening, setListening] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [saving, setSaving] = useState(false)

  function handleVoiceInput() {
    setListening(true)
    setTimeout(() => {
      const sample = sampleVoiceEntries[Math.floor(Math.random() * sampleVoiceEntries.length)]
      setItems(sample.items)
      setAmount(String(sample.amount))
      setNotes(sample.notes)
      if (!customerId && customerList.length) setCustomerId(customerList[0].id)
      setListening(false)
      showToast('Voice entry captured. Review before saving.', 'success')
    }, 1800)
  }

  function handleReview(e) {
    e.preventDefault()
    if (!customerId || !amount) {
      showToast('Please select a customer and enter an amount.', 'error')
      return
    }
    setShowPreview(true)
  }

  function handleConfirmSave() {
    setSaving(true)
    setTimeout(() => {
      addTransaction({
        customerId,
        type,
        amount: Number(amount),
        items,
        notes,
        dueDate: type === 'credit' ? dueDate || null : null,
        date: '2026-07-24',
        status: type === 'credit' ? 'pending' : 'completed',
      })
      setSaving(false)
      showToast('Transaction saved to the khata.', 'success')
      navigate(`/customers/${customerId}`)
    }, 700)
  }

  const selectedCustomer = customerList.find((c) => c.id === customerId)

  return (
    <PageTransition>
      <Topbar title="Add Transaction" subtitle="Record a new credit or payment entry" />

      <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700 dark:hover:text-paper mb-5">
          <FiArrowLeft size={15} /> Back
        </button>

        <AnimatePresence mode="wait">
          {!showPreview ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Voice input */}
              <div className="ledger-card p-6 mb-5 text-center">
                <motion.button
                  type="button"
                  onClick={handleVoiceInput}
                  disabled={listening}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-16 h-16 rounded-full bg-ledger-red text-paper flex items-center justify-center mx-auto"
                >
                  {listening && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-ledger-red"
                      animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  <FiMic size={24} />
                </motion.button>
                <p className="text-sm font-medium text-ink-700 dark:text-paper mt-3">
                  {listening ? 'Listening... speak the entry' : 'Tap to fill this form by voice'}
                </p>
                <p className="text-xs text-ink-400 mt-1">Simulated voice recognition — fills sample values for demo purposes</p>
              </div>

              <form onSubmit={handleReview} className="ledger-card p-6 space-y-4">
                <div className="flex bg-ink-700/5 dark:bg-paper/10 rounded-full p-1 w-fit">
                  {['credit', 'payment'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                        type === t ? (t === 'credit' ? 'bg-ledger-red text-paper' : 'bg-ledger-green text-paper') : 'text-ink-500 dark:text-paper/70'
                      }`}
                    >
                      {t === 'credit' ? 'Udhaar (Credit)' : 'Payment Received'}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Customer</label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                    className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-3 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40"
                  >
                    <option value="">Select customer</option>
                    {customerList.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="1"
                    placeholder="0"
                    className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-3 text-sm font-mono text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Items</label>
                  <input
                    type="text"
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    placeholder="e.g. Rice, Dal, Cooking Oil"
                    className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-3 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40"
                  />
                </div>

                {type === 'credit' && (
                  <div>
                    <label className="text-xs font-medium text-ink-500 mb-1.5 block">Due Date</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={15} />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl pl-10 pr-3.5 py-3 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-ink-500 mb-1.5 block">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Any extra detail..."
                    className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-3 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-ink-700 dark:bg-ledger-gold text-paper dark:text-ink-800 font-medium text-sm rounded-xl py-3.5"
                >
                  <FiEdit3 size={16} /> Review Entry
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ledger-card p-6">
              <p className="font-display font-semibold text-lg text-ink-700 dark:text-paper mb-1">Review before saving</p>
              <p className="text-xs text-ink-400 mb-5">This entry hasn't been saved yet — double-check the details.</p>

              <div className="space-y-3 bg-paper dark:bg-ink-700 rounded-xl p-4">
                <Row label="Type" value={type === 'credit' ? 'Udhaar (Credit)' : 'Payment Received'} />
                <Row label="Customer" value={selectedCustomer?.name || '—'} />
                <Row label="Amount" value={formatINR(Number(amount) || 0)} highlight />
                <Row label="Items" value={items || '—'} />
                {type === 'credit' && <Row label="Due Date" value={dueDate || 'Not set'} />}
                <Row label="Notes" value={notes || '—'} />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 flex items-center justify-center gap-2 border border-ink-700/15 dark:border-paper/20 text-ink-700 dark:text-paper font-medium text-sm rounded-xl py-3"
                >
                  <FiEdit3 size={15} /> Edit
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-ledger-red text-paper font-medium text-sm rounded-xl py-3 disabled:opacity-70"
                >
                  <FiCheck size={16} /> {saving ? 'Saving...' : 'Confirm & Save'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-xs text-ink-400">{label}</span>
      <span className={`text-sm text-right ${highlight ? 'font-mono font-semibold text-ledger-red' : 'text-ink-700 dark:text-paper'}`}>{value}</span>
    </div>
  )
}
