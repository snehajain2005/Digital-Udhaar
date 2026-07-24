export function StatCardSkeleton() {
  return (
    <div className="ledger-card p-5">
      <div className="skeleton h-3 w-20 mb-3" />
      <div className="skeleton h-7 w-28 mb-2" />
      <div className="skeleton h-2.5 w-16" />
    </div>
  )
}

export function CustomerCardSkeleton() {
  return (
    <div className="ledger-card p-4 flex items-center gap-3">
      <div className="skeleton w-11 h-11 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3.5 w-32" />
        <div className="skeleton h-2.5 w-20" />
      </div>
      <div className="skeleton h-3.5 w-16" />
    </div>
  )
}

export function ChartSkeleton({ height = 260 }) {
  return <div className="skeleton w-full" style={{ height }} />
}

export function ListRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="skeleton w-9 h-9 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-3/4" />
        <div className="skeleton h-2.5 w-1/2" />
      </div>
    </div>
  )
}
