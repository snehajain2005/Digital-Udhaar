import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function FAB() {
  const navigate = useNavigate()
  return (
    <motion.button
      onClick={() => navigate('/add-transaction')}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-ledger-red text-paper items-center justify-center shadow-lg shadow-ledger-red/35"
      aria-label="Add transaction"
    >
      <FiPlus size={24} />
    </motion.button>
  )
}
