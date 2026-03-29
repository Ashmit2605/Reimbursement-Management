import { useState, useRef, useEffect } from "react";
import { Plus, Upload, X, ChevronRight, Clock, CheckCircle, FileText, Eye, Trash2, Paperclip } from "lucide-react";

const C = {
  dark: "#388087",
  mid: "#6FB3B8",
  light: "#BADFE7",
  pale: "#C2EDCE",
  navy: "#17252A",
};

const CURRENCIES = ["INR ₹", "USD $", "EUR €", "GBP £", "AED د.إ", "JPY ¥", "CAD $", "AUD $"];
const CATEGORIES = ["Food", "Travel", "Accommodation", "Office Supplies", "Software", "Equipment", "Marketing", "Other"];
const PAID_BY = ["Self", "Company Card", "Petty Cash", "Bank Transfer"];

const INIT = [
  { id: 1, employee: "Sarah", description: "Restaurant bill", date: "4th Oct, 2025", category: "Food", paidBy: "Sarah", remarks: "Team lunch", amount: 5000, currency: "INR ₹", status: "Draft", approvals: [] },
  { id: 2, employee: "Sarah", description: "Flight tickets", date: "6th Oct, 2025", category: "Travel", paidBy: "Company Card", remarks: "Client visit", amount: 567, currency: "USD $", status: "Submitted", approvals: [{ approver: "Manager", status: "Pending", time: "" }] },
  { id: 3, employee: "Sarah", description: "Hotel stay", date: "7th Oct, 2025", category: "Accommodation", paidBy: "Self", remarks: "Conference", amount: 320, currency: "USD $", status: "Approved", approvals: [{ approver: "John", status: "Approved", time: "12:44 7th Oct, 2025" }] },
];

const SM = {
  Draft: { color: "#888", bg: "rgba(136,136,136,0.1)" },
  Submitted: { color: "#d4860a", bg: "rgba(212,134,10,0.1)" },
  Approved: { color: "#2d7a5a", bg: "rgba(45,122,90,0.1)" },
  Rejected: { color: "#b54a4a", bg: "rgba(181,74,74,0.1)" },
};

