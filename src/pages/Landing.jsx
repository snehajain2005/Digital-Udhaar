import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiBook, FiBell, FiMic, FiPieChart, FiUsers, FiShield, FiChevronDown, FiStar, FiMenu, FiX,
} from 'react-icons/fi'
import Button from '../components/Button'
import LedgerMockup from '../components/LedgerMockup'
import PageTransition from '../components/PageTransition'
import { testimonials, faqs } from '../data/mockData'

const features = [
  { icon: FiBook, title: 'One ledger, every customer', desc: 'Replace scattered notebooks with a single digital khata that never runs out of pages.' },
  { icon: FiBell, title: 'Reminders that get paid', desc: 'Draft due-date reminders in one tap and send them straight over WhatsApp.' },
  { icon: FiMic, title: 'Add entries by voice', desc: 'Speak an entry while you\'re busy at the counter — SmartKhata fills in the form.' },
  { icon: FiPieChart, title: 'See where your money is', desc: 'Recovery trends, risk levels, and pending dues laid out at a glance.' },
  { icon: FiUsers, title: 'Know your customers', desc: 'Repayment history and risk badges for every regular, so you know who to trust.' },
  { icon: FiShield, title: 'Private by default', desc: 'Your khata stays yours — no other shopkeeper or outsider ever sees it.' },
]

const benefits = [
  { stat: '0', label: 'Notebooks lost to rain, rats, or fire' },
  { stat: '2 min', label: 'To add today\'s entries after closing' },
  { stat: '100%', label: 'Of your udhaar visible from your phone' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-ink-700/8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-ledger-red flex items-center justify-center">
            <FiBook className="text-paper" size={16} />
          </div>
          <span className="font-display font-semibold text-lg text-ink-700">SmartKhata</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-500">
          <a href="#features" className="hover:text-ink-700">Features</a>
          <a href="#why" className="hover:text-ink-700">Why SmartKhata</a>
          <a href="#testimonials" className="hover:text-ink-700">Stories</a>
          <a href="#faq" className="hover:text-ink-700">FAQ</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button to="/login" variant="ghost">Log in</Button>
          <Button to="/login" variant="primary">Get started free</Button>
        </div>
        <button className="md:hidden text-ink-700" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 text-sm font-medium text-ink-600 border-t border-ink-700/8 pt-4">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#why" onClick={() => setOpen(false)}>Why SmartKhata</a>
          <a href="#testimonials" onClick={() => setOpen(false)}>Stories</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <Button to="/login" variant="primary" className="w-full">Get started free</Button>
        </div>
      )}
    </header>
  )
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="border-b border-ink-700/10 py-5">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-left gap-4">
        <span className="font-medium text-ink-700">{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="text-ink-400 shrink-0" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-ink-400 pt-3 pr-6 leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  )
}

export default function Landing() {
  return (
    <PageTransition>
      <div className="bg-paper text-ink-700">
        <Navbar />

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ledger-red bg-ledger-red/8 px-3 py-1.5 rounded-full"
            >
              For shopkeepers, by design
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mt-5"
            >
              Your paper khata,
              <br />
              now impossible to lose.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-ink-400 text-lg mt-5 max-w-md leading-relaxed"
            >
              SmartKhata turns your udhaar register into a smart ledger you can check from
              your phone — every customer, every rupee, every due date, in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Button to="/login" variant="primary">Start your khata free</Button>
              <Button to="/login" variant="ghost">See a live demo</Button>
            </motion.div>
            <p className="text-xs text-ink-300 mt-4">No card needed · Works in Hindi & English</p>
          </div>

          <LedgerMockup className="w-full max-w-md mx-auto md:ml-auto" />
        </section>

        {/* Feature cards */}
        <section id="features" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="max-w-lg mb-12">
            <p className="text-xs font-semibold text-ledger-red uppercase tracking-wide">Features</p>
            <h2 className="font-display text-3xl font-semibold mt-3">Everything your register did — and what it never could.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="ledger-card p-6"
              >
                <div className="w-11 h-11 rounded-lg bg-ledger-red/10 text-ledger-red flex items-center justify-center mb-4">
                  <f.icon size={20} />
                </div>
                <p className="font-display font-semibold text-lg">{f.title}</p>
                <p className="text-sm text-ink-400 mt-2 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why SmartKhata / benefits */}
        <section id="why" className="bg-ink-700 text-paper py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold text-ledger-gold uppercase tracking-wide">Why SmartKhata</p>
                <h2 className="font-display text-3xl font-semibold mt-3 leading-tight">
                  Built around how shopkeepers actually keep accounts.
                </h2>
                <p className="text-paper/70 mt-4 leading-relaxed max-w-md">
                  We studied real bahi-khata registers before writing a line of code. SmartKhata
                  keeps the same jama-udhaar logic your family has used for years — just faster,
                  and impossible to lose in a flood or a fire.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {benefits.map((b) => (
                    <div key={b.label}>
                      <p className="font-display text-2xl md:text-3xl font-semibold text-ledger-gold">{b.stat}</p>
                      <p className="text-xs text-paper/60 mt-1 leading-snug">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <LedgerMockup className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-lg mb-12">
            <p className="text-xs font-semibold text-ledger-red uppercase tracking-wide">Shopkeeper stories</p>
            <h2 className="font-display text-3xl font-semibold mt-3">Trusted at the counter, not just in a pitch deck.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="ledger-card p-6 flex flex-col"
              >
                <div className="flex gap-0.5 text-ledger-gold mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <FiStar key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-ink-600 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="mt-5 pt-4 border-t border-ink-700/8">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.shop}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="text-xs font-semibold text-ledger-red uppercase tracking-wide text-center">FAQ</p>
          <h2 className="font-display text-3xl font-semibold mt-3 text-center">Questions shopkeepers ask us</h2>
          <div className="mt-10">
            {faqs.map((item, i) => <FaqItem key={item.q} item={item} index={i} />)}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
          <div className="ledger-card bg-ledger-red text-paper p-10 md:p-14 text-center rounded-2xl relative overflow-hidden">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Close today's khata in two minutes.</h2>
            <p className="text-paper/80 mt-3 max-w-md mx-auto">Join shopkeepers across India who stopped worrying about a lost register.</p>
            <Button to="/login" variant="dark" className="mt-7 !bg-ink-800">Start your khata free</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-ink-700/8 py-10">
          <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-ledger-red flex items-center justify-center">
                <FiBook className="text-paper" size={14} />
              </div>
              <span className="font-display font-semibold text-ink-700">SmartKhata</span>
            </div>
            <p className="text-xs text-ink-300">© 2026 SmartKhata. Made for shopkeepers across India.</p>
            <div className="flex items-center gap-5 text-xs text-ink-400">
              <Link to="/login" className="hover:text-ink-700">Log in</Link>
              <a href="#faq" className="hover:text-ink-700">FAQ</a>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
