import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginSection from './Components/Loginsection/LoginSection'

// Dashboard Layouts (from pages folder)
import AdminDash from './pages/AdminDash/AdminDash'
import ManagerDash from './pages/ManagerDash/ManagerDash'
import EmployeeDash from './pages/EmployeeDash/EmployeeDash'

// Admin Components
import AdminOverview from './Components/AdminDashboard/Overview/Overview'
import AdminRequests from './Components/AdminDashboard/Manage/Manage'
import AdminSettings from './Components/AdminDashboard/Settings/Settings'

// Manager Components
import ManagerOverview from './Components/ManagerDashboard/Overview/Overview'
import ManagerRequest from './Components/ManagerDashboard/Request/Request'
import ManagerSettings from './Components/ManagerDashboard/Settings/Settings'

// Employee Components
import EmployeeRequest from './Components/EmployeeDashboard/Request/Request'
import EmployeeSettings from './Components/EmployeeDashboard/Settings/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSection />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDash />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerDash />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<ManagerOverview />} />
          <Route path="requests" element={<ManagerRequest />} />
          <Route path="settings" element={<ManagerSettings />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<EmployeeDash />}>
     
          <Route path="request" element={<EmployeeRequest />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App