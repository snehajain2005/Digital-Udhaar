export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// "Today" is anchored to the latest mock data date so due-date badges make sense.
export const TODAY = new Date('2026-07-24')

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr)
  const diff = Math.round((target - TODAY) / (1000 * 60 * 60 * 24))
  return diff
}

export function dueBadgeInfo(dateStr, status) {
  if (status === 'completed') return { label: 'Paid', tone: 'green' }
  const diff = daysUntil(dateStr)
  if (diff === null) return { label: '—', tone: 'slate' }
  if (diff < 0) return { label: `Overdue by ${Math.abs(diff)}d`, tone: 'red' }
  if (diff === 0) return { label: 'Due today', tone: 'gold' }
  return { label: `Due in ${diff}d`, tone: 'gold' }
}

export function creditScoreInfo(score) {
  const map = {
    low: { label: 'Low Risk', tone: 'green' },
    medium: { label: 'Medium Risk', tone: 'gold' },
    high: { label: 'High Risk', tone: 'red' },
  }
  return map[score] || map.low
}
