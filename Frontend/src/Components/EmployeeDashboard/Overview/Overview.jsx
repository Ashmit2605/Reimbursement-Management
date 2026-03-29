import { useState } from "react";
import {
    CheckCircle, XCircle, Clock, FileText, TrendingUp,
    ChevronRight, AlertCircle, Plus,
} from "lucide-react";

const C = {
    dark: "#17252A",
    teal: "#388087",
    mid: "#6FB3B8",
    light: "#BADFE7",
    bg: "#f4f8f9",
};

const HISTORY = [
    { id: 101, description: "Team Lunch", date: "4th Oct, 2025", category: "Food", amount: 5000, currency: "INR ₹", status: "Approved", approver: "John M." },
    { id: 102, description: "Flight to Mumbai", date: "6th Oct, 2025", category: "Travel", amount: 12400, currency: "INR ₹", status: "Rejected", approver: "John M." },
    { id: 103, description: "Hotel Stay — Taj", date: "7th Oct, 2025", category: "Accommodation", amount: 320, currency: "USD $", status: "Approved", approver: "John M." },
    { id: 104, description: "Figma Pro Subscription", date: "1st Sep, 2025", category: "Software", amount: 15, currency: "USD $", status: "Approved", approver: "Meera K." },
    { id: 105, description: "Office Chair", date: "20th Aug, 2025", category: "Equipment", amount: 8900, currency: "INR ₹", status: "Rejected", approver: "Meera K." },
    { id: 106, description: "Client Dinner", date: "15th Jul, 2025", category: "Food", amount: 4200, currency: "INR ₹", status: "Approved", approver: "John M." },
];

const REQUESTS = [
    { id: 1, description: "Restaurant bill", date: "4th Oct, 2025", category: "Food", amount: 5000, currency: "INR ₹", status: "Draft" },
    { id: 2, description: "Flight tickets", date: "6th Oct, 2025", category: "Travel", amount: 567, currency: "USD $", status: "Submitted" },
    { id: 3, description: "Hotel stay", date: "7th Oct, 2025", category: "Accommodation", amount: 320, currency: "USD $", status: "Approved" },
];

const CAT_COLORS = {
    Food: { bg: "#fff7e6", text: "#92610a", border: "#f5d98a" },
    Travel: { bg: "#e8f4fd", text: "#1a5f8a", border: "#9fd0f0" },
    Accommodation: { bg: "#f3eeff", text: "#5e35b1", border: "#c5adf5" },
    Software: { bg: "#e8eeff", text: "#2d4db5", border: "#a0b4f5" },
    Equipment: { bg: "#e4f7f5", text: "#1a7a6e", border: "#8fd3cc" },
    Other: { bg: "#f0f1f3", text: "#5a636b", border: "#cdd1d6" },
};

const STATUS_STYLE = {
    Draft:     { color: "#888",    bg: "rgba(136,136,136,0.1)" },
    Submitted: { color: "#d4860a", bg: "rgba(212,134,10,0.1)" },
    Approved:  { color: "#2d7a5a", bg: "rgba(45,122,90,0.1)" },
    Rejected:  { color: "#b54a4a", bg: "rgba(181,74,74,0.1)" },
};

const sym = (c) => c?.split(" ")[1] || "";

function StatusBadge({ status }) {
    const s = STATUS_STYLE[status] || STATUS_STYLE.Draft;
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 600, color: s.color, background: s.bg }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            {status}
        </span>
    );
}

