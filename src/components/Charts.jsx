import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'

const gridColor = 'rgba(28,43,57,0.08)'
const axisStyle = { fontSize: 11, fill: '#8697A9', fontFamily: 'Work Sans' }

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-ink-700 text-paper text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  )
}

export function RecoveryAreaChart({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="gRecovered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3F7D58" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#3F7D58" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gCredit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#B33A3A" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#B33A3A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<CustomTooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />} />
        <Area type="monotone" dataKey="credit" name="Credit" stroke="#B33A3A" fill="url(#gCredit)" strokeWidth={2} />
        <Area type="monotone" dataKey="recovered" name="Recovered" stroke="#3F7D58" fill="url(#gRecovered)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function WeeklyBarChart({ data, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,150,44,0.1)' }} />
        <Bar dataKey="count" name="Transactions" fill="#C9962C" radius={[6, 6, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CreditPaymentPie({ data, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} paddingAngle={3} strokeWidth={0}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Work Sans' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function DistributionPie({ data, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={82} strokeWidth={0}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontFamily: 'Work Sans' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function DelayLineChart({ data, height = 240 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={30} />
        <Tooltip content={<CustomTooltip formatter={(v) => `${v} days`} />} />
        <Line type="monotone" dataKey="days" name="Avg delay" stroke="#B33A3A" strokeWidth={2.5} dot={{ r: 4, fill: '#B33A3A' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
