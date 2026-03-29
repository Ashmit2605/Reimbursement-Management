import { useState } from "react";
import {
    CheckCircle, XCircle, AlertCircle, Search, SlidersHorizontal,
    ChevronDown, ChevronUp, TrendingUp, Calendar, CreditCard,
    User, MessageSquare, FileText,
} from "lucide-react";

const C = {
    dark: "#17252A",
    teal: "#388087",
    mid: "#6FB3B8",
    light: "#BADFE7",
    bg: "#f4f8f9",
};

const HISTORY = [
    { id: 101, description: "Team Lunch", date: "4th Oct, 2025", submittedOn: "5th Oct, 2025", resolvedOn: "6th Oct, 2025", category: "Food", paidBy: "Self", amount: 5000, currency: "INR ₹", status: "Approved", approver: "John M.", approvalTime: "6th Oct, 2025 · 10:22 AM", rejectionRemark: null, remarks: "Quarterly team lunch" },
    { id: 102, description: "Flight to Mumbai", date: "6th Oct, 2025", submittedOn: "6th Oct, 2025", resolvedOn: "8th Oct, 2025", category: "Travel", paidBy: "Company Card", amount: 12400, currency: "INR ₹", status: "Rejected", approver: "John M.", approvalTime: "8th Oct, 2025 · 2:11 PM", rejectionRemark: "Flight class exceeds company travel policy. Please rebook economy and resubmit.", remarks: "Client visit Mumbai" },
    { id: 103, description: "Hotel Stay — Taj", date: "7th Oct, 2025", submittedOn: "8th Oct, 2025", resolvedOn: "10th Oct, 2025", category: "Accommodation", paidBy: "Self", amount: 320, currency: "USD $", status: "Approved", approver: "John M.", approvalTime: "10th Oct, 2025 · 9:05 AM", rejectionRemark: null, remarks: "Conference accommodation" },
    { id: 104, description: "Figma Pro Subscription", date: "1st Sep, 2025", submittedOn: "2nd Sep, 2025", resolvedOn: "4th Sep, 2025", category: "Software", paidBy: "Self", amount: 15, currency: "USD $", status: "Approved", approver: "Meera K.", approvalTime: "4th Sep, 2025 · 11:47 AM", rejectionRemark: null, remarks: "Annual plan prorated" },
    { id: 105, description: "Office Chair", date: "20th Aug, 2025", submittedOn: "21st Aug, 2025", resolvedOn: "24th Aug, 2025", category: "Equipment", paidBy: "Self", amount: 8900, currency: "INR ₹", status: "Rejected", approver: "Meera K.", approvalTime: "24th Aug, 2025 · 3:30 PM", rejectionRemark: "Equipment purchases above ₹5,000 require prior approval from Finance. Please raise a procurement request first.", remarks: "Work from home setup" },
    { id: 106, description: "Client Dinner", date: "15th Jul, 2025", submittedOn: "16th Jul, 2025", resolvedOn: "17th Jul, 2025", category: "Food", paidBy: "Company Card", amount: 4200, currency: "INR ₹", status: "Approved", approver: "John M.", approvalTime: "17th Jul, 2025 · 5:00 PM", rejectionRemark: null, remarks: "Acme Corp client" },
];

const CAT_COLORS = {
    Food: { bg: "#fff7e6", text: "#92610a", border: "#f5d98a" },
    Travel: { bg: "#e8f4fd", text: "#1a5f8a", border: "#9fd0f0" },
    Accommodation: { bg: "#f3eeff", text: "#5e35b1", border: "#c5adf5" },
    Software: { bg: "#e8eeff", text: "#2d4db5", border: "#a0b4f5" },
    Equipment: { bg: "#e4f7f5", text: "#1a7a6e", border: "#8fd3cc" },
    Other: { bg: "#f0f1f3", text: "#5a636b", border: "#cdd1d6" },
};

const sym = (c) => c?.split(" ")[1] || "";

