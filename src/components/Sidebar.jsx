import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiUsers, FiPlusCircle, FiBarChart2, FiSettings, FiLogOut, FiBook,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/customers', label: 'Customers', icon: FiUsers },
  { to: '/add-transaction', label: 'Add Entry', icon: FiPlusCircle },
  { to: '/analytics', label: 'Analytics', icon: FiBarChart2 },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 border-r border-ink-700/8 dark:border-paper/10 bg-white dark:bg-ink-700 h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-ledger-red flex items-center justify-center shrink-0">
          <FiBook className="text-paper" size={18} />
        </div>
        <div>
          <p className="font-display font-semibold text-lg leading-none text-ink-700 dark:text-paper">SmartKhata</p>
          <p className="text-[11px] text-ink-400 mt-1">Digital ledger</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'text-ledger-red bg-ledger-red/8 dark:bg-ledger-red/15'
                  : 'text-ink-500 dark:text-paper/70 hover:bg-ink-700/5 dark:hover:bg-paper/5 hover:text-ink-700 dark:hover:text-paper'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-ledger-red"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={18} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-ink-700/8 dark:border-paper/10 mx-3">
        <div className="flex items-center gap-3 px-2 py-2 mt-2">
          <div className="w-9 h-9 rounded-full bg-ink-700 dark:bg-paper/20 text-paper dark:text-paper flex items-center justify-center text-sm font-semibold font-display">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink-700 dark:text-paper truncate">{user?.name}</p>
            <p className="text-xs text-ink-400 truncate">{user?.email}</p>
          </div>
          <button onClick={logout} aria-label="Log out" className="text-ink-300 hover:text-ledger-red transition-colors">
            <FiLogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  )
}