export default function EmployeeOverview() {
    const approved = HISTORY.filter(h => h.status === "Approved");
    const rejected = HISTORY.filter(h => h.status === "Rejected");
    const approvedTotal = approved.reduce((a, b) => a + b.amount, 0);
    const approvalRate = Math.round((approved.length / HISTORY.length) * 100);

    const pending = REQUESTS.filter(r => r.status === "Submitted");
    const drafts  = REQUESTS.filter(r => r.status === "Draft");

    const recentHistory = HISTORY.slice(0, 3);
    const recentRequests = REQUESTS.slice(0, 3);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Poppins',sans-serif; background:#f4f8f9; color:#17252A; min-height:100vh; }
        button, input { font-family:'Poppins',sans-serif; }
      `}</style>

            <div style={{ minHeight: "100vh", background: C.bg, padding: "28px 20px 56px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>

                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark, letterSpacing: "-0.3px" }}>
                                My <span style={{ color: C.teal }}>Overview</span>
                            </h1>
                            <p style={{ fontSize: 12, color: "#aac5c8", marginTop: 3 }}>Employee View · Sarah · Summary of all activity</p>
                        </div>
                        <button
                            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${C.dark},${C.teal})`, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 3px 12px rgba(23,37,42,0.18)" }}
                        >
                            <Plus size={14} /> New Expense
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: 13, marginBottom: 24 }}>
                        {[
                            { label: "Approved", value: `${approved.length} requests`, sub: `≈ ₹${approvedTotal.toLocaleString()} total`, icon: <CheckCircle size={20} />, iconBg: "rgba(45,122,90,0.1)", iconBorder: "#b8dfc9", color: "#2d7a5a", cardBg: "rgba(45,122,90,0.05)", cardBorder: "#b8dfc9" },
                            { label: "Rejected", value: `${rejected.length} requests`, sub: "Review history for details", icon: <XCircle size={20} />, iconBg: "rgba(181,74,74,0.1)", iconBorder: "#f5c6c6", color: "#c0504d", cardBg: "rgba(181,74,74,0.05)", cardBorder: "#f5c6c6" },
                            { label: "Pending", value: `${pending.length} requests`, sub: "Awaiting approval", icon: <Clock size={20} />, iconBg: "rgba(212,134,10,0.1)", iconBorder: "#f5d98a", color: "#d4860a", cardBg: "rgba(212,134,10,0.05)", cardBorder: "#f5d98a" },
                            { label: "Drafts", value: `${drafts.length} requests`, sub: "Not yet submitted", icon: <FileText size={20} />, iconBg: "rgba(111,179,184,0.12)", iconBorder: "#b0d8dc", color: C.teal, cardBg: "rgba(111,179,184,0.06)", cardBorder: "#b0d8dc" },
                        ].map(({ label, value, sub, icon, iconBg, iconBorder, color, cardBg, cardBorder }) => (
                            <div key={label} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, border: `1px solid ${iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }}>
                                    {icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.6px", opacity: 0.8, marginBottom: 2 }}>{label}</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
                                    <div style={{ fontSize: 11, color, opacity: 0.6, marginTop: 2 }}>{sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Approval Rate Banner */}
                    <div style={{ background: "#fff", border: "1px solid #eef4f5", borderRadius: 14, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <TrendingUp size={15} style={{ color: "#2d7a5a" }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>
                                {approvalRate}% approval rate
                            </span>
                            <span style={{ fontSize: 12, color: "#aac5c8" }}>— {approved.length} of {HISTORY.length} resolved requests approved</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 160, height: 6, background: "#eef4f5", borderRadius: 4, overflow: "hidden" }}>
                                <div style={{ width: `${approvalRate}%`, height: "100%", background: "linear-gradient(90deg,#2d7a5a,#6FB3B8)", borderRadius: 4 }} />
                            </div>
                            <span style={{ fontSize: 11, color: "#aac5c8", minWidth: 30 }}>{approvalRate}%</span>
                        </div>
                    </div>

                    {/* Two-column grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: 16 }}>

                        {/* Recent Requests */}
                        <div style={{ background: "#fff", border: "1px solid #eef4f5", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(56,128,135,0.06)" }}>
                            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f5f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Recent Requests</span>
                                <span style={{ fontSize: 11, color: C.teal, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                                    View all <ChevronRight size={12} />
                                </span>
                            </div>
                            <div>
                                {recentRequests.map((r, i) => {
                                    const cat = CAT_COLORS[r.category] || CAT_COLORS.Other;
                                    return (
                                        <div key={r.id} style={{ padding: "13px 20px", borderBottom: i < recentRequests.length - 1 ? "1px solid #f7fafa" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{r.description}</span>
                                                    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>{r.category}</span>
                                                </div>
                                                <div style={{ fontSize: 11.5, color: "#aac5c8", marginTop: 2 }}>{r.date}</div>
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{sym(r.currency)}{r.amount.toLocaleString()}</div>
                                                <div style={{ marginTop: 4 }}><StatusBadge status={r.status} /></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent History */}
                        <div style={{ background: "#fff", border: "1px solid #eef4f5", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(56,128,135,0.06)" }}>
                            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f5f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>Recent History</span>
                                <span style={{ fontSize: 11, color: C.teal, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                                    View all <ChevronRight size={12} />
                                </span>
                            </div>
                            <div>
                                {recentHistory.map((h, i) => {
                                    const isRej = h.status === "Rejected";
                                    const cat = CAT_COLORS[h.category] || CAT_COLORS.Other;
                                    return (
                                        <div key={h.id} style={{ padding: "13px 20px", borderBottom: i < recentHistory.length - 1 ? "1px solid #f7fafa" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: isRej ? "rgba(181,74,74,0.08)" : "rgba(45,122,90,0.08)", border: `1px solid ${isRej ? "#f5c6c6" : "#b8dfc9"}` }}>
                                                {isRej ? <XCircle size={14} style={{ color: "#c0504d" }} /> : <CheckCircle size={14} style={{ color: "#2d7a5a" }} />}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>{h.description}</span>
                                                    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>{h.category}</span>
                                                </div>
                                                <div style={{ fontSize: 11.5, color: "#aac5c8", marginTop: 2 }}>{h.date} · {h.approver}</div>
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{sym(h.currency)}{h.amount.toLocaleString()}</div>
                                                <div style={{ marginTop: 4 }}><StatusBadge status={h.status} /></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Action nudge for drafts */}
                    {drafts.length > 0 && (
                        <div style={{ marginTop: 16, background: "rgba(212,134,10,0.05)", border: "1px solid #f5d98a", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                            <AlertCircle size={15} style={{ color: "#d4860a", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#92610a" }}>
                                You have <strong>{drafts.length} draft{drafts.length > 1 ? "s" : ""}</strong> waiting to be submitted. Head to <strong>My Expenses</strong> to review and submit.
                            </span>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
