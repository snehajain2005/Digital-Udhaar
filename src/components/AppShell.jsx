import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import FAB from './FAB'

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-paper dark:bg-ink-800">
      <Sidebar />
      <div className="flex-1 min-w-0 pb-20 md:pb-0">
        <Outlet />
      </div>
      <MobileNav />
      <FAB />
    </div>
  )
}
