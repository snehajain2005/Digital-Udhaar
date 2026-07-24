const toneClasses = {
  red: 'bg-ledger-red/10 text-ledger-red border-ledger-red/20',
  green: 'bg-ledger-green/10 text-ledger-green border-ledger-green/20',
  gold: 'bg-ledger-gold/15 text-[#8a6412] dark:text-ledger-gold border-ledger-gold/25',
  slate: 'bg-ink-700/8 text-ink-500 dark:text-paper/70 border-ink-700/10',
}

export function Badge({ label, tone = 'slate', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${toneClasses[tone]} ${className}`}
    >
      {label}
    </span>
  )
}

export function DueBadge({ info }) {
  return <Badge label={info.label} tone={info.tone} />
}

export function CreditScoreBadge({ info }) {
  return <Badge label={info.label} tone={info.tone} />
}
