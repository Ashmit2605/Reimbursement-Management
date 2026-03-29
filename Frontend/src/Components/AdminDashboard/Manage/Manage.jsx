import { useState, useRef, useEffect } from 'react'
import { Plus, Send, ChevronDown, Trash2, Search, UserPlus, X, User, Users, Eye, Pencil, ShieldCheck, Key } from 'lucide-react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .pg-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .pg-wrap { font-family: 'Poppins', sans-serif; background: #f4f8f9; min-height: 100vh; padding: 24px; }

  .pg-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
  }
  .pg-title { font-size: 20px; font-weight: 700; color: #17252A; }
  .pg-title span { color: #388087; }
  .pg-sub { font-size: 12.5px; color: #7aa8ae; margin-top: 2px; }

  .toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .search-wrap { position: relative; flex: 1; min-width: 180px; max-width: 280px; }
  .search-wrap svg {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    width: 14px; height: 14px; color: #7aa8ae; pointer-events: none;
  }
  .search-input {
    width: 100%; padding: 8px 12px 8px 32px; border-radius: 10px;
    border: 1.5px solid rgba(111,179,184,0.2); background: #fff;
    font-family: 'Poppins', sans-serif; font-size: 12.5px; color: #17252A;
    outline: none; transition: all 0.15s;
  }
  .search-input:focus { border-color: #6FB3B8; box-shadow: 0 0 0 3px rgba(111,179,184,0.1); }
  .search-input::placeholder { color: #a0c4c8; }

  .btn-new {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 16px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #17252A, #388087); color: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
    box-shadow: 0 3px 10px rgba(23,37,42,0.2);
  }
  .btn-new:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(23,37,42,0.28); }
  .btn-new svg { width: 14px; height: 14px; }

  /* Stats */
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px; }
  .stat {
    background: #fff; border-radius: 14px; padding: 16px 18px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 1px 6px rgba(56,128,135,0.05);
  }
  .stat-label { font-size: 11.5px; color: #7aa8ae; font-weight: 500; margin-bottom: 6px; }
  .stat-val { font-size: 26px; font-weight: 700; color: #17252A; line-height: 1; }
  .stat-val span { font-size: 13px; font-weight: 500; color: #388087; margin-left: 4px; }

  /* Table */
  .table-card {
    background: #fff; border-radius: 16px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 1px 8px rgba(56,128,135,0.05); overflow: hidden;
  }
  .table-wrap { overflow-x: auto; }
  .tbl { width: 100%; border-collapse: collapse; min-width: 620px; }
  .tbl thead tr { background: rgba(111,179,184,0.06); border-bottom: 1.5px solid rgba(111,179,184,0.13); }
  .tbl th {
    padding: 12px 16px; text-align: left;
    font-size: 11.5px; font-weight: 600; color: #7aa8ae;
    letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap;
  }
  .tbl td { padding: 13px 16px; border-bottom: 1px solid rgba(111,179,184,0.09); vertical-align: middle; }
  .tbl tbody tr:last-child td { border-bottom: none; }
  .tbl tbody tr { transition: background 0.12s; }
  .tbl tbody tr:hover { background: rgba(111,179,184,0.04); }

  .user-cell { display: flex; align-items: center; gap: 10px; }
  .cell-avatar {
    width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 0.3px;
  }
  .cell-name { font-size: 13px; font-weight: 600; color: #17252A; }

  /* Role pill */
  .role-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 20px;
    font-size: 12px; font-weight: 600; border: 1.5px solid;
  }
  .pill-manager  { color: #388087; background: rgba(56,128,135,0.09);  border-color: rgba(56,128,135,0.22); }
  .pill-employee { color: #d4860a; background: rgba(212,134,10,0.09); border-color: rgba(212,134,10,0.22); }
  .pill-finance  { color: #2e7d32; background: rgba(46,125,50,0.09);  border-color: rgba(46,125,50,0.22); }
  .pill-director { color: #7b1fa2; background: rgba(123,31,162,0.09); border-color: rgba(123,31,162,0.22); }

  /* Action buttons */
  .action-group { display: flex; align-items: center; gap: 4px; }
  .view-btn {
    background: none; border: none; cursor: pointer; padding: 6px; border-radius: 7px;
    color: #6FB3B8; display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .view-btn:hover { background: rgba(111,179,184,0.12); color: #388087; }
  .edit-btn {
    background: none; border: none; cursor: pointer; padding: 6px; border-radius: 7px;
    color: #d4860a; display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .edit-btn:hover { background: rgba(212,134,10,0.10); color: #b06000; }
  .del-btn {
    background: none; border: none; cursor: pointer; padding: 6px; border-radius: 7px;
    color: #c8dde0; display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .del-btn:hover { background: rgba(192,80,77,0.08); color: #c0504d; }

  /* Overlay */
  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.38); backdrop-filter: blur(7px) saturate(0.9);
    display: flex; align-items: center; justify-content: center;
    padding: 16px; animation: fadeIn 0.18s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal {
    background: #fff; border-radius: 20px; width: 100%; max-width: 400px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.22), 0 0 0 1px rgba(111,179,184,0.16);
    animation: slideUp 0.2s ease; overflow: hidden;
  }
  @keyframes slideUp { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }

  .modal-header {
    padding: 20px 22px 16px; border-bottom: 1px solid rgba(111,179,184,0.13);
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-htitle { font-size: 15px; font-weight: 700; color: #17252A; }
  .modal-xbtn {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #7aa8ae;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .modal-xbtn:hover { background: #ffe0e0; color: #c0504d; }
  .modal-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 15px; }

  .field-label { font-size: 11.5px; font-weight: 600; color: #17252A; margin-bottom: 6px; letter-spacing: 0.2px; }
  .field-input {
    width: 100%; padding: 10px 13px; border-radius: 10px;
    border: 1.5px solid rgba(111,179,184,0.22); background: #f7fafa;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: #17252A;
    outline: none; transition: all 0.15s;
  }
  .field-input:focus { border-color: #6FB3B8; background: #fff; box-shadow: 0 0 0 3px rgba(111,179,184,0.1); }
  .field-select {
    width: 100%; padding: 10px 13px; border-radius: 10px;
    border: 1.5px solid rgba(111,179,184,0.22); background: #f7fafa;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: #17252A; outline: none;
  }
  .modal-footer { padding: 0 22px 20px; display: flex; flex-direction: column; gap: 9px; }
  .btn-primary {
    padding: 11px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #17252A, #388087); color: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; box-shadow: 0 3px 10px rgba(23,37,42,0.2);
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .btn-primary:active { transform: scale(0.98); }

  .password-box {
    background: rgba(56,128,135,0.06); border: 2px dashed rgba(56,128,135,0.3);
    border-radius: 12px; padding: 16px; text-align: center; margin-top: 10px;
  }
  .password-text { font-family: monospace; font-size: 20px; font-weight: 700; color: #17252A; letter-spacing: 2px; }
  .password-timer { font-size: 11px; color: #7aa8ae; margin-top: 8px; }

  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 300;
    background: #17252A; color: #fff; border-radius: 12px;
    padding: 12px 18px; font-size: 13px; font-weight: 500;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(23,37,42,0.28); 
  }
`

const AVATAR_COLORS = ['#388087', '#d4860a', '#6c3fc5', '#c0504d', '#2e7d32', '#1565c0', '#7b5ea7', '#b06000']
const avatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials = name => name ? name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '??'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [addModal, setAddModal] = useState(false)
  const [showcase, setShowcase] = useState(null) // { user, password, expireTime }
  const [toast, setToast] = useState(null)

  const fetchAllUsers = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/users", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await resp.json();
      if (resp.ok) setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      const resp = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (resp.ok) {
        setUsers(prev => prev.filter(u => u.id !== id));
        showToast("User removed successfully");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreate = async (formData) => {
    try {
      const resp = await fetch("http://localhost:5000/api/users/createuser", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await resp.json();
      if (resp.ok) {
        setUsers(prev => [...prev, data.user]);
        setShowcase({ user: data.user, password: data.user.plainPassword });
        setAddModal(false);
        showToast("User created successfully");
      } else {
        alert(data.message || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  const managers = users.filter(u => u.role === 'manager' || u.role === 'admin')
  const filtered = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{css}</style>
      <div className="pg-wrap">
        {/* Modals */}
        {addModal && (
          <AddUserModal 
            managers={managers} 
            onClose={() => setAddModal(false)} 
            onSave={handleCreate} 
          />
        )}

        {showcase && (
          <div className="overlay">
            <div className="modal">
              <div className="modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ShieldCheck size={20} color="#388087" />
                  <span className="modal-htitle">Credentials Generated</span>
                </div>
                <button className="modal-xbtn" onClick={() => setShowcase(null)}><X size={14} /></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: 13, color: '#5a7b80', lineHeight: 1.5 }}>
                  Account for <strong>{showcase.user.name}</strong> has been created. Use the temporary password below to log in.
                </p>
                <div className="password-box">
                  <div className="password-text">{showcase.password}</div>
                  <div className="password-timer">This password is shown only once. Please copy it now.</div>
                </div>
                <div style={{ padding: '10px 0', borderTop: '1px solid #f0f4f4', marginTop: 10 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                     <span style={{ color: '#7aa8ae' }}>Username:</span>
                     <span style={{ fontWeight: 600, color: '#17252A' }}>{showcase.user.email}</span>
                   </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={() => setShowcase(null)}>Got it, Closed</button>
              </div>
            </div>
          </div>
        )}

        <div className="pg-header">
           <div>
            <div className="pg-title">Manage <span>Users</span></div>
            <div className="pg-sub">Connect and manage your organization structure</div>
          </div>
          <div className="toolbar">
            <div className="search-wrap">
              <Search size={14} />
              <input 
                className="search-input" 
                placeholder="Search users..."
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
            <button className="btn-new" onClick={() => setAddModal(true)}>
              <Plus size={14} /> New User
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Manager</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#7aa8ae' }}>Loading teammates...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#7aa8ae' }}>No users found matching your search.</td></tr>
                ) : filtered.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="cell-avatar" style={{ background: avatarColor(user.name) }}>
                          {initials(user.name)}
                        </div>
                        <div className="cell-name">{user.name}</div>
                      </div>
                    </td>
                    <td>
                      <span className={`role-pill pill-${user.role}`}>{user.role}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: 13, color: '#5a7b80' }}>
                        {users.find(m => m.id === user.managerId)?.name || (user.role === 'admin' ? "System Admin" : "—")}
                      </span>
                    </td>
                    <td><span style={{ fontSize: 13, color: '#388087' }}>{user.email}</span></td>
                    <td>
                      <div className="action-group">
                        <button className="del-btn" onClick={() => handleDelete(user.id)} title="Remove User"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  )
}

function AddUserModal({ managers, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'employee', managerId: '' })
  
  return (
    <div className="overlay" onClick={e => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-htitle">Register New Team Member</span>
          <button className="modal-xbtn" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <div>
            <div className="field-label">Full Name</div>
            <input 
              className="field-input" 
              placeholder="e.g. Alex Graham"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
          <div>
            <div className="field-label">Email Address</div>
            <input 
              className="field-input" 
              type="email" 
              placeholder="e.g. alex@company.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div className="field-label">Role</div>
              <select 
                className="field-select"
                value={form.role}
                onChange={e => setForm({...form, role: e.target.value})}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="finance">Finance</option>
                <option value="director">Director</option>
              </select>
            </div>
            <div>
              <div className="field-label">Assign Manager</div>
              <select 
                className="field-select"
                value={form.managerId}
                onChange={e => setForm({...form, managerId: e.target.value})}
              >
                <option value="">— Select Manager —</option>
                {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#7aa8ae', background: '#f8fbfa', padding: 8, borderRadius: 8 }}>
            Upon creation, a unique access password will be generated for this user.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={() => onSave(form)}>Create User & Generate Access</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}