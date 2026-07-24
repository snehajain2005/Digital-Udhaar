// All mock data used across SmartKhata. Frontend-only, no backend.

export const customers = [
  { id: 'c1', name: 'Ramesh Traders', phone: '+91 98765 43210', avatarColor: '#B33A3A', balance: 12400, status: 'pending', lastActivity: '2026-07-22', creditScore: 'medium', repaymentRate: 62, since: '2024-02-11' },
  { id: 'c2', name: 'Sunita Kirana Store', phone: '+91 91234 56780', avatarColor: '#3F7D58', balance: 0, status: 'paid', lastActivity: '2026-07-18', creditScore: 'low', repaymentRate: 100, since: '2023-11-03' },
  { id: 'c3', name: 'Vikas Auto Parts', phone: '+91 90000 11122', avatarColor: '#C9962C', balance: 28750, status: 'pending', lastActivity: '2026-07-10', creditScore: 'high', repaymentRate: 38, since: '2025-01-20' },
  { id: 'c4', name: 'Priya Beauty Corner', phone: '+91 98888 22334', avatarColor: '#8697A9', balance: 3200, status: 'pending', lastActivity: '2026-07-21', creditScore: 'low', repaymentRate: 88, since: '2024-06-15' },
  { id: 'c5', name: 'Meena Fashion Hub', phone: '+91 97000 55667', avatarColor: '#B33A3A', balance: 0, status: 'paid', lastActivity: '2026-07-05', creditScore: 'low', repaymentRate: 100, since: '2023-08-09' },
  { id: 'c6', name: 'Ashok Hardware', phone: '+91 96543 21098', avatarColor: '#3F7D66', balance: 45600, status: 'pending', lastActivity: '2026-06-29', creditScore: 'high', repaymentRate: 21, since: '2022-12-01' },
  { id: 'c7', name: 'Deepak Electronics', phone: '+91 95432 10987', avatarColor: '#C9962C', balance: 8900, status: 'pending', lastActivity: '2026-07-19', creditScore: 'medium', repaymentRate: 55, since: '2024-09-27' },
  { id: 'c8', name: 'Kavita Bakers', phone: '+91 94321 09876', avatarColor: '#B33A3A', balance: 0, status: 'paid', lastActivity: '2026-07-01', creditScore: 'low', repaymentRate: 100, since: '2025-03-14' },
  { id: 'c9', name: 'Rajesh Medical Store', phone: '+91 93210 98765', avatarColor: '#3F7D58', balance: 5400, status: 'pending', lastActivity: '2026-07-23', creditScore: 'low', repaymentRate: 91, since: '2024-01-05' },
  { id: 'c10', name: 'Sanjay Grocery Mart', phone: '+91 92109 87654', avatarColor: '#8697A9', balance: 16800, status: 'pending', lastActivity: '2026-07-15', creditScore: 'medium', repaymentRate: 47, since: '2023-05-22' },
]

export const transactions = [
  { id: 't1', customerId: 'c1', type: 'credit', amount: 4200, items: 'Rice, Dal, Cooking Oil', date: '2026-07-22', dueDate: '2026-08-05', notes: 'Monthly ration', status: 'pending' },
  { id: 't2', customerId: 'c1', type: 'payment', amount: 2000, items: 'Partial payment', date: '2026-07-10', dueDate: null, notes: '', status: 'completed' },
  { id: 't3', customerId: 'c1', type: 'credit', amount: 6200, items: 'Wheat flour, Sugar, Tea', date: '2026-06-28', dueDate: '2026-07-15', notes: '', status: 'overdue' },
  { id: 't4', customerId: 'c1', type: 'payment', amount: 4000, items: 'Cash payment', date: '2026-06-20', dueDate: null, notes: '', status: 'completed' },
  { id: 't5', customerId: 'c2', type: 'credit', amount: 1800, items: 'Snacks, Cold drinks', date: '2026-07-18', dueDate: '2026-07-25', notes: '', status: 'completed' },
  { id: 't6', customerId: 'c2', type: 'payment', amount: 1800, items: 'Full settlement', date: '2026-07-18', dueDate: null, notes: '', status: 'completed' },
  { id: 't7', customerId: 'c3', type: 'credit', amount: 15000, items: 'Brake pads, Engine oil x12', date: '2026-07-10', dueDate: '2026-07-20', notes: 'Bulk order for workshop', status: 'overdue' },
  { id: 't8', customerId: 'c3', type: 'credit', amount: 13750, items: 'Batteries, Spark plugs', date: '2026-06-15', dueDate: '2026-06-30', notes: '', status: 'overdue' },
  { id: 't9', customerId: 'c4', type: 'credit', amount: 3200, items: 'Cosmetics restock', date: '2026-07-21', dueDate: '2026-07-26', notes: '', status: 'pending' },
  { id: 't10', customerId: 'c5', type: 'payment', amount: 5200, items: 'Full settlement', date: '2026-07-05', dueDate: null, notes: '', status: 'completed' },
  { id: 't11', customerId: 'c6', type: 'credit', amount: 22000, items: 'Cement bags, GI pipes', date: '2026-06-29', dueDate: '2026-07-12', notes: 'Construction material', status: 'overdue' },
  { id: 't12', customerId: 'c6', type: 'credit', amount: 23600, items: 'Paint, Tools set', date: '2026-05-18', dueDate: '2026-06-01', notes: '', status: 'overdue' },
  { id: 't13', customerId: 'c7', type: 'credit', amount: 8900, items: 'Mobile accessories', date: '2026-07-19', dueDate: '2026-08-01', notes: '', status: 'pending' },
  { id: 't14', customerId: 'c9', type: 'credit', amount: 5400, items: 'Medicines, First aid supplies', date: '2026-07-23', dueDate: '2026-07-27', notes: 'Urgent', status: 'pending' },
  { id: 't15', customerId: 'c10', type: 'credit', amount: 16800, items: 'Grocery restock', date: '2026-07-15', dueDate: '2026-07-24', notes: '', status: 'pending' },
]

