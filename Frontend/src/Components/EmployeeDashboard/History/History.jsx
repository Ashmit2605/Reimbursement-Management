import { useState, useEffect } from "react";
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
    const isRej = item.status === "rejected";
    return (
        <div style={{ background: "#f9fdfd", borderTop: "1px solid #eef4f5", padding: "16px 22px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px,1fr))", gap: "12px 20px", marginBottom: 14 }}>
                {[
                    ["Submitted on", new Date(item.createdat).toLocaleDateString(), Calendar],
                    ["Resolved on", item.updatedat ? new Date(item.updatedat).toLocaleDateString() : "—", Calendar],
                    ["Paid by", item.categorypaidby || "—", CreditCard],
                    ["Reviewed by", "System", User],
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
            <div style={{ background: "#fff", border: "1px solid #eef4f5", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {isRej ? <XCircle size={14} style={{ color: "#c0504d" }} /> : <CheckCircle size={14} style={{ color: "#2d7a5a" }} />}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>System</div>
                        <div style={{ fontSize: 11, color: "#aac5c8" }}>{item.updatedat ? new Date(item.updatedat).toLocaleString() : "—"}</div>
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
        </div>
    );
}

function Row({ item }) {
    const [open, setOpen] = useState(false);
    const isRej = item.status === "rejected";
    const cat = CAT_COLORS[item.type] || CAT_COLORS.Other;

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
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`, flexShrink: 0 }}>{item.type}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#aac5c8", marginTop: 3 }}>{new Date(item.expensedate).toLocaleDateString()}</div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0, marginRight: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>₹{Number(item.amount).toLocaleString()}</div>
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
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const resp = await fetch("http://localhost:5000/api/expenses/me", {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const data = await resp.json();
                if (resp.ok) {
                    const resolved = data.filter(e => e.status === 'approved' || e.status === 'rejected');
                    setHistory(resolved);
                }
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, []);

    const approved = history.filter(h => h.status === "approved");
    const rejected = history.filter(h => h.status === "rejected");
    const approvedTotal = approved.reduce((a, b) => a + Number(b.amount || 0), 0);
    const approvalRate = history.length > 0 ? Math.round((approved.length / history.length) * 100) : 0;

    const filtered = history.filter(h => {
        const statusMatch = filter === "All" || 
            (filter === "Approved" && h.status === "approved") || 
            (filter === "Rejected" && h.status === "rejected");
        const searchMatch = !search || 
            (h.description || '').toLowerCase().includes(search.toLowerCase()) || 
            (h.type || '').toLowerCase().includes(search.toLowerCase());
        return statusMatch && searchMatch;
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
                            <p style={{ fontSize: 12, color: "#aac5c8", marginTop: 3 }}>Employee View · All resolved requests</p>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#aac5c8", background: "#fff", border: "1px solid #eef4f5", borderRadius: 8, padding: "5px 13px", alignSelf: "flex-start" }}>
                            {history.length} reports
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
                                <div style={{ fontSize: 11, color: "#c0504d", opacity: 0.6, marginTop: 2 }}>≈ ₹{rejected.reduce((a, b) => a + Number(b.amount || 0), 0).toLocaleString()} total</div>
                            </div>
                        </div>
                    </div>

                    {/* trend */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, paddingLeft: 2 }}>
                        <TrendingUp size={13} style={{ color: "#2d7a5a" }} />
                        <span style={{ fontSize: 12, color: "#aac5c8" }}>
                            {approved.length} of {history.length} requests approved ({approvalRate}% approval rate)
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
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "64px 0", color: "#aac5c8" }}>
                            <p style={{ fontSize: 13, fontWeight: 500 }}>Loading history...</p>
                        </div>
                    ) : filtered.length === 0 ? (
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
                            Showing {filtered.length} of {history.length} records
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
