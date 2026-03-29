import { Search, Eye, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function Request() {
  const [requests, setRequests] = useState([
    { id: 1, employee: 'John Doe', amount: '$500', category: 'Travel', date: '2024-03-25', status: 'Pending' },
    { id: 2, employee: 'Jane Smith', amount: '$250', category: 'Office Supplies', date: '2024-03-24', status: 'Approved' },
    { id: 3, employee: 'Bob Johnson', amount: '$1,200', category: 'Training', date: '2024-03-23', status: 'Pending' },
    { id: 4, employee: 'Alice Brown', amount: '$350', category: 'Client Meeting', date: '2024-03-22', status: 'Rejected' },
    { id: 5, employee: 'Charlie Davis', amount: '$600', category: 'Equipment', date: '2024-03-21', status: 'Approved' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || req.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleApprove = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req))
  }

  const handleReject = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req))
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Reimbursement Requests</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by employee or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B8A8E]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B8A8E]"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{request.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{request.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      request.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Details">
                        <Eye size={18} />
                      </button>
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No requests found matching your filters.
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm font-medium">Total Pending</p>
          <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === 'Pending').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm font-medium">Total Approved</p>
          <p className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm font-medium">Total Rejected</p>
          <p className="text-2xl font-bold text-red-600">{requests.filter(r => r.status === 'Rejected').length}</p>
        </div>
      </div>
    </div>
  )
}