export const dashboardStats = {
  totalUdhaar: 120250,
  totalRecovered: 78400,
  pendingAmount: 41850,
  activeCustomers: 10,
}

export const monthlyRecovery = [
  { month: 'Feb', recovered: 32000, credit: 41000 },
  { month: 'Mar', recovered: 38500, credit: 46200 },
  { month: 'Apr', recovered: 41200, credit: 39800 },
  { month: 'May', recovered: 47800, credit: 52300 },
  { month: 'Jun', recovered: 52100, credit: 58900 },
  { month: 'Jul', recovered: 61300, credit: 64200 },
]

export const weeklyTransactions = [
  { day: 'Mon', count: 6 },
  { day: 'Tue', count: 9 },
  { day: 'Wed', count: 4 },
  { day: 'Thu', count: 11 },
  { day: 'Fri', count: 8 },
  { day: 'Sat', count: 14 },
  { day: 'Sun', count: 5 },
]

export const creditVsPayment = [
  { name: 'Credit Given', value: 68200, color: '#B33A3A' },
  { name: 'Payments Received', value: 78400, color: '#3F7D58' },
]

export const customerDistribution = [
  { name: 'Low Risk', value: 5, color: '#3F7D58' },
  { name: 'Medium Risk', value: 3, color: '#C9962C' },
  { name: 'High Risk', value: 2, color: '#B33A3A' },
]

export const avgPaymentDelay = [
  { month: 'Feb', days: 6.2 },
  { month: 'Mar', days: 5.4 },
  { month: 'Apr', days: 7.1 },
  { month: 'May', days: 4.8 },
  { month: 'Jun', days: 5.9 },
  { month: 'Jul', days: 4.2 },
]

export const notifications = [
  { id: 'n1', title: 'Payment received', message: 'Sunita Kirana Store paid ₹1,800 in full.', time: '2h ago', type: 'success', read: false },
  { id: 'n2', title: 'Due date approaching', message: 'Priya Beauty Corner owes ₹3,200, due in 2 days.', time: '5h ago', type: 'warning', read: false },
  { id: 'n3', title: 'Overdue reminder sent', message: 'Reminder sent to Ashok Hardware for ₹45,600.', time: '1d ago', type: 'info', read: true },
  { id: 'n4', title: 'New customer added', message: 'Rajesh Medical Store was added to your khata.', time: '2d ago', type: 'info', read: true },
]

export const testimonials = [
  { name: 'Bharat Sahu', shop: 'Sahu General Store, Jaipur', quote: 'Meri poori dukaan ka udhaar ab ek jagah dikhta hai. Register dhoondna band ho gaya.', rating: 5 },
  { name: 'Firoz Ansari', shop: 'Ansari Kirana, Lucknow', quote: 'Reminder bhejne se paise time pe wapas aane lage. Bahut kaam ki app hai.', rating: 5 },
  { name: 'Lakshmi Devi', shop: 'Devi Provision Store, Coimbatore', quote: 'I finally know exactly who owes what without flipping through three notebooks.', rating: 4 },
]

export const faqs = [
  { q: 'Do I need internet to use SmartKhata?', a: 'SmartKhata works best with internet for backups, but you can view and add entries even with a weak connection.' },
  { q: 'Is my customer data safe?', a: 'Your khata data stays private to your shop account and is never shared with other shopkeepers or third parties.' },
  { q: 'Can I send payment reminders?', a: 'Yes — SmartKhata drafts reminder messages for each customer that you can send over WhatsApp or SMS.' },
  { q: 'Does it work in Hindi?', a: 'Yes, SmartKhata supports Hindi and English so you can run your khata in the language you\'re comfortable with.' },
  { q: 'What does it cost?', a: 'SmartKhata is free to start for up to 50 customers, with affordable plans for larger shops.' },
]

export const quickActions = [
  { label: 'Add Transaction', icon: 'add' },
  { label: 'New Customer', icon: 'user' },
  { label: 'Send Reminders', icon: 'bell' },
  { label: 'Export Report', icon: 'download' },
]
