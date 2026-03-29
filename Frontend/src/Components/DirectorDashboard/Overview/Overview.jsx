import { Users, FileText, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react'

export default function DirectorOverview() {
  const stats = [
    { label: 'Total Budget', value: '₹45,00,000', icon: TrendingUp, color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { label: 'Pending Approvals', value: '18', icon: Clock, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Processed Claims', value: '142', icon: CheckCircle, color: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Department count', value: '4', icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Director Overview</h2>
        <p className="text-gray-500 mt-2">Executive summary of reimbursement activities</p>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Critical Approvals</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertCircle size={18} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">High Value Claim #{1000 + item}</p>
                  <p className="text-gray-500 text-sm">Waiting for 3 days</p>
                </div>
                <span className="font-bold text-gray-900">₹12,400</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Health</h3>
          <div className="space-y-4">
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
               <p className="text-gray-400 italic">Budget distribution chart placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
