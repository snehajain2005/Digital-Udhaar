import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { FiBook, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import PageTransition from '../components/PageTransition'
import LedgerMockup from '../components/LedgerMockup'

export default function Login() {
  const [email, setEmail] = useState('rakesh.traders@gmail.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error')
      return
    }
    setLoading(true)
    setTimeout(() => {
      login(email)
      setLoading(false)
      showToast('Welcome back! Your khata is ready.', 'success')
      navigate('/dashboard')
    }, 700)
  }

  return (
    <PageTransition>
      <div className="min-h-screen grid md:grid-cols-2 bg-paper">
        <div className="hidden md:flex flex-col justify-between bg-ink-700 text-paper p-10 lg:p-14">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-ledger-red flex items-center justify-center">
              <FiBook size={16} />
            </div>
            <span className="font-display font-semibold text-lg">SmartKhata</span>
          </Link>

          <div>
            <p className="font-display text-3xl font-semibold leading-tight max-w-sm">
              "Meri poori dukaan ka udhaar ab ek jagah dikhta hai."
            </p>
            <p className="text-paper/60 text-sm mt-4">— Bharat Sahu, Sahu General Store, Jaipur</p>
            <div className="mt-10">
              <LedgerMockup className="max-w-sm" />
            </div>
          </div>
          <div />
        </div>

        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
          <Link to="/" className="md:hidden flex items-center gap-2 mb-10 text-ink-500 text-sm w-fit">
            <FiArrowLeft size={16} /> Back to home
          </Link>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full mx-auto">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink-700">Welcome back</h1>
            <p className="text-ink-400 text-sm mt-2">Log in to see today's udhaar at a glance.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-medium text-ink-500 mb-1.5 block">Email</label>
                <div className="flex items-center gap-2.5 bg-white border border-ink-700/12 rounded-xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-ledger-gold/40">
                  <FiMail className="text-ink-300 shrink-0" size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourshop.com"
                    className="bg-transparent outline-none text-sm w-full text-ink-700 placeholder:text-ink-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-500 mb-1.5 block">Password</label>
                <div className="flex items-center gap-2.5 bg-white border border-ink-700/12 rounded-xl px-3.5 py-3 focus-within:ring-2 focus-within:ring-ledger-gold/40">
                  <FiLock className="text-ink-300 shrink-0" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter any password"
                    className="bg-transparent outline-none text-sm w-full text-ink-700 placeholder:text-ink-300"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-ink-300 shrink-0" aria-label="Toggle password visibility">
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-ink-400">
                  <input type="checkbox" className="rounded border-ink-700/20" defaultChecked />
                  Remember me
                </label>
                <a href="#" className="text-ledger-red font-medium">Forgot password?</a>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-ledger-red text-paper font-medium text-sm rounded-xl py-3.5 mt-2 disabled:opacity-70"
              >
                {loading ? 'Opening your khata...' : 'Log in'}
              </motion.button>
            </form>

            <p className="text-xs text-ink-300 text-center mt-6">
              This is a demo — any email and password will log you in.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
