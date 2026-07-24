import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiGlobe, FiUser, FiMessageSquare, FiSave } from 'react-icons/fi'
import Topbar from '../components/Topbar'
import PageTransition from '../components/PageTransition'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'hinglish', label: 'Hinglish' },
]

function SettingsSection({ icon: Icon, title, description, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ledger-card p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-ledger-red/10 text-ledger-red flex items-center justify-center shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-display font-semibold text-ink-700 dark:text-paper">{title}</p>
          <p className="text-xs text-ink-400 mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [language, setLanguage] = useState('hinglish')
  const [template, setTemplate] = useState(
    'Namaste {name} ji, aapka {amount} ka udhaar {dueDate} tak pending hai. Kripya jaldi bhugtan karein. Dhanyavaad — {shopName}'
  )
  const [name, setName] = useState(user?.owner || '')
  const [shopName, setShopName] = useState(user?.name || '')
  const [phone, setPhone] = useState('+91 98765 43210')

  function handleSaveProfile(e) {
    e.preventDefault()
    showToast('Profile updated successfully.', 'success')
  }

  function handleSaveTemplate() {
    showToast('Reminder template saved.', 'success')
  }

  return (
    <PageTransition>
      <Topbar title="Settings" subtitle="Manage how SmartKhata works for your shop" />

      <div className="px-4 md:px-8 py-6 max-w-2xl mx-auto space-y-5">
        <SettingsSection icon={theme === 'dark' ? FiSun : FiMoon} title="Appearance" description="Switch between light and dark mode">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-600 dark:text-paper/80">Dark mode</p>
            <button
              onClick={toggleTheme}
              className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${theme === 'dark' ? 'bg-ledger-red justify-end' : 'bg-ink-700/15 justify-start'}`}
              aria-label="Toggle theme"
            >
              <motion.span layout className="w-5 h-5 rounded-full bg-white shadow" />
            </button>
          </div>
        </SettingsSection>

        <SettingsSection icon={FiGlobe} title="Language" description="Choose the language for your khata interface">
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLanguage(l.code); showToast(`Language set to ${l.label}.`, 'success') }}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                  language === l.code
                    ? 'bg-ledger-red text-paper border-ledger-red'
                    : 'border-ink-700/12 dark:border-paper/15 text-ink-600 dark:text-paper/80'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection icon={FiMessageSquare} title="Reminder Message Template" description="Customize the message sent to customers about pending udhaar">
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={4}
            className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-3 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40 resize-none font-mono"
          />
          <p className="text-[11px] text-ink-400 mt-2">Use {'{name}'}, {'{amount}'}, {'{dueDate}'}, {'{shopName}'} as placeholders.</p>
          <button
            onClick={handleSaveTemplate}
            className="mt-4 flex items-center gap-2 bg-ink-700 dark:bg-ledger-gold text-paper dark:text-ink-800 text-xs font-medium px-4 py-2.5 rounded-full"
          >
            <FiSave size={14} /> Save template
          </button>
        </SettingsSection>

        <SettingsSection icon={FiUser} title="Profile" description="Your shop and account details">
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1.5 block">Owner name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-2.5 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1.5 block">Shop name</label>
              <input value={shopName} onChange={(e) => setShopName(e.target.value)} className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-2.5 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40" />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1.5 block">Phone number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-paper dark:bg-ink-700 border border-ink-700/12 dark:border-paper/15 rounded-xl px-3.5 py-2.5 text-sm text-ink-700 dark:text-paper outline-none focus:ring-2 focus:ring-ledger-gold/40" />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-ledger-red text-paper text-xs font-medium px-4 py-2.5 rounded-full mt-1">
              <FiSave size={14} /> Save changes
            </button>
          </form>
        </SettingsSection>
      </div>
    </PageTransition>
  )
}