const sumBy = (arr, st) => arr.filter(e => e.status === st).reduce((a, b) => a + b.amount, 0);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Poppins',sans-serif; background:#f4f8f9; color:#17252A; min-height:100vh; }

  .page { min-height:100vh; background:#f4f8f9; padding:28px 20px 48px; }
  .inner { max-width:1100px; margin:0 auto; }

  .ph { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:26px; }
  .pt { font-size:22px; font-weight:700; color:#17252A; letter-spacing:-0.3px; }
  .pt span { color:#388087; }
  .psub { font-size:12px; color:#7aa8ae; margin-top:2px; }
  .hbtns { display:flex; gap:10px; flex-wrap:wrap; }

  .srow { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:26px; }
  .sc {
    background:#fff; border-radius:14px; padding:18px 20px;
    box-shadow:0 1px 3px rgba(56,128,135,0.06),0 4px 16px rgba(56,128,135,0.06);
    border:1px solid rgba(111,179,184,0.13);
    display:flex; align-items:center; gap:14px;
  }
  .si { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .si svg { width:20px; height:20px; }
  .sl { font-size:11px; font-weight:600; color:#7aa8ae; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }
  .sv { font-size:20px; font-weight:700; color:#17252A; letter-spacing:-0.5px; }
  .sa { display:flex; align-items:center; gap:3px; font-size:11px; color:#aac5c8; margin-top:3px; }

  .tc {
    background:#fff; border-radius:16px;
    box-shadow:0 1px 3px rgba(56,128,135,0.06),0 4px 20px rgba(56,128,135,0.06);
    border:1px solid rgba(111,179,184,0.13); overflow:hidden;
  }
  .tt { padding:16px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f0f5f6; flex-wrap:wrap; gap:10px; }
  .ttl { font-size:14px; font-weight:600; color:#17252A; }

  .tbl { width:100%; border-collapse:collapse; }
  .tbl th { padding:11px 16px; text-align:left; font-size:10.5px; font-weight:700; letter-spacing:0.7px; text-transform:uppercase; color:#7aa8ae; background:#f9fdfd; border-bottom:1px solid #f0f5f6; white-space:nowrap; }
  .tbl td { padding:13px 16px; font-size:13px; color:#17252A; border-bottom:1px solid #f7fafa; vertical-align:middle; }
  .tbl tr:last-child td { border-bottom:none; }
  .tbl tr { cursor:pointer; transition:background 0.13s; }
  .tbl tr:hover td { background:#f9fdfd; }
  .amt { font-weight:600; }

  .badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:20px; font-size:11.5px; font-weight:600; white-space:nowrap; }
  .bdot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  .empty td { text-align:center; padding:48px; color:#aac5c8; font-size:13px; }

  .btn { display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; border:none; font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.16s ease; white-space:nowrap; }
  .btn svg { width:15px; height:15px; flex-shrink:0; }
  .bp { background:linear-gradient(135deg,#17252A,#388087); color:#fff; box-shadow:0 3px 12px rgba(23,37,42,0.18); }
  .bp:hover { transform:translateY(-1px); box-shadow:0 5px 18px rgba(23,37,42,0.24); }
  .bo { background:#fff; color:#388087; border:1.5px solid #6FB3B8; }
  .bo:hover { background:rgba(111,179,184,0.07); transform:translateY(-1px); }
  .bg { background:transparent; color:#7aa8ae; border:1.5px solid #e2eef0; font-size:12px; }
  .bg:hover { border-color:#6FB3B8; color:#388087; }
  .bd { background:#fff0f0; color:#c0504d; border:1.5px solid #f5c6c6; }
  .bd:hover { background:#ffe0e0; }

  .overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(23,37,42,0.38);
    backdrop-filter:blur(7px) saturate(0.9);
    display:flex; align-items:center; justify-content:center;
    padding:16px; animation:fIn 0.18s ease;
  }
  @keyframes fIn { from{opacity:0} to{opacity:1} }

  .modal {
    background:#fff; border-radius:20px; width:100%; max-width:660px;
    max-height:92vh; overflow-y:auto;
    box-shadow:0 24px 64px rgba(23,37,42,0.22),0 0 0 1px rgba(111,179,184,0.16);
    animation:sUp 0.2s ease; position:relative;
  }
  @keyframes sUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }

  .mh {
    padding:22px 26px 16px; border-bottom:1px solid #f0f5f6;
    display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
    position:sticky; top:0; background:#fff; z-index:3; border-radius:20px 20px 0 0;
  }
  .mt { font-size:17px; font-weight:700; color:#17252A; letter-spacing:-0.2px; }
  .ms { font-size:12px; color:#7aa8ae; margin-top:2px; }
  .mx { width:32px; height:32px; border-radius:8px; border:none; background:#f4f8f9; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background 0.13s; color:#7aa8ae; }
  .mx:hover { background:#ffe0e0; color:#c0504d; }
  .mx svg { width:16px; height:16px; }

  .trail {
    display:flex; align-items:center; gap:6px; padding:12px 26px;
    background:#f9fdfd; border-bottom:1px solid #f0f5f6; flex-wrap:wrap;
    font-size:11.5px; font-weight:600;
  }
  .ts { color:#c8dde0; }
  .ts.on { color:#388087; }
  .ts.dn { color:#2d7a5a; }
  .ta { color:#dde8ea; }

  .rzone {
    margin:18px 26px 0;
    border:2px dashed rgba(111,179,184,0.3); border-radius:12px; padding:18px;
    display:flex; align-items:center; justify-content:space-between; gap:12px;
    cursor:pointer; transition:all 0.16s; flex-wrap:wrap; background:rgba(186,223,231,0.04);
  }
  .rzone:hover { border-color:#6FB3B8; background:rgba(111,179,184,0.05); }
  .rl { display:flex; align-items:center; gap:12px; }
  .ri { width:38px; height:38px; border-radius:10px; background:rgba(111,179,184,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ri svg { width:17px; height:17px; color:#388087; }
  .rtxt { font-size:13px; font-weight:500; color:#17252A; }
  .rh { font-size:11px; color:#aac5c8; margin-top:2px; }

  .mb { padding:20px 26px 22px; }
  .fgrid { display:grid; grid-template-columns:1fr 1fr; gap:13px 16px; }
  .fgrid .full { grid-column:1/-1; }
  .flbl { display:block; font-size:11.5px; font-weight:600; color:#17252A; margin-bottom:5px; }
  .fi, .fsel, .fta {
    width:100%; padding:10px 13px; border-radius:9px; border:1.5px solid #e2eef0;
    background:#f9fdfd; font-family:'Poppins',sans-serif; font-size:13px; color:#17252A; outline:none; transition:all 0.15s;
  }
  .fi::placeholder, .fta::placeholder { color:#b0cdd1; }
  .fi:focus, .fsel:focus, .fta:focus { border-color:#6FB3B8; background:#fff; box-shadow:0 0 0 3px rgba(111,179,184,0.11); }
  .fsel { appearance:none; cursor:pointer; padding-right:32px;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%236FB3B8' d='M5 7L1 3h8z'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 12px center;
  }
  .fta { resize:vertical; min-height:68px; }
  .arow { display:flex; gap:10px; }
  .arow .fsel { width:128px; flex-shrink:0; }

  .rnote { font-size:11px; color:#aac5c8; margin-top:5px; line-height:1.5; }

  .rof { display:block; }
  .rlab { font-size:10.5px; font-weight:700; color:#7aa8ae; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:3px; }
  .rval { font-size:14px; font-weight:500; color:#17252A; }

  .alog { margin-top:20px; }
  .algt { font-size:10.5px; font-weight:700; color:#7aa8ae; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:10px; }
  .alr { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:10px; background:#f9fdfd; border:1px solid #f0f5f6; margin-bottom:7px; flex-wrap:wrap; gap:8px; }
  .ala { font-size:13px; font-weight:500; }
  .alt { font-size:11px; color:#aac5c8; }

  .mf { padding:14px 26px; border-top:1px solid #f0f5f6; display:flex; align-items:center; justify-content:flex-end; gap:10px; position:sticky; bottom:0; background:#fff; border-radius:0 0 20px 20px; flex-wrap:wrap; }

  @media (max-width:700px) {
    .srow { grid-template-columns:1fr; }
    .fgrid { grid-template-columns:1fr; }
    .fgrid .full { grid-column:1; }
    .tbl th:nth-child(3),.tbl td:nth-child(3),
    .tbl th:nth-child(5),.tbl td:nth-child(5),
    .tbl th:nth-child(6),.tbl td:nth-child(6) { display:none; }
    .mh,.mb,.mf { padding-left:18px; padding-right:18px; }
    .rzone { margin-left:18px; margin-right:18px; }
    .trail { padding:10px 18px; }
    .page { padding:16px 14px 36px; }
    .pt { font-size:18px; }
    .modal { max-height:96vh; }
  }
  @media (max-width:440px) {
    .tbl th:nth-child(4),.tbl td:nth-child(4) { display:none; }
  }
`;

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [receipt, setReceipt] = useState("");
  const [form, setForm] = useState({ description: "", date: "", category: "", paidBy: "", currency: "INR ₹", amount: "", remarks: "" });
  const fileRef = useRef();

  const fetchExpenses = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/expenses/me", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await resp.json();
      if (resp.ok) setExpenses(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const resetForm = () => { setForm({ description: "", date: "", category: "", paidBy: "", currency: "INR ₹", amount: "", remarks: "" }); setReceipt(""); };
  const openNew = () => { resetForm(); setModal("new"); };
  const openDetail = (e) => { setModal({ ...e }); setReceipt(""); };
  const close = () => { setModal(null); resetForm(); };

  const fv = (key) => modal === "new" ? form[key] : modal?.[key] ?? "";
  const fc = (key) => (val) => {
    if (modal === "new") setForm(f => ({ ...f, [key]: val }));
    else setModal(m => ({ ...m, [key]: val }));
  };

  const save = async (draft) => {
    if (!fv("description") || !fv("amount")) return;

    setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          type: fv("category") || "Other",
          description: fv("description"),
          amount: parseFloat(fv("amount")),
          expenseDate: fv("date") || new Date().toISOString().split('T')[0],
          categoryPaidBy: fv("paidBy"),
          remarks: fv("remarks"),
          currency: fv("currency") || "INR ₹"
        })
      });

      if (resp.ok) {
        const result = await resp.json();
        console.log("Expense created:", result);
        fetchExpenses();
        close();
      } else {
        const error = await resp.json();
        alert("Failed to submit expense: " + (error.message || "Unknown error"));
        console.error("Error response:", error);
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("Error submitting expense: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = (id) => {
    // Already handled by initial post in this logic, but can be used for drafts if implemented
    close();
  };

  const del = (id) => { setExpenses(p => p.filter(e => e.id !== id)); close(); };

  const isDraft = modal && modal !== "new" && modal.status === "Draft";
  const isReadonly = modal && modal !== "new" && modal.status !== "Draft";

  const steps = ["Draft", "Submitted", "Approved"];
  const curStep = modal === "new" ? "Draft" : modal?.status || "Draft";
  const curIdx = steps.indexOf(curStep);

  return (
    <>
      <style>{css}</style>

      {modal && (
        <div className="overlay" onClick={e => { if (e.target.classList.contains("overlay")) close(); }}>
          <div className="modal">

            {/* Header */}
            <div className="mh">
              <div>
                <div className="mt">{modal === "new" ? "New Expense" : modal.description}</div>
                <div className="ms">{modal === "new" ? "Fill in your expense details below" : `${modal.category} · ${modal.date}`}</div>
              </div>
              <button className="mx" onClick={close}><X /></button>
            </div>

            {/* Status trail */}
            <div className="trail">
              {steps.map((s, i) => (
                <span key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className={`ts${i === curIdx ? " on" : i < curIdx ? " dn" : ""}`}>{s}</span>
                  {i < steps.length - 1 && <span className="ta">›</span>}
                </span>
              ))}
            </div>

            {/* Receipt upload */}
            <div className="rzone" onClick={() => !isReadonly && fileRef.current?.click()}>
              <div className="rl">
                <div className="ri"><Paperclip /></div>
                <div>
                  <div className="rtxt">{receipt || (isReadonly ? "No receipt attached" : "Attach Receipt")}</div>
                  <div className="rh">{isReadonly ? "" : "Upload image or PDF · OCR auto-fills details"}</div>
                </div>
              </div>
              {!isReadonly && <button className="btn bg" style={{ pointerEvents: "none" }}><Upload size={12} />Browse</button>}
              <input ref={fileRef} type="file" accept="image/*,application/pdf" style={{ display: "none" }} onChange={e => e.target.files[0] && setReceipt(e.target.files[0].name)} />
            </div>

            {/* Body */}
            <div className="mb">
              {(modal === "new" || isDraft) && (
                <div className="fgrid">
                  <div>
                    <label className="flbl">Description *</label>
                    <input className="fi" placeholder="e.g. Restaurant bill" value={fv("description")} onChange={e => fc("description")(e.target.value)} />
                  </div>
                  <div>
                    <label className="flbl">Expense Date</label>
                    <input className="fi" type="date" value={fv("date")} onChange={e => fc("date")(e.target.value)} />
                  </div>
                  <div>
                    <label className="flbl">Category</label>
                    <select className="fsel" value={fv("category")} onChange={e => fc("category")(e.target.value)}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="flbl">Paid By</label>
                    <select className="fsel" value={fv("paidBy")} onChange={e => fc("paidBy")(e.target.value)}>
                      <option value="">Select</option>
                      {PAID_BY.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="full">
                    <label className="flbl">Total Amount</label>
                    <div className="arow">
                      <select className="fsel" value={fv("currency")} onChange={e => fc("currency")(e.target.value)}>
                        {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <input className="fi" type="number" placeholder="0.00" style={{ flex: 1 }} value={fv("amount")} onChange={e => fc("amount")(e.target.value)} />
                    </div>
                    <div className="rnote">Submit in any currency — manager sees auto-converted base currency at today's live rates.</div>
                  </div>
                  <div className="full">
                    <label className="flbl">Remarks</label>
                    <textarea className="fta" placeholder="Any notes..." value={fv("remarks")} onChange={e => fc("remarks")(e.target.value)} />
                  </div>
                </div>
              )}

              {isReadonly && (
                <div className="fgrid">
                  {[["Description", modal.description], ["Date", modal.date], ["Category", modal.category], ["Paid By", modal.paidBy], ["Amount", `${modal.currency} ${modal.amount?.toLocaleString()}`], ["Remarks", modal.remarks || "—"]].map(([l, v]) => (
                    <div key={l} className={l === "Description" || l === "Remarks" ? "full" : ""}>
                      <div className="rlab">{l}</div>
                      <div className="rval">{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {modal !== "new" && modal?.approvals?.length > 0 && (
                <div className="alog">
                  <div className="algt">Approval History</div>
                  {modal.approvals.map((a, i) => {
                    const s = SM[a.status] || SM.Submitted;
                    return (
                      <div className="alr" key={i}>
                        <div><div className="ala">{a.approver}</div>{a.time && <div className="alt">{a.time}</div>}</div>
                        <span className="badge" style={{ color: s.color, background: s.bg }}>
                          <span className="bdot" style={{ background: s.color }} />{a.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mf">
              {modal === "new" && <>
                <button className="btn bg" onClick={() => save(true)}>Save as Draft</button>
                <button className="btn bp" onClick={() => save(false)}>Submit →</button>
              </>}
              {isDraft && <>
                <button className="btn bd" onClick={() => del(modal.id)}><Trash2 size={13} />Delete</button>
                <button className="btn bg" onClick={close}>Cancel</button>
                <button className="btn bo" onClick={() => { setExpenses(p => p.map(e => e.id === modal.id ? { ...modal } : e)); close(); }}>Save Draft</button>
                <button className="btn bp" onClick={() => submit(modal.id)}>Submit →</button>
              </>}
              {isReadonly && <button className="btn bg" onClick={close}>Close</button>}
            </div>
          </div>
        </div>
      )}

      <div className="page">
        <div className="inner">

          {/* Page header */}
          <div className="ph">
            <div>
              <div className="pt">My <span>Expenses</span></div>
              <div className="psub">Employee View · Sarah</div>
            </div>
            <div className="hbtns">
              <button className="btn bo" onClick={() => fileRef.current?.click()}><Upload size={14} />Upload Receipt</button>
              <button className="btn bp" onClick={openNew}><Plus size={14} />New Expense</button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="srow">
            {[
              { label: "To Submit", val: `₹ ${sumBy(expenses, "Draft").toLocaleString()}`, ic: <FileText />, bg: "rgba(111,179,184,0.11)", co: "#6FB3B8" },
              { label: "Waiting Approval", val: `₹ ${sumBy(expenses, "Submitted").toLocaleString()}`, ic: <Clock />, bg: "rgba(212,134,10,0.09)", co: "#d4860a" },
              { label: "Approved", val: `₹ ${sumBy(expenses, "Approved").toLocaleString()}`, ic: <CheckCircle />, bg: "rgba(45,122,90,0.09)", co: "#2d7a5a" },
            ].map(({ label, val, ic, bg, co }) => (
              <div className="sc" key={label}>
                <div className="si" style={{ background: bg, color: co }}>{ic}</div>
                <div>
                  <div className="sl">{label}</div>
                  <div className="sv">{val}</div>
                  <div className="sa"><ChevronRight size={11} />View details</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="tc">
            <div className="tt">
              <div className="ttl">All Expenses</div>
              <button className="btn bg"><Eye size={13} />View All</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Employee</th><th>Description</th><th>Date</th>
                    <th>Category</th><th>Paid By</th><th>Remarks</th>
                    <th>Amount</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length === 0
                    ? <tr className="empty"><td colSpan={8}>No expenses yet. Click <strong>+ New Expense</strong> to get started.</td></tr>
                    : expenses.map(exp => {
                      const s = SM[exp.status] || SM.Draft;
                      return (
                        <tr key={exp.id} onClick={() => openDetail(exp)}>
                          <td style={{ fontWeight: 500 }}>{exp.employee}</td>
                          <td>{exp.description}</td>
                          <td style={{ color: "#7aa8ae", fontSize: 12 }}>{exp.date}</td>
                          <td>{exp.category}</td>
                          <td>{exp.paidBy}</td>
                          <td style={{ color: "#7aa8ae" }}>{exp.remarks || "—"}</td>
                          <td className="amt">{exp.currency.split(" ")[1] || ""}{exp.amount?.toLocaleString()}</td>
                          <td><span className="badge" style={{ color: s.color, background: s.bg }}><span className="bdot" style={{ background: s.color }} />{exp.status}</span></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}