function Detail({ item }) {
    const isRej = item.status === "Rejected";
    return (
        <div style={{ background: "#f9fdfd", borderTop: "1px solid #eef4f5", padding: "16px 22px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px,1fr))", gap: "12px 20px", marginBottom: 14 }}>
                {[
                    ["Submitted on", item.submittedOn, Calendar],
                    ["Resolved on", item.resolvedOn, Calendar],
                    ["Paid by", item.paidBy, CreditCard],
                    ["Reviewed by", item.approver, User],
                    ["Remarks", item.remarks || "—", MessageSquare],
                ].map(([lbl, val, Icon]) => (
                    <div key={lbl} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <Icon size={13} style={{ color: C.mid, marginTop: 2, flexShrink: 0 }} />
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>{lbl}</div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{val}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ fontSize: 10, fontWeight: 700, color: C.mid, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 7 }}>Approval history</div>
            <div style={{ background: "#fff", border: "1px solid #eef4f5", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: isRej && item.rejectionRemark ? 12 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {isRej ? <XCircle size={14} style={{ color: "#c0504d" }} /> : <CheckCircle size={14} style={{ color: "#2d7a5a" }} />}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{item.approver}</div>
                        <div style={{ fontSize: 11, color: "#aac5c8" }}>{item.approvalTime}</div>
                    </div>
                </div>
                <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px",
                    borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                    background: isRej ? "rgba(181,74,74,0.08)" : "rgba(45,122,90,0.08)",
                    color: isRej ? "#b54a4a" : "#2d7a5a",
                    border: `1px solid ${isRej ? "#f5c6c6" : "#b8dfc9"}`,
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: isRej ? "#c0504d" : "#2d7a5a", flexShrink: 0 }} />
                    {item.status}
                </span>
            </div>

            {isRej && item.rejectionRemark && (
                <div style={{ display: "flex", gap: 10, background: "rgba(181,74,74,0.06)", border: "1px solid #f5c6c6", borderRadius: 10, padding: "12px 14px" }}>
                    <AlertCircle size={14} style={{ color: "#c0504d", flexShrink: 0, marginTop: 2 }} />
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#c0504d", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Reason for rejection</div>
                        <div style={{ fontSize: 13, color: "#9a3a3a", lineHeight: 1.55 }}>{item.rejectionRemark}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Row({ item }) {
    const [open, setOpen] = useState(false);
    const isRej = item.status === "Rejected";
    const cat = CAT_COLORS[item.category] || CAT_COLORS.Other;

    return (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #eef4f5", overflow: "hidden", boxShadow: open ? "0 4px 18px rgba(56,128,135,0.08)" : "none", transition: "box-shadow 0.15s" }}>
            <button
                onClick={() => setOpen(v => !v)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "14px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
                <div style={{
                    width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: isRej ? "rgba(181,74,74,0.08)" : "rgba(45,122,90,0.08)",
                    border: `1px solid ${isRej ? "#f5c6c6" : "#b8dfc9"}`
                }}>
                    {isRej ? <XCircle size={16} style={{ color: "#c0504d" }} /> : <CheckCircle size={16} style={{ color: "#2d7a5a" }} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{item.description}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, flexShrink: 0 }}>{item.category}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#aac5c8", marginTop: 3 }}>{item.date} · {item.approver}</div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0, marginRight: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{sym(item.currency)}{item.amount.toLocaleString()}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 4, fontSize: 11.5, fontWeight: 700, color: isRej ? "#b54a4a" : "#2d7a5a" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isRej ? "#c0504d" : "#2d7a5a" }} />
                        {item.status}
                    </div>
                </div>

                <div style={{ color: "#ccdde0", flexShrink: 0 }}>
                    {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </button>

            {open && <Detail item={item} />}
        </div>
    );
}

export default function ExpenseHistoryPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const approved = HISTORY.filter(h => h.status === "Approved");
    const rejected = HISTORY.filter(h => h.status === "Rejected");
    const approvedTotal = approved.reduce((a, b) => a + b.amount, 0);
    const rejectedTotal = rejected.reduce((a, b) => a + b.amount, 0);
    const approvalRate = Math.round((approved.length / HISTORY.length) * 100);

    const filtered = HISTORY.filter(h => {
        const mf = filter === "All" || h.status === filter;
        const ms = !search || h.description.toLowerCase().includes(search.toLowerCase()) || h.category.toLowerCase().includes(search.toLowerCase());
        return mf && ms;
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Poppins',sans-serif; background:#f4f8f9; color:#17252A; min-height:100vh; }
        button, input { font-family:'Poppins',sans-serif; }
        .fi:focus { border-color:#6FB3B8 !important; box-shadow:0 0 0 3px rgba(111,179,184,0.12); outline:none; }
      `}</style>

            <div style={{ minHeight: "100vh", background: C.bg, padding: "28px 20px 56px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>

                    {/* page header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark, letterSpacing: "-0.3px" }}>
                                Expense <span style={{ color: C.teal }}>History</span>
                            </h1>
                            <p style={{ fontSize: 12, color: "#aac5c8", marginTop: 3 }}>Employee View · Sarah · All resolved requests</p>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#aac5c8", background: "#fff", border: "1px solid #eef4f5", borderRadius: 8, padding: "5px 13px", alignSelf: "flex-start" }}>
                            {HISTORY.length} reports
                        </span>
                    </div>

                    {/* stat cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 13, marginBottom: 14 }}>
                        <div style={{ background: "rgba(45,122,90,0.05)", border: "1px solid #b8dfc9", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(45,122,90,0.1)", border: "1px solid #b8dfc9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <CheckCircle size={20} style={{ color: "#2d7a5a" }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#2d7a5a", textTransform: "uppercase", letterSpacing: "0.6px", opacity: 0.8, marginBottom: 2 }}>Approved</div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: "#2d7a5a", lineHeight: 1.2 }}>{approved.length} requests</div>
                                <div style={{ fontSize: 11, color: "#2d7a5a", opacity: 0.6, marginTop: 2 }}>≈ ₹{approvedTotal.toLocaleString()} total</div>
                            </div>
                        </div>

                        <div style={{ background: "rgba(181,74,74,0.05)", border: "1px solid #f5c6c6", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(181,74,74,0.1)", border: "1px solid #f5c6c6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <XCircle size={20} style={{ color: "#c0504d" }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#c0504d", textTransform: "uppercase", letterSpacing: "0.6px", opacity: 0.8, marginBottom: 2 }}>Rejected</div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: "#c0504d", lineHeight: 1.2 }}>{rejected.length} requests</div>
                                <div style={{ fontSize: 11, color: "#c0504d", opacity: 0.6, marginTop: 2 }}>≈ ₹{rejectedTotal.toLocaleString()} total</div>
                            </div>
                        </div>
                    </div>

                    {/* trend */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, paddingLeft: 2 }}>
                        <TrendingUp size={13} style={{ color: "#2d7a5a" }} />
                        <span style={{ fontSize: 12, color: "#aac5c8" }}>
                            {approved.length} of {HISTORY.length} requests approved ({approvalRate}% approval rate)
                        </span>
                    </div>

                    {/* search + filter */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
                            <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#b0cdd1", pointerEvents: "none" }} />
                            <input
                                className="fi"
                                type="text"
                                placeholder="Search by description or category…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, fontSize: 12.5, borderRadius: 10, border: "1.5px solid #e2eef0", background: "#fff", color: C.dark, transition: "border-color 0.15s, box-shadow 0.15s" }}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff", border: "1.5px solid #e2eef0", borderRadius: 10, padding: "4px 8px", flexShrink: 0 }}>
                            <SlidersHorizontal size={13} style={{ color: "#b0cdd1", marginRight: 2 }} />
                            {["All", "Approved", "Rejected"].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    style={{
                                        fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer", transition: "all 0.13s",
                                        background: filter === f ? (f === "Approved" ? "rgba(45,122,90,0.1)" : f === "Rejected" ? "rgba(181,74,74,0.1)" : C.dark) : "transparent",
                                        color: filter === f ? (f === "Approved" ? "#2d7a5a" : f === "Rejected" ? "#c0504d" : "#fff") : "#aac5c8",
                                    }}
                                >{f}</button>
                            ))}
                        </div>
                    </div>

                    {/* list */}
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "64px 0", color: "#aac5c8" }}>
                            <FileText size={34} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                            <p style={{ fontSize: 13, fontWeight: 500 }}>No records found</p>
                            <p style={{ fontSize: 12, marginTop: 4, opacity: 0.7 }}>Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                            {filtered.map(item => <Row key={item.id} item={item} />)}
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <p style={{ textAlign: "center", fontSize: 12, color: "#ccdde0", marginTop: 24 }}>
                            Showing {filtered.length} of {HISTORY.length} records
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}