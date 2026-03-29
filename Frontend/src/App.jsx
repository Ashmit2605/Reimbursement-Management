import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginSection from './Components/Loginsection/LoginSection'

// ✅ Main Page Import
import Mainpage from './pages/Mainpage/Mainpage'

// Dashboard Layouts (from pages folder)
import AdminDash from './pages/AdminDash/AdminDash'
import ManagerDash from './pages/ManagerDash/ManagerDash'
import EmployeeDash from './pages/EmployeeDash/EmployeeDash'

// Admin Components
import AdminOverview from './Components/AdminDashboard/Overview/Overview'
import AdminManage from './Components/AdminDashboard/Manage/Manage'
import AdminRequests from './Components/AdminDashboard/Requests/Requests'
import AdminSettings from './Components/AdminDashboard/Settings/Settings'

// Manager Components
import ManagerOverview from './Components/ManagerDashboard/Overview/Overview'
import ManagerRequest from './Components/ManagerDashboard/Request/Request'
import ManagerSettings from './Components/ManagerDashboard/Settings/Settings'

// Employee Components
import EmployeeOverview from './Components/EmployeeDashboard/Overview/Overview'
import EmployeeHistory from './Components/EmployeeDashboard/History/History'
import EmployeeRequest from './Components/EmployeeDashboard/Request/Request'
import EmployeeSettings from './Components/EmployeeDashboard/Settings/Settings'

// Director Components
import DirectorDash from './pages/DirectorDash/DirectorDash'
import DirectorOverview from './Components/DirectorDashboard/Overview/Overview'
import DirectorRequests from './Components/DirectorDashboard/Requests/Requests'
import DirectorSettings from './Components/DirectorDashboard/Settings/Settings'

// Finance Components
import FinanceDash from './pages/FinanceDash/FinanceDash'
import FinanceOverview from './Components/FinanceDashboard/Overview/Overview'
import FinanceRequests from './Components/FinanceDashboard/Requests/Requests'
import FinanceSettings from './Components/FinanceDashboard/Settings/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Main Landing Page */}
        <Route path="/" element={<Mainpage />} />

        {/* ✅ Login Page */}
        <Route path="/login" element={<LoginSection />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDash />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="manage" element={<AdminManage />} />
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
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<EmployeeOverview />} />
          <Route path="history" element={<EmployeeHistory />} />
          <Route path="request" element={<EmployeeRequest />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>

        {/* Director Routes */}
        <Route path="/director" element={<DirectorDash />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DirectorOverview />} />
          <Route path="requests" element={<DirectorRequests />} />
          <Route path="settings" element={<DirectorSettings />} />
        </Route>

        {/* Finance Routes */}
        <Route path="/finance" element={<FinanceDash />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<FinanceOverview />} />
          <Route path="requests" element={<FinanceRequests />} />
          <Route path="settings" element={<FinanceSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App