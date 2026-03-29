import { useState, useEffect } from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, FileText, ChevronRight, Check, X, User, Hash, TrendingUp, AlertCircle, Info } from 'lucide-react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  .man-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
  .man-wrap { font-family: 'Poppins', sans-serif; background: #f4f8f9; min-height: 100vh; padding: 24px; }

  /* ── Header ── */
  .man-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
  .man-title { font-size: 22px; font-weight: 700; color: #17252A; }
  .man-title span { color: #388087; }
  .man-sub { font-size: 13px; color: #7aa8ae; margin-top: 2px; }

  /* ── Summary Stats ── */
  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 24px; }
  .summary-card {
    background: #fff; border-radius: 18px; padding: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 12px rgba(56,128,135,0.05);
    display: flex; align-items: center; gap: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .summary-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(56,128,135,0.08); }
  .summary-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .summary-label { font-size: 12px; font-weight: 600; color: #7aa8ae; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-val { font-size: 24px; font-weight: 700; color: #17252A; }

  /* Icon Colors */
  .ic-pending { background: rgba(212,134,10,0.1); color: #d4860a; }
  .ic-approved { background: rgba(56,128,135,0.1); color: #388087; }
  .ic-rejected { background: rgba(181,74,74,0.1); color: #b54a4a; }

  /* ── Controls Section ── */
  .man-controls { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
  .tabs-row { display: flex; align-items: center; border-bottom: 1.5px solid rgba(111,179,184,0.13); }
  .tabs { display: flex; gap: 28px; }
  .tab-btn {
    padding: 10px 4px 14px; border: none; background: none; cursor: pointer;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: #7aa8ae;
    position: relative; transition: all 0.2s;
  }
  .tab-btn:hover { color: #388087; }
  .tab-btn.active { color: #17252A; }
  .tab-btn.active::after {
    content: ''; position: absolute; bottom: -1.5px; left: 0; right: 0;
    height: 3px; background: #388087; border-radius: 3px 3px 0 0;
  }
  .tab-count { margin-left: 6px; font-size: 11px; padding: 1px 6px; border-radius: 6px; background: rgba(111,179,184,0.12); color: #17252A; }

  .search-wrap { position: relative; width: 100%; }
  .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #7aa8ae; width: 15px; }
  .search-input {
    width: 100%; padding: 11px 12px 11px 40px; border-radius: 12px;
    border: 1.5px solid rgba(111,179,184,0.2); background: #fff;
    font-family: 'Poppins', sans-serif; font-size: 13.5px; color: #17252A; outline: none; transition: all 0.15s;
  }
  .search-input:focus { border-color: #6FB3B8; box-shadow: 0 0 0 4px rgba(111,179,184,0.06); }

  /* ── Table Area ── */
  .table-card {
    background: #fff; border-radius: 20px;
    border: 1.5px solid rgba(111,179,184,0.13);
    box-shadow: 0 4px 20px rgba(56,128,135,0.06); overflow: hidden;
  }
  .table-wrap { overflow-x: auto; }
  .tbl { width: 100%; border-collapse: collapse; min-width: 900px; }
  .tbl thead tr { background: rgba(111,179,184,0.05); }
  .tbl th { padding: 14px 20px; text-align: left; font-size: 12px; font-weight: 600; color: #7aa8ae; letter-spacing: 0.5px; text-transform: uppercase; }
  .tbl td { padding: 18px 20px; border-bottom: 1.2px solid rgba(111,179,184,0.08); vertical-align: middle; }

  .emp-cell { display: flex; align-items: center; gap: 12px; }
  .emp-avatar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #17252A, #388087); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; }
  .emp-name { font-size: 14px; font-weight: 600; color: #17252A; }
  .emp-id { font-size: 11px; color: #7aa8ae; margin-top: 1px; }

  .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .st-pending  { background: #FFF8E6; color: #B07A00; }
  .st-approved { background: #E8F7EC; color: #2E7D4F; }
  .st-rejected { background: #fee2e2; color: #ef4444; }

  /* Approval Sequence Badges */
  .seq-badge {
    display: inline-flex; align-items: center; gap: 5px; background: #f0f7f8;
    color: #388087; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;
  }

  .action-btns { display: flex; gap: 8px; }
  .btn-ic {
    width: 32px; height: 32px; border-radius: 8px; border: 1.2px solid #e0eef0;
    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
    background: #fff; color: #7aa8ae;
  }
  .btn-ic:hover { border-color: #388087; color: #388087; background: #f0f7f8; }
  .btn-ic.btn-yes:hover { border-color: #2E7D4F; color: #fff; background: #2E7D4F; }
  .btn-ic.btn-no:hover { border-color: #ef4444; color: #fff; background: #ef4444; }

  /* ── Modals ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(23,37,42,0.4); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  .modal {
    background: #fff; border-radius: 24px; width: 100%; max-width: 440px;
    box-shadow: 0 24px 64px rgba(23,37,42,0.2); overflow: hidden;
  }
  .modal-body { padding: 32px; }
  .modal-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .modal-title { font-size: 18px; font-weight: 700; color: #17252A; text-align: center; margin-bottom: 8px; }
  .modal-desc { font-size: 13.5px; color: #7aa8ae; text-align: center; line-height: 1.6; margin-bottom: 24px; }

  .remark-area {
    width: 100%; height: 100px; padding: 14px; border-radius: 14px;
    border: 1.5px solid #e0eef0; font-family: inherit; font-size: 13.5px;
    outline: none; resize: none; transition: 0.15s; background: #fafcfe;
  }
  .remark-area:focus { border-color: #388087; background: #fff; box-shadow: 0 0 0 4px rgba(56,128,135,0.06); }

  .modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .btn { padding: 12px; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; border: none; }
  .btn-primary { background: linear-gradient(135deg, #17252A, #388087); color: #fff; box-shadow: 0 4px 12px rgba(23,37,42,0.15); }
  .btn-ghost { background: transparent; border: 1.5px solid #e0eef0; color: #7aa8ae; }
`

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [selectedReq, setSelectedReq] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [remark, setRemark] = useState('');

  const fetchTasks = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/expenses/tasks", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await resp.json();
      if (resp.ok) setRequests(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const stats = {
    pending: requests.length,
    approved: 0, // In this session, focusing on pending tasks. Approver history can be added later.
    rejected: 0,
  };

  const filtered = requests.filter(req => {
    return (req.employeeName || '').toLowerCase().includes(search.toLowerCase()) || (req.id || '').toString().includes(search);
  });

  const openModal = (req, type) => {
    setSelectedReq(req);
    setModalType(type);
    setRemark('');
  };

  const handleAction = async () => {
    try {
      const payload = {
        stepId: selectedReq.id,
        expenseId: selectedReq.expenseId,
        decision: modalType === 'approve' ? 'approved' : 'rejected',
        comment: remark,
        totalSteps: selectedReq.totalSteps,
        stepsVerified: selectedReq.stepsVerified
      };

      console.log('Sending approval request:', payload);

      const resp = await fetch("http://localhost:5000/api/expenses/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();

      if (resp.ok) {
        console.log('Approval successful:', data);
        alert(data.message || 'Action completed successfully');
        setModalType(null);
        setRemark('');
        fetchTasks();
      } else {
        console.error('Approval failed:', data);
        alert('Error: ' + (data.message || 'Failed to process request'));
      }
    } catch (err) {
      console.error('Request error:', err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="man-wrap">

        {/* Header */}
        <div className="man-header">
          <div>
            <div className="man-title">Department <span>Requests</span></div>
            <div className="man-sub">Review and approve expenses from your team</div>
          </div>
        </div>

        {/* Stats */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon ic-pending"><Clock size={20} /></div>
            <div className="summary-info"><div className="summary-label">Awaiting My Action</div><div className="summary-val">{stats.pending}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-approved"><CheckCircle size={20} /></div>
            <div className="summary-info"><div className="summary-label">Approved by Me</div><div className="summary-val">{stats.approved}</div></div>
          </div>
          <div className="summary-card">
            <div className="summary-icon ic-rejected"><XCircle size={20} /></div>
            <div className="summary-info"><div className="summary-label">Rejected at Source</div><div className="summary-val">{stats.rejected}</div></div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="man-controls">
          <div className="tabs-row">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
                Pending <span className="tab-count">{stats.pending}</span>
              </button>
              <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                History <span className="tab-count">{stats.approved + stats.rejected}</span>
              </button>
            </div>
          </div>
          <div className="search-wrap">
            <Search />
            <input
              className="search-input"
              placeholder="Search by Employee name or Request ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee</th>
                  <th>Amount</th>
                  <th>Workflow Step</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(req => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 700, color: '#388087' }}>EXP-{req.expenseId}</td>
                    <td>
                      <div className="emp-cell">
                        <div className="emp-avatar">{(req.employeeName || 'U').split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <div className="emp-name">{req.employeeName}</div>
                          <div className="emp-id">User ID: {req.assignedUserId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '15px' }}>₹{Number(req.amount).toLocaleString()}</td>
                    <td>
                      <div className="seq-badge">
                        <User size={12} />
                        Step {req.stepNumber}: {req.role}
                      </div>
                    </td>
                    <td style={{ fontSize: '13px', color: '#7aa8ae' }}>Today</td>
                    <td>
                      <span className="status-pill st-pending">
                        Your Turn
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-ic btn-yes" title="Approve" onClick={() => openModal(req, 'approve')}><Check size={16} /></button>
                        <button className="btn-ic btn-no" title="Reject" onClick={() => openModal(req, 'reject')}><X size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {modalType && (
          <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && setModalType(null)}>
            <div className="modal">
              <div className="modal-body">
                {modalType === 'approve' && (
                  <>
                    <div className="modal-icon" style={{ background: 'rgba(46,125,79,0.1)', color: '#2E7D4F' }}><CheckCircle size={32} /></div>
                    <div className="modal-title">Approve Expense</div>
                    <div className="modal-desc">Are you sure you want to approve this request of <b>₹{Number(selectedReq?.amount).toLocaleString()}</b> for <b>{selectedReq?.employeeName}</b>? It will move to the next stage.</div>
                  </>
                )}

                {modalType === 'reject' && (
                  <>
                    <div className="modal-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}><AlertCircle size={32} /></div>
                    <div className="modal-title">Reject Expense</div>
                    <div className="modal-desc">Please provide a reason for rejecting the claim by <b>{selectedReq?.employeeName}</b>. This is mandatory for employee clarity.</div>
                  </>
                )}

                {(modalType === 'approve' || modalType === 'reject') && (
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ marginBottom: '8px', display: 'block' }}>Remark / Comments</label>
                    <textarea
                      className="remark-area"
                      placeholder="Add your comments here..."
                      value={remark}
                      onChange={e => setRemark(e.target.value)}
                    />
                  </div>
                )}

                {modalType === 'details' && (
                  <>
                    <div className="modal-icon" style={{ background: '#f0f7f8', color: '#17252A' }}><Info size={32} /></div>
                    <div className="modal-title">Request Details</div>
                    <div className="modal-desc" style={{ textAlign: 'left', marginBottom: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                        <div><b>Employee:</b> {selectedReq?.employeeName}</div>
                        <div><b>Amount:</b> ₹{Number(selectedReq?.amount).toLocaleString()}</div>
                        <div><b>Type:</b> {selectedReq?.expenseType}</div>
                        <div><b>Step:</b> {selectedReq?.stepNumber} of {selectedReq?.totalSteps}</div>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <b>Description:</b>
                        <div style={{ fontSize: '12px', color: '#7aa8ae', marginTop: '6px' }}>{selectedReq?.description}</div>
                      </div>
                    </div>
                  </>
                )}

                <div className="modal-actions">
                  <button className="btn btn-ghost" onClick={() => setModalType(null)}>Close</button>
                  {modalType !== 'details' && (
                    <button
                      className="btn btn-primary"
                      disabled={modalType === 'reject' && !remark.trim()}
                      onClick={handleAction}
                    >
                      Confirm {modalType}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Request
