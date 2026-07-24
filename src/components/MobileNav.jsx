import { NavLink } from 'react-router-dom'
import { FiGrid, FiUsers, FiPlusCircle, FiBarChart2, FiSettings } from 'react-icons/fi'

const links = [
  { to: '/dashboard', label: 'Home', icon: FiGrid },
  { to: '/customers', label: 'Customers', icon: FiUsers },
  { to: '/add-transaction', label: 'Add', icon: FiPlusCircle, primary: true },
  { to: '/analytics', label: 'Stats', icon: FiBarChart2 },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-ink-700/95 backdrop-blur border-t border-ink-700/8 dark:border-paper/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-1 py-2">
        {links.map(({ to, label, icon: Icon, primary }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 py-1 min-w-[56px] rounded-lg text-[11px] font-medium ${
                primary
                  ? '-mt-6 bg-ledger-red text-paper rounded-full w-12 h-12 justify-center shadow-lg shadow-ledger-red/30'
                  : isActive
                  ? 'text-ledger-red'
                  : 'text-ink-400 dark:text-paper/60'
              }`
            }
          >
            <Icon size={primary ? 20 : 18} />
            {!primary && label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
