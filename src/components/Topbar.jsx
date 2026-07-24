import { FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import NotificationPanel from './NotificationPanel'

export default function Topbar({ title, subtitle }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 bg-paper/85 dark:bg-ink-800/85 backdrop-blur border-b border-ink-700/8 dark:border-paper/10">
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4">
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-xl md:text-2xl text-ink-700 dark:text-paper truncate">{title}</h1>
          {subtitle && <p className="text-sm text-ink-400 mt-0.5 hidden sm:block">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-white dark:bg-ink-600 border border-ink-700/10 dark:border-paper/10 rounded-full px-3.5 py-2 w-64 text-ink-400 focus-within:ring-2 focus-within:ring-ledger-gold/40">
            <FiSearch size={16} />
            <input
              type="text"
              placeholder="Search customers..."
              className="bg-transparent outline-none text-sm text-ink-700 dark:text-paper placeholder:text-ink-300 w-full"
            />
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full flex items-center justify-center text-ink-500 dark:text-paper/80 hover:bg-ink-700/5 dark:hover:bg-paper/10 transition-colors"
          >
            {theme === 'dark' ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          <NotificationPanel />
        </div>
      </div>
    </header>
  )
}
