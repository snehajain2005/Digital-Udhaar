import { useEffect, useMemo, useState } from 'react'
import { FiSearch, FiUsers } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import CustomerCard from '../components/CustomerCard'
import EmptyState from '../components/EmptyState'
import { CustomerCardSkeleton } from '../components/Skeletons'
import { useData } from '../context/DataContext'


const filters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'paid', label: 'Paid' },
]

const sorts = [
  { key: 'recent', label: 'Recent Activity' },
  { key: 'name', label: 'Name' },
  { key: 'balance', label: 'Balance' },
]

export default function Customers() {
  const { customerList } = useData()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recent')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let list = customerList.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    if (filter !== 'all') list = list.filter((c) => c.status === filter)

    list = [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'balance') return b.balance - a.balance
      return new Date(b.lastActivity) - new Date(a.lastActivity)
    })
    return list
  }, [customerList, query, filter, sort])

  return (
    <PageTransition>
      <Topbar title="Customers" subtitle={`${customerList.length} customers in your khata`} />

      <div className="px-4 md:px-8 py-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 bg-white dark:bg-ink-600 border border-ink-700/10 dark:border-paper/10 rounded-full px-4 py-2.5 w-full sm:w-72 focus-within:ring-2 focus-within:ring-ledger-gold/40">
            <FiSearch className="text-ink-400 shrink-0" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by customer name..."
              className="bg-transparent outline-none text-sm w-full text-ink-700 dark:text-paper placeholder:text-ink-300"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-white dark:bg-ink-600 border border-ink-700/10 dark:border-paper/10 rounded-full p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filter === f.key ? 'bg-ledger-red text-paper' : 'text-ink-500 dark:text-paper/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white dark:bg-ink-600 border border-ink-700/10 dark:border-paper/10 rounded-full px-3.5 py-2 text-xs font-medium text-ink-600 dark:text-paper outline-none"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>Sort: {s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => <CustomerCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={FiUsers}
            title="No customers found"
            message={query ? `No results for "${query}". Try a different search.` : 'No customers match this filter yet.'}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((c, i) => <CustomerCard key={c.id} customer={c} index={i} />)}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
