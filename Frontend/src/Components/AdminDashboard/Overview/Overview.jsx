import { Users, FileText, AlertCircle, TrendingUp } from 'lucide-react'

export default function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Pending Requests', value: '45', icon: FileText, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'System Alerts', value: '8', icon: AlertCircle, color: 'bg-red-50', iconColor: 'text-red-600' },
    { label: 'Monthly Growth', value: '+12%', icon: TrendingUp, color: 'bg-green-50', iconColor: 'text-green-600' },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`${stat.iconColor}`} size={24} />
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">User Action #{item}</p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
              <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">Completed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
