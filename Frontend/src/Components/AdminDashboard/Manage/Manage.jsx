import { useState, useRef, useEffect } from 'react'
import { Plus, Send, ChevronDown, Trash2, Search, UserPlus, X, User, Users, Eye, Pencil } from 'lucide-react'

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

  /* Dropdown */
  .dd-wrap { position: relative; display: inline-block; }
  .dd-trigger {
    display: inline-flex; align-items: center; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 0;
    font-family: 'Poppins', sans-serif;
  }
  .dd-trigger svg { width: 11px; height: 11px; color: #7aa8ae; }
  .dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; z-index: 100;
    background: #fff; border-radius: 12px; min-width: 160px;
    border: 1.5px solid rgba(111,179,184,0.2);
    box-shadow: 0 8px 28px rgba(23,37,42,0.13);
    overflow: hidden; animation: ddIn 0.14s ease;
  }
  @keyframes ddIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  .dd-search {
    width: 100%; padding: 8px 12px; border: none;
    border-bottom: 1px solid rgba(111,179,184,0.13);
    font-family: 'Poppins', sans-serif; font-size: 12px; color: #17252A;
    outline: none; background: rgba(111,179,184,0.04);
  }
  .dd-item {
    padding: 9px 14px; font-size: 12.5px; font-weight: 500; color: #17252A;
    cursor: pointer; transition: background 0.1s; display: flex; align-items: center; gap: 8px;
  }
  .dd-item:hover { background: rgba(111,179,184,0.08); color: #388087; }
  .dd-item.empty { color: #a0c4c8; cursor: default; font-size: 12px; }
  .dd-item.empty:hover { background: none; color: #a0c4c8; }

  .manager-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 8px;
    background: rgba(23,37,42,0.04); border: 1px solid rgba(23,37,42,0.08);
    font-size: 12px; font-weight: 500; color: #17252A;
  }
  .manager-tag svg { width: 11px; height: 11px; color: #7aa8ae; }
  .unassigned { font-size: 12px; color: #a0c4c8; font-style: italic; }

  .send-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 13px; border-radius: 9px;
    border: 1.5px solid rgba(56,128,135,0.2);
    background: rgba(56,128,135,0.06); color: #388087;
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .send-btn:hover { background: #388087; color: #fff; border-color: #388087; }
  .send-btn.sent { opacity: 0.7; cursor: default; }
  .send-btn svg { width: 12px; height: 12px; }

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

  /* Empty */
  .empty-state { text-align: center; padding: 52px 24px; }
  .empty-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(111,179,184,0.08); border: 1.5px solid rgba(111,179,184,0.15);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 14px; color: #6FB3B8;
  }
  .empty-title { font-size: 14px; font-weight: 600; color: #17252A; margin-bottom: 6px; }
  .empty-sub { font-size: 12.5px; color: #7aa8ae; }

  /* Modal */
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
  .modal-hl { display: flex; align-items: center; gap: 12px; }
  .modal-hicon {
    width: 40px; height: 40px; border-radius: 11px;
    background: rgba(56,128,135,0.08); border: 1.5px solid rgba(56,128,135,0.15);
    display: flex; align-items: center; justify-content: center; color: #388087;
  }
  .modal-hicon.amber { background: rgba(212,134,10,0.08); border-color: rgba(212,134,10,0.2); color: #d4860a; }
  .modal-hicon svg { width: 18px; height: 18px; }
  .modal-htitle { font-size: 15px; font-weight: 700; color: #17252A; }
  .modal-hsub   { font-size: 12px; color: #7aa8ae; margin-top: 2px; }
  .modal-xbtn {
    width: 30px; height: 30px; border-radius: 8px; border: none;
    background: rgba(111,179,184,0.08); cursor: pointer; color: #7aa8ae;
    display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .modal-xbtn:hover { background: #ffe0e0; color: #c0504d; }

  .modal-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 15px; }

  /* View modal styles */
  .view-hero {
    padding: 28px 22px 22px; display: flex; flex-direction: column; align-items: center; gap: 10px;
    background: linear-gradient(160deg, rgba(56,128,135,0.05), rgba(23,37,42,0.03));
    border-bottom: 1px solid rgba(111,179,184,0.13);
  }
  .view-avatar {
    width: 64px; height: 64px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 700; color: #fff;
    box-shadow: 0 4px 14px rgba(23,37,42,0.18);
  }
  .view-name  { font-size: 16px; font-weight: 700; color: #17252A; margin-top: 4px; }
  .view-email { font-size: 12px; color: #7aa8ae; }
  .view-rows  { padding: 16px 22px 22px; display: flex; flex-direction: column; }
  .view-row   {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0; border-bottom: 1px solid rgba(111,179,184,0.09);
  }
  .view-row:last-child { border-bottom: none; }
  .view-key { font-size: 12px; color: #7aa8ae; font-weight: 500; }
  .view-val { font-size: 13px; font-weight: 600; color: #17252A; text-align: right; }

  .field-label { font-size: 11.5px; font-weight: 600; color: #17252A; margin-bottom: 6px; letter-spacing: 0.2px; }
  .field-label .req { color: #c0504d; }
  .field-err { font-size: 11.5px; color: #c0504d; margin-top: 5px; }

  .field-input {
    width: 100%; padding: 10px 13px; border-radius: 10px;
    border: 1.5px solid rgba(111,179,184,0.22); background: #f7fafa;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: #17252A;
    outline: none; transition: all 0.15s;
  }
  .field-input:focus { border-color: #6FB3B8; background: #fff; box-shadow: 0 0 0 3px rgba(111,179,184,0.1); }
  .field-input::placeholder { color: #a0c4c8; }
  .field-input.err { border-color: rgba(192,80,77,0.45); }

  .role-toggle { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .role-opt {
    flex: 1; padding: 10px 12px; border-radius: 10px; cursor: pointer;
    border: 1.5px solid rgba(111,179,184,0.2); background: #f7fafa;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    color: #7aa8ae; transition: all 0.15s; text-align: center;
  }
  .role-opt:hover { border-color: #6FB3B8; color: #388087; background: rgba(111,179,184,0.05); }
  .role-opt.sel-manager  { border-color: #388087; background: rgba(56,128,135,0.08);  color: #388087; }
  .role-opt.sel-employee { border-color: #d4860a; background: rgba(212,134,10,0.08); color: #d4860a; }
  .role-opt.sel-finance  { border-color: #2e7d32; background: rgba(46,125,50,0.08);  color: #2e7d32; }
  .role-opt.sel-director { border-color: #7b1fa2; background: rgba(123,31,162,0.08); color: #7b1fa2; }

  .mgr-note {
    display: flex; gap: 9px; padding: 10px 13px; margin-top: 8px;
    background: rgba(212,134,10,0.06); border: 1.5px solid rgba(212,134,10,0.16); border-radius: 10px;
  }
  .mgr-note svg { width: 14px; height: 14px; color: #d4860a; flex-shrink: 0; margin-top: 2px; }
  .mgr-note p { font-size: 11.5px; color: #9a6200; line-height: 1.55; }

  .field-select {
    width: 100%; padding: 10px 36px 10px 13px; border-radius: 10px;
    border: 1.5px solid rgba(111,179,184,0.22); background: #f7fafa;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: #17252A;
    outline: none; transition: all 0.15s; cursor: pointer; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237aa8ae' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 13px center;
  }
  .field-select:focus { border-color: #6FB3B8; background-color: #fff; box-shadow: 0 0 0 3px rgba(111,179,184,0.1); }
  .field-select.err { border-color: rgba(192,80,77,0.45); }

  .modal-footer { padding: 0 22px 20px; display: flex; flex-direction: column; gap: 9px; }
  .btn-primary {
    padding: 11px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, #17252A, #388087); color: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.15s; box-shadow: 0 3px 10px rgba(23,37,42,0.2);
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(23,37,42,0.28); }
  .btn-primary.amber { background: linear-gradient(135deg, #b06000, #d4860a); box-shadow: 0 3px 10px rgba(180,100,0,0.22); }
  .btn-cancel {
    padding: 11px; border-radius: 10px; background: transparent; color: #7aa8ae;
    border: 1.5px solid #e2eef0; font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s;
  }
  .btn-cancel:hover { border-color: #6FB3B8; color: #388087; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 300;
    background: #17252A; color: #fff; border-radius: 12px;
    padding: 12px 18px; font-size: 13px; font-weight: 500;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(23,37,42,0.28); animation: toastIn 0.22s ease;
  }
  @keyframes toastIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; background: #6FB3B8; flex-shrink: 0; }
`

const AVATAR_COLORS = ['#388087', '#d4860a', '#6c3fc5', '#c0504d', '#2e7d32', '#1565c0', '#7b5ea7', '#b06000']
const avatarColor = name => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
const initials = name => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

const getPillClass = role => {
  switch (role) {
    case 'Manager': return 'pill-manager'
    case 'Employee': return 'pill-employee'
    case 'Finance': return 'pill-finance'
    case 'Director': return 'pill-director'
    default: return 'pill-employee'
  }
}

const INITIAL_USERS = [
  { id: 1, name: 'Marc Dupont', role: 'Manager', manager: null, email: 'marc@company.com', sent: false },
  { id: 2, name: 'Sarah Johnson', role: 'Manager', manager: null, email: 'sarah@company.com', sent: false },
  { id: 3, name: 'Alex Chen', role: 'Employee', manager: 'Marc Dupont', email: 'alex@company.com', sent: false },
  { id: 4, name: 'Priya Sharma', role: 'Employee', manager: 'Sarah Johnson', email: 'priya@company.com', sent: false },
  { id: 5, name: 'James Walker', role: 'Employee', manager: 'Marc Dupont', email: 'james@company.com', sent: false },
]

/* ── Manager searchable dropdown ── */
function ManagerDropdown({ userId, current, managers, onChange }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setQ('') } }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const list = managers.filter(m => m.id !== userId && m.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="dd-wrap" ref={ref}>
      <button className="dd-trigger" onClick={() => { setOpen(o => !o); setQ('') }}>
        {current
          ? <span className="manager-tag"><User size={11} />{current}</span>
          : <span className="unassigned">— assign manager —</span>}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="dropdown" style={{ minWidth: 200 }}>
          <input className="dd-search" placeholder="Search managers..." value={q}
            onChange={e => setQ(e.target.value)} autoFocus />
          {list.length > 0
            ? list.map(m => (
              <div key={m.id} className="dd-item"
                onClick={() => { onChange(m.name); setOpen(false); setQ('') }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: avatarColor(m.name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {initials(m.name)}
                </div>
                {m.name}
              </div>
            ))
            : <div className="dd-item empty">No managers found</div>
          }
        </div>
      )}
    </div>
  )
}

/* ── Role dropdown ── */
function RoleDropdown({ current, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div className="dd-wrap" ref={ref}>
      <button className="dd-trigger" onClick={() => setOpen(o => !o)}>
        <span className={`role-pill ${current === 'Manager' ? 'pill-manager' : 'pill-employee'}`}>{current}</span>
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="dropdown" style={{ minWidth: 150 }}>
          {['Manager', 'Employee'].map(r => (
            <div key={r} className="dd-item" onClick={() => { onChange(r); setOpen(false) }}>
              <span className={`role-pill ${r === 'Manager' ? 'pill-manager' : 'pill-employee'}`}
                style={{ fontSize: 11, padding: '2px 8px' }}>{r}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── View Modal ── */
function ViewModal({ user, onClose, onEdit }) {
  return (
    <div className="overlay" onClick={e => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-hl">
            <div className="modal-hicon"><Eye size={18} /></div>
            <div>
              <div className="modal-htitle">User Details</div>
              <div className="modal-hsub">Read-only view</div>
            </div>
          </div>
          <button className="modal-xbtn" onClick={onClose}><X size={13} /></button>
        </div>

        <div className="view-hero">
          <div className="view-avatar" style={{ background: avatarColor(user.name) }}>
            {initials(user.name)}
          </div>
          <div className="view-name">{user.name}</div>
          <div className="view-email">{user.email}</div>
          <span className={`role-pill ${user.role === 'Manager' ? 'pill-manager' : 'pill-employee'}`}
            style={{ marginTop: 4 }}>{user.role}</span>
        </div>

        <div className="view-rows">
          <div className="view-row">
            <span className="view-key">Full Name</span>
            <span className="view-val">{user.name}</span>
          </div>
          <div className="view-row">
            <span className="view-key">Email</span>
            <span className="view-val" style={{ color: '#388087' }}>{user.email}</span>
          </div>
          <div className="view-row">
            <span className="view-key">Role</span>
            <span className="view-val">{user.role}</span>
          </div>
          <div className="view-row">
            <span className="view-key">Manager</span>
            <span className="view-val">{user.manager || '—'}</span>
          </div>
          <div className="view-row">
            <span className="view-key">Password Sent</span>
            <span className="view-val" style={{ color: user.sent ? '#2e7d32' : '#c0504d' }}>
              {user.sent ? 'Yes ✓' : 'Not yet'}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary amber" onClick={() => { onClose(); onEdit(user) }}>
            <Pencil size={13} /> Edit This User
          </button>
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

/* ── Edit Modal ── */
function EditModal({ user, managers, onClose, onSave }) {
  const [form, setForm] = useState({ name: user.name, role: user.role, manager: user.manager || '', email: user.email })
  const [formErr, setFormErr] = useState({})

  const handleSave = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email address is required'
    if (form.role === 'Employee' && !form.manager) errs.manager = 'Please assign a manager'
    setFormErr(errs)
    if (Object.keys(errs).length) return
    onSave({ ...user, name: form.name.trim(), role: form.role, manager: form.role === 'Employee' ? form.manager : null, email: form.email.trim() })
  }

  return (
    <div className="overlay" onClick={e => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-hl">
            <div className="modal-hicon amber"><Pencil size={18} /></div>
            <div>
              <div className="modal-htitle">Edit User</div>
              <div className="modal-hsub">{user.name}</div>
            </div>
          </div>
          <button className="modal-xbtn" onClick={onClose}><X size={13} /></button>
        </div>

        <div className="modal-body">
          <div>
            <div className="field-label">Full Name <span className="req">*</span></div>
            <input className={`field-input${formErr.name ? ' err' : ''}`} placeholder="e.g. John Smith"
              value={form.name}
              onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormErr(f => ({ ...f, name: '' })) }} />
            {formErr.name && <div className="field-err">{formErr.name}</div>}
          </div>

          <div>
            <div className="field-label">Email Address <span className="req">*</span></div>
            <input className={`field-input${formErr.email ? ' err' : ''}`} type="email" placeholder="e.g. john@company.com"
              value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setFormErr(f => ({ ...f, email: '' })) }} />
            {formErr.email && <div className="field-err">{formErr.email}</div>}
          </div>

          <div>
            <div className="field-label">Role <span className="req">*</span></div>
            <div className="role-toggle">
              {['Manager', 'Employee', 'Finance', 'Director'].map(r => (
                <button key={r}
                  className={`role-opt${form.role === r ? ` ${getPillClass(r).replace('pill-', 'sel-')}` : ''}`}
                  onClick={() => { setForm(f => ({ ...f, role: r, manager: '' })); setFormErr(f => ({ ...f, manager: '' })) }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {form.role === 'Employee' && (
            <div>
              <div className="field-label">Assign Manager <span className="req">*</span></div>
              <select className={`field-select${formErr.manager ? ' err' : ''}`}
                value={form.manager}
                onChange={e => { setForm(f => ({ ...f, manager: e.target.value })); setFormErr(f => ({ ...f, manager: '' })) }}>
                <option value="">— Select a manager —</option>
                {managers.filter(m => m.id !== user.id).map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
              {formErr.manager && <div className="field-err">{formErr.manager}</div>}
              <div className="mgr-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>Every employee must have a manager. The manager will review and approve their expense requests.</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary amber" onClick={handleSave}>Save Changes</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

/* ── Add Modal ── */
function AddModal({ managers, onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', role: 'Employee', manager: '', email: '' })
  const [formErr, setFormErr] = useState({})

  const handleAdd = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email address is required'
    if (form.role === 'Employee' && !form.manager) errs.manager = 'Please assign a manager'
    setFormErr(errs)
    if (Object.keys(errs).length) return
    onAdd({ id: Date.now(), name: form.name.trim(), role: form.role, manager: form.role === 'Employee' ? form.manager : null, email: form.email.trim(), sent: false })
  }

  return (
    <div className="overlay" onClick={e => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-hl">
            <div className="modal-hicon"><UserPlus size={18} /></div>
            <div>
              <div className="modal-htitle">Add New User</div>
              <div className="modal-hsub">Manager, Employee, Finance, or Director</div>
            </div>
          </div>
          <button className="modal-xbtn" onClick={onClose}><X size={13} /></button>
        </div>

        <div className="modal-body">
          <div>
            <div className="field-label">Full Name <span className="req">*</span></div>
            <input className={`field-input${formErr.name ? ' err' : ''}`} placeholder="e.g. John Smith"
              value={form.name}
              onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormErr(f => ({ ...f, name: '' })) }} />
            {formErr.name && <div className="field-err">{formErr.name}</div>}
          </div>

          <div>
            <div className="field-label">Email Address <span className="req">*</span></div>
            <input className={`field-input${formErr.email ? ' err' : ''}`} type="email" placeholder="e.g. john@company.com"
              value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setFormErr(f => ({ ...f, email: '' })) }} />
            {formErr.email && <div className="field-err">{formErr.email}</div>}
          </div>

          <div>
            <div className="field-label">Role <span className="req">*</span></div>
            <div className="role-toggle">
              {['Manager', 'Employee', 'Finance', 'Director'].map(r => (
                <button key={r}
                  className={`role-opt${form.role === r ? ` ${getPillClass(r).replace('pill-', 'sel-')}` : ''}`}
                  onClick={() => { setForm(f => ({ ...f, role: r, manager: '' })); setFormErr(f => ({ ...f, manager: '' })) }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {form.role === 'Employee' && (
            <div>
              <div className="field-label">Assign Manager <span className="req">*</span></div>
              <select className={`field-select${formErr.manager ? ' err' : ''}`}
                value={form.manager}
                onChange={e => { setForm(f => ({ ...f, manager: e.target.value })); setFormErr(f => ({ ...f, manager: '' })) }}>
                <option value="">— Select a manager —</option>
                {managers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
              {formErr.manager && <div className="field-err">{formErr.manager}</div>}
              <div className="mgr-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>Every employee must have a manager. The manager will review and approve their expense requests.</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={handleAdd}>Add User</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
export default function ManageUsers() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [addModal, setAddModal] = useState(false)
  const [viewUser, setViewUser] = useState(null)
  const [editUser, setEditUser] = useState(null)
  const [toast, setToast] = useState(null)

  const managers = users.filter(u => u.role === 'Manager')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const sendPassword = id => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, sent: true } : u))
    showToast(`Password sent to ${users.find(u => u.id === id).email}`)
  }

  const changeRole = (id, role) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role, manager: ['Manager', 'Director', 'Finance'].includes(role) ? null : u.manager } : u))

  const changeManager = (id, name) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, manager: name } : u))

  const deleteUser = id => {
    setUsers(prev => prev.filter(u => u.id !== id))
    showToast('User removed successfully')
  }

  const handleAdd = newUser => {
    setUsers(prev => [...prev, newUser])
    setAddModal(false)
    showToast(`${newUser.name} added successfully`)
  }

  const handleSave = updated => {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    setEditUser(null)
    showToast(`${updated.name} updated successfully`)
  }

  return (
    <>
      <style>{css}</style>
      <div className="pg-wrap">

        {/* Modals */}
        {addModal && <AddModal managers={managers} onClose={() => setAddModal(false)} onAdd={handleAdd} />}
        {viewUser && <ViewModal user={viewUser} onClose={() => setViewUser(null)} onEdit={u => setEditUser(u)} />}
        {editUser && <EditModal user={editUser} managers={managers} onClose={() => setEditUser(null)} onSave={handleSave} />}

        {/* Page header */}
        <div className="pg-header">
          <div>
            <div className="pg-title">Manage <span>Users</span></div>
            <div className="pg-sub">Add managers &amp; employees — employees must have a manager assigned</div>
          </div>
          <div className="toolbar">
            <div className="search-wrap">
              <Search size={14} />
              <input className="search-input" placeholder="Search users..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn-new" onClick={() => setAddModal(true)}>
              <Plus size={14} /> New User
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Total Users</div>
            <div className="stat-val">{users.length}<span>total</span></div>
          </div>
          <div className="stat">
            <div className="stat-label">Managers</div>
            <div className="stat-val">{managers.length}<span>managers</span></div>
          </div>
          <div className="stat">
            <div className="stat-label">Employees</div>
            <div className="stat-val">{users.filter(u => u.role === 'Employee').length}<span>employees</span></div>
          </div>
          <div className="stat">
            <div className="stat-label">Finance</div>
            <div className="stat-val">{users.filter(u => u.role === 'Finance').length}<span>finance</span></div>
          </div>
          <div className="stat">
            <div className="stat-label">Directors</div>
            <div className="stat-val">{users.filter(u => u.role === 'Director').length}<span>directors</span></div>
          </div>
          <div className="stat">
            <div className="stat-label">Unassigned</div>
            <div className="stat-val">{users.filter(u => u.role === 'Employee' && !u.manager).length}<span>pending</span></div>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Manager</th>
                  <th>Email</th>
                  <th>Send Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <div className="empty-icon"><Users size={22} /></div>
                        <div className="empty-title">No users found</div>
                        <div className="empty-sub">Try a different search or add a new user.</div>
                      </div>
                    </td>
                  </tr>
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
                      <RoleDropdown current={user.role} onChange={role => changeRole(user.id, role)} />
                    </td>
                    <td>
                      {user.role === 'Employee'
                        ? <ManagerDropdown userId={user.id} current={user.manager} managers={managers}
                          onChange={name => changeManager(user.id, name)} />
                        : <span style={{ fontSize: 12, color: '#c8dde0' }}>—</span>
                      }
                    </td>
                    <td>
                      <span style={{ fontSize: 12.5, color: '#388087' }}>{user.email}</span>
                    </td>
                    <td>
                      <button className={`send-btn${user.sent ? ' sent' : ''}`}
                        onClick={() => !user.sent && sendPassword(user.id)}>
                        <Send size={12} />
                        {user.sent ? 'Sent ✓' : 'Send Password'}
                      </button>
                    </td>
                    <td>
                      <div className="action-group">
                        <button className="view-btn" title="View" onClick={() => setViewUser(user)}>
                          <Eye size={14} />
                        </button>
                        <button className="edit-btn" title="Edit" onClick={() => setEditUser(user)}>
                          <Pencil size={14} />
                        </button>
                        <button className="del-btn" title="Delete" onClick={() => deleteUser(user.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="toast">
            <div className="toast-dot" />
            {toast}
          </div>
        )}

      </div>
    </>
  )
}