import { useState, useEffect } from 'react'
import { Search, CheckCircle, XCircle, Clock, Eye, FileText, Check, X, Calendar, Hash, ArrowRight, User as UserIcon } from 'lucide-react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  .req-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .req-wrap { font-family: 'Poppins', sans-serif; background: #f4f8f9; min-height: 100vh; padding: 24px; }
  .req-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
  .req-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .req-title span { color: #388087; }
  .req-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }
  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .summary-card { background: #fff; border-radius: 18px; padding: 18px; border: 1.5px solid rgba(111,179,184,0.13); display: flex; align-items: center; gap: 14px; }
  .summary-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .summary-label { font-size: 11px; font-weight: 600; color: #7aa8ae; text-transform: uppercase; }
  .summary-val { font-size: 20px; font-weight: 700; color: #17252A; }
  .ic-all { background: rgba(23,37,42,0.08); color: #17252A; }
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }
  .req-controls { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
  .tabs-row { display: flex; align-items: center; border-bottom: 1.5px solid rgba(111,179,184,0.13); }
  .tabs { display: flex; gap: 24px; }
  .tab-btn { padding: 8px 2px 12px; border: none; background: none; cursor: pointer; font-family: inherit; font-size: 13.5px; font-weight: 600; color: #7aa8ae; position: relative; }
  .tab-btn.active { color: #17252A; }
  .tab-btn.active::after { content: ''; position: absolute; bottom: -1.5px; left: 0; right: 0; height: 3px; background: #388087; border-radius: 3px 3px 0 0; }
  .search-wrap { position: relative; width: 100%; max-width: 320px; }
  .search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 14px; color: #7aa8ae; }
  .search-input { width: 100%; padding: 9px 12px 9px 34px; border-radius: 10px; border: 1.5px solid rgba(111,179,184,0.22); outline: none; font-size: 13px; }
  .table-card { background: #fff; border-radius: 20px; border: 1.5px solid rgba(111,179,184,0.13); overflow: hidden; }
  .tbl { width: 100%; border-collapse: collapse; }
  .tbl th { padding: 12px 20px; text-align: left; font-size: 11px; font-weight: 600; color: #7aa8ae; text-transform: uppercase; background: #f9fbfc; }
  .tbl td { padding: 14px 20px; border-bottom: 1px solid rgba(111,179,184,0.08); font-size: 13.5px; }
  .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .st-pending { background: rgba(212,134,10,0.1); color: #B07C00; }
  .st-active  { background: rgba(56,128,135,0.1);  color: #388087; }
  .st-approved { background: #E8F7EC; color: #2E7D4F; }
  .st-rejected { background: #fee2e2; color: #ef4444; }
  .btn-icon { width: 32px; height: 32px; border-radius: 8px; border: 1.2px solid #e2eef0; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #7aa8ae; background: #fff; }
  .btn-icon:hover { border-color: #388087; color: #388087; background: #f4f9f9; }
  .btn-seq { padding: 6px 12px; border-radius: 8px; border: none; background: #388087; color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; }

  .overlay { position: fixed; inset: 0; z-index: 200; background: rgba(23,37,42,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 16px; }
  .modal { background: #fff; border-radius: 24px; width: 100%; max-width: 480px; box-shadow: 0 32px 64px rgba(0,0,0,0.15); overflow: hidden; }
  .modal-h { padding: 20px 24px; border-bottom: 1px solid #f0f4f5; display: flex; align-items: center; justify-content: space-between; }
  .modal-b { padding: 24px; }
  .step-box { background: #f8fbfa; border: 1px solid #eef3f4; border-radius: 12px; padding: 14px; margin-bottom: 12px; }
  .step-n { font-size: 11px; font-weight: 700; color: #388087; text-transform: uppercase; margin-bottom: 8px; }
  .sel { width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid #e2eef0; font-size: 13px; outline: none; }
`;

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [seqModal, setSeqModal] = useState(null); 

  const fetchAll = async () => {
    try {
      const auth = { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } };
      const [rResp, uResp] = await Promise.all([
        fetch("http://localhost:5000/api/expenses/all", auth),
        fetch("http://localhost:5000/api/users", auth)
      ]);
      if (rResp.ok) setRequests(await rResp.json());
      if (uResp.ok) setAvailableUsers(await uResp.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const filtered = requests.filter(r => {
    const isHistory = activeTab === 'history';
    const matchStatus = isHistory ? (r.status === 'approved' || r.status === 'rejected') : (r.status === 'pending' || r.status === 'active');
    return matchStatus && (r.employeeName || '').toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <style>{css}</style>
      <div className="req-wrap">
        <div className="req-header">
           <div><div className="req-title">System <span>Requests</span></div><div className="req-sub">Admin control panel for workflow management</div></div>
        </div>

        <div className="summary-grid">
          {[['Total', stats.total, <Hash/>, 'ic-all'], ['Pending', stats.pending, <Clock/>, 'ic-pending'], ['Approved', stats.approved, <CheckCircle/>, 'ic-approved'], ['Rejected', stats.rejected, <XCircle/>, 'ic-rejected']].map(([l,v,i,c]) => (
            <div className="summary-card" key={l}>
              <div className={`summary-icon ${c}`}>{i}</div>
              <div><div className="summary-label">{l}</div><div className="summary-val">{v}</div></div>
            </div>
          ))}
        </div>

        <div className="req-controls">
          <div className="tabs-row">
            <div className="tabs">
              <button className={`tab-btn ${activeTab==='pending'?'active':''}`} onClick={()=>setActiveTab('pending')}>Queue</button>
              <button className={`tab-btn ${activeTab==='history'?'active':''}`} onClick={()=>setActiveTab('history')}>Completed</button>
            </div>
          </div>
          <div className="search-wrap"><Search/><input className="search-input" placeholder="Filter by employee name..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        </div>

        <div className="table-card">
          <table className="tbl">
            <thead><tr><th>Reference</th><th>Employee</th><th>Type</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{fontWeight:600,color:'#388087'}}>EXP-{r.id}</td>
                  <td><div><div style={{fontWeight:600}}>{r.employeeName}</div><div style={{fontSize:11,color:'#7aa8ae'}}>{r.employeeEmail}</div></div></td>
                  <td><span className="category-pill" style={{padding:'4px 8px',background:'#f0f7f8',borderRadius:6,fontSize:12}}>{r.type}</span></td>
                  <td style={{fontWeight:700}}>₹{Number(r.amount).toLocaleString()}</td>
                  <td><span className={`status-badge st-${r.status}`}>{r.status}</span></td>
                  <td>
                    {r.status === 'pending' ? (
                      <button className="btn-seq" onClick={()=>setSeqModal(r)}>Define Workflow <ArrowRight size={12}/></button>
                    ) : (
                      <button className="btn-icon" onClick={() => alert("Details coming soon")}>
                        <Eye size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {seqModal && (
          <SequenceModal 
            expense={seqModal} 
            users={availableUsers} 
            onClose={() => setSeqModal(null)} 
            onSave={fetchAll} 
          />
        )}
      </div>
    </>
  );
}

function SequenceModal({ expense, users, onClose, onSave }) {
    const [steps, setSteps] = useState([
        { stepNumber: 1, role: 'manager', assignedUserId: '' },
        { stepNumber: 2, role: 'finance', assignedUserId: '' },
        { stepNumber: 3, role: 'director', assignedUserId: '' }
    ]);

    const handleSave = async () => {
        if (steps.some(s => !s.assignedUserId)) return alert("Please assign all users in the sequence");
        try {
            const resp = await fetch("http://localhost:5000/api/expenses/sequence", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify({ expenseId: expense.id, steps })
            });
            if (resp.ok) { onSave(); onClose(); }
            else {
                const err = await resp.json();
                alert(err.message || "Failed to define workflow");
            }
        } catch (err) { alert("Network error: " + err.message); }
    };

    return (
        <div className="overlay" onClick={e => e.target.classList.contains('overlay') && onClose()}>
            <div className="modal">
                <div className="modal-h">
                    <span style={{fontWeight:700}}>Define Approval Sequence</span>
                    <button className="btn-icon" onClick={onClose}><X size={16}/></button>
                </div>
                <div className="modal-b">
                    <p style={{fontSize:13,color:'#7aa8ae',marginBottom:20}}>Select team members responsible for approving <b>EXP-{expense.id}</b>.</p>
                    {steps.map((s, i) => (
                        <div key={i} className="step-box">
                            <div className="step-n">Step {s.stepNumber}: {s.role}</div>
                            <select className="sel" value={s.assignedUserId} onChange={e => {
                                const next = [...steps];
                                next[i].assignedUserId = e.target.value;
                                setSteps(next);
                            }}>
                                <option value="">Select Approver</option>
                                {users.filter(u => u.role?.toLowerCase() === s.role?.toLowerCase()).map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                            </select>
                        </div>
                    ))}
                    <button className="btn-seq" style={{width:'100%',justifyContent:'center',padding:12,marginTop:12}} onClick={handleSave}>Activate Workflow</button>
                </div>
            </div>
        </div>
    );
}