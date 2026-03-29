import { useState, useEffect } from 'react'
import { Users, FileText, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react'

export default function DirectorOverview() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/expenses/all", {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        if (resp.ok) {
          const data = await resp.json()
          setExpenses(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error("Error fetching expenses:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchAllExpenses()
  }, [])

  const pending = expenses.filter(e => e.status === 'active' || e.status === 'pending')
  const processed = expenses.filter(e => e.status === 'approved' || e.status === 'rejected')
  const approved = expenses.filter(e => e.status === 'approved')

  const stats = [
    { label: 'Total Budget', value: '₹45,00,000', icon: TrendingUp, color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { label: 'Pending Approvals', value: String(pending.length), icon: Clock, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Processed Claims', value: String(processed.length), icon: CheckCircle, color: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Total Requests', value: String(expenses.length), icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-600' },
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{loading ? '...' : stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading...</p>
            ) : pending.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending approvals</p>
            ) : (
              pending.slice(0, 3).map((exp, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertCircle size={18} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{exp.description}</p>
                    <p className="text-gray-500 text-sm">{exp.type}</p>
                  </div>
                  <span className="font-bold text-gray-900">₹{Number(exp.amount).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-lg text-yellow-600">{pending.length}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Approved</span>
              <span className="font-bold text-lg text-green-600">{approved.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Processed</span>
              <span className="font-bold text-lg text-blue-600">{processed.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
