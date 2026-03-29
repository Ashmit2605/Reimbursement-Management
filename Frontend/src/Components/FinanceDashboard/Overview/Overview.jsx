import { CreditCard, CheckCircle, Clock, AlertTriangle, TrendingDown } from 'lucide-react'

export default function FinanceOverview() {
  const stats = [
    { label: 'Outward Payments', value: '₹12,45,000', icon: TrendingDown, color: 'bg-rose-50', iconColor: 'text-rose-600' },
    { label: 'Pending for Payment', value: '₹5,40,000', icon: Clock, color: 'bg-amber-50', iconColor: 'text-amber-600' },
    { label: 'Successful Transfers', value: '182', icon: CheckCircle, color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { label: 'Discrepancy Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-50', iconColor: 'text-red-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Finance Overview</h2>
        <p className="text-gray-500 mt-2">Cash flow and reimbursement disbursement summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`${stat.iconColor}`} size={24} />
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Disbursements</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                  <CreditCard size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Payment Batch - MAR-{100 + item}</p>
                  <p className="text-gray-500 text-sm">₹{item * 12000}</p>
                </div>
                <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-sm border-2 border-indigo-100">Pay Now</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payout Analysis</h3>
          <div className="h-44 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
             <p className="text-gray-400 italic">Disbursement trends chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}
