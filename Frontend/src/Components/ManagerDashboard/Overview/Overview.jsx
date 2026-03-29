import { Users, FileText, CheckCircle, Clock } from 'lucide-react'

export default function ManagerOverview() {
  const stats = [
    { label: 'Team Members', value: '24', icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Approved Requests', value: '89', icon: CheckCircle, color: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Total Requests', value: '156', icon: FileText, color: 'bg-purple-50', iconColor: 'text-purple-600' },
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

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Members</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((member) => (
              <div key={member} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Team Member {member}</p>
                  <p className="text-gray-500 text-sm">Completed 45 tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Approvals</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock size={18} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Request #{item}</p>
                  <p className="text-gray-500 text-sm">Waiting for approval</p>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
