"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";

// ─── Types ───────────────────────────────────────────────────────────────

interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  format: string;
  registrationType: string;
  paymentStatus: "pending" | "paid" | "cancelled";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
  individualCount: number;
  groupCount: number;
  onlineCount: number;
  offlineCount: number;
}

type FilterStatus = "all" | "pending" | "paid" | "cancelled";

// ─── Login Screen ───────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        onLogin();
      } else {
        setError(data.message || "Mật khẩu không đúng.");
      }
    } catch {
      setError("Lỗi kết nối server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginIcon}>🔐</div>
        <h1 style={styles.loginTitle}>Admin Dashboard</h1>
        <p style={styles.loginSubtitle}>Nhập mật khẩu để truy cập</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu admin"
            style={styles.loginInput}
            autoFocus
            autoComplete="current-password"
          />
          {error && <p style={styles.errorText}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Stats Cards ────────────────────────────────────────────────────────

function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    {
      label: "Tổng đăng ký",
      value: stats.total,
      icon: "📋",
      color: "#6366f1",
      bgColor: "rgba(99, 102, 241, 0.1)",
    },
    {
      label: "Đã thanh toán",
      value: stats.paid,
      icon: "✅",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      label: "Chờ thanh toán",
      value: stats.pending,
      icon: "⏳",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      label: "Doanh thu",
      value: formatCurrency(stats.totalRevenue),
      icon: "💰",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      isText: true,
    },
  ];

  return (
    <div style={styles.statsGrid}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{ ...styles.statCard, borderColor: card.color + "30" }}
        >
          <div style={{ ...styles.statIcon, backgroundColor: card.bgColor }}>
            {card.icon}
          </div>
          <div>
            <div style={{ ...styles.statValue, color: card.color }}>
              {card.value}
            </div>
            <div style={styles.statLabel}>{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Secondary Stats ─────────────────────────────────────────────────────

function SecondaryStats({ stats }: { stats: Stats }) {
  const items = [
    { label: "Cá nhân", value: stats.individualCount, icon: "👤" },
    { label: "Nhóm 3", value: stats.groupCount, icon: "👥" },
    { label: "Online", value: stats.onlineCount, icon: "🌐" },
    { label: "Offline", value: stats.offlineCount, icon: "📍" },
    { label: "Đã hủy", value: stats.cancelled, icon: "❌" },
  ];

  return (
    <div style={styles.secondaryStatsRow}>
      {items.map((item) => (
        <div key={item.label} style={styles.secondaryStatItem}>
          <span style={styles.secondaryStatIcon}>{item.icon}</span>
          <span style={styles.secondaryStatValue}>{item.value}</span>
          <span style={styles.secondaryStatLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Registration Table ─────────────────────────────────────────────────

function RegistrationTable({
  registrations,
  onUpdateStatus,
  onUpdateNotes,
}: {
  registrations: Registration[];
  onUpdateStatus: (id: string, status: "pending" | "paid" | "cancelled") => void;
  onUpdateNotes: (id: string, notes: string) => void;
}) {
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", label: "Chờ TT" },
    paid: { bg: "rgba(16,185,129,0.15)", text: "#10b981", label: "Đã TT" },
    cancelled: { bg: "rgba(239,68,68,0.15)", text: "#ef4444", label: "Đã hủy" },
  };

  const nextStatus = (current: string): "pending" | "paid" | "cancelled" => {
    if (current === "pending") return "paid";
    if (current === "paid") return "cancelled";
    return "pending";
  };

  if (registrations.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📭</div>
        <p style={styles.emptyText}>Chưa có đăng ký nào</p>
      </div>
    );
  }

  return (
    <div style={styles.tableContainer}>
      {/* Desktop table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Họ tên</th>
            <th style={styles.th}>SĐT</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Hình thức</th>
            <th style={styles.th}>Loại</th>
            <th style={styles.th}>Trạng thái</th>
            <th style={styles.th}>Ghi chú</th>
            <th style={styles.th}>Ngày ĐK</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r, i) => {
            const sc = statusColors[r.paymentStatus];
            return (
              <tr key={r.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                <td style={styles.td}>{i + 1}</td>
                <td style={{ ...styles.td, fontWeight: 600, color: "#e2e8f0" }}>
                  {r.name}
                </td>
                <td style={{ ...styles.td, fontFamily: "monospace" }}>{r.phone}</td>
                <td style={styles.td}>{r.email}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: r.format === "online" ? "rgba(59,130,246,0.15)" : "rgba(168,85,247,0.15)",
                      color: r.format === "online" ? "#60a5fa" : "#c084fc",
                    }}
                  >
                    {r.format === "online" ? "🌐 Online" : "📍 Offline"}
                  </span>
                </td>
                <td style={styles.td}>
                  {r.registrationType === "individual" ? "Cá nhân" : "Nhóm 3"}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => onUpdateStatus(r.id, nextStatus(r.paymentStatus))}
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: sc.bg,
                      color: sc.text,
                    }}
                    title={`Click để chuyển sang: ${statusColors[nextStatus(r.paymentStatus)].label}`}
                  >
                    {sc.label}
                  </button>
                </td>
                <td style={styles.td}>
                  {editingNotes === r.id ? (
                    <div style={styles.notesEditContainer}>
                      <input
                        type="text"
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        style={styles.notesInput}
                        autoFocus
                        maxLength={1000}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onUpdateNotes(r.id, notesText);
                            setEditingNotes(null);
                          } else if (e.key === "Escape") {
                            setEditingNotes(null);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          onUpdateNotes(r.id, notesText);
                          setEditingNotes(null);
                        }}
                        style={styles.notesSaveBtn}
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setEditingNotes(r.id);
                        setNotesText(r.notes || "");
                      }}
                      style={styles.notesDisplay}
                      title="Click để sửa ghi chú"
                    >
                      {r.notes || "—"}
                    </span>
                  )}
                </td>
                <td style={{ ...styles.td, fontSize: "0.75rem", color: "#94a3b8" }}>
                  {formatDateVN(r.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div style={styles.mobileCards} data-mobile-cards>
        {registrations.map((r, i) => {
          const sc = statusColors[r.paymentStatus];
          return (
            <div key={r.id} style={styles.mobileCard}>
              <div style={styles.mobileCardHeader}>
                <span style={{ fontWeight: 700, color: "#e2e8f0" }}>
                  #{i + 1} {r.name}
                </span>
                <button
                  onClick={() => onUpdateStatus(r.id, nextStatus(r.paymentStatus))}
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: sc.bg,
                    color: sc.text,
                  }}
                >
                  {sc.label}
                </button>
              </div>
              <div style={styles.mobileCardBody}>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>📞 SĐT:</span>
                  <span style={{ fontFamily: "monospace" }}>{r.phone}</span>
                </div>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>📧 Email:</span>
                  <span>{r.email}</span>
                </div>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>📋 Hình thức:</span>
                  <span>{r.format === "online" ? "Online" : "Offline"}</span>
                </div>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>👤 Loại:</span>
                  <span>
                    {r.registrationType === "individual" ? "Cá nhân" : "Nhóm 3"}
                  </span>
                </div>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>📅 Ngày ĐK:</span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    {formatDateVN(r.createdAt)}
                  </span>
                </div>
                <div style={styles.mobileField}>
                  <span style={styles.mobileLabel}>📝 Ghi chú:</span>
                  {editingNotes === r.id ? (
                    <div style={{ ...styles.notesEditContainer, flex: 1 }}>
                      <input
                        type="text"
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        style={styles.notesInput}
                        autoFocus
                        maxLength={1000}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onUpdateNotes(r.id, notesText);
                            setEditingNotes(null);
                          } else if (e.key === "Escape") {
                            setEditingNotes(null);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          onUpdateNotes(r.id, notesText);
                          setEditingNotes(null);
                        }}
                        style={styles.notesSaveBtn}
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setEditingNotes(r.id);
                        setNotesText(r.notes || "");
                      }}
                      style={{ ...styles.notesDisplay, flex: 1 }}
                    >
                      {r.notes || "—"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Check existing session
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.registrations);
        setStats(data.stats);
      }
    } catch {
      // Silently fail, will retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated, fetchData]);

  const handleUpdateStatus = async (
    id: string,
    status: "pending" | "paid" | "cancelled"
  ) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, paymentStatus: status }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      // Silently fail
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      // Silently fail
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setRegistrations([]);
    setStats(null);
  };

  const handleExport = () => {
    window.open("/api/admin/export", "_blank");
  };

  // Filter and search
  const filteredRegistrations = useMemo(() => {
    let result = registrations;

    if (filter !== "all") {
      result = result.filter((r) => r.paymentStatus === filter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [registrations, filter, search]);

  if (checking) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={() => { setAuthenticated(true); }} />;
  }

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.headerTitle}>📊 Admin Dashboard</h1>
            <p style={styles.headerSubtitle}>Quản lý đăng ký workshop</p>
          </div>
          <div style={styles.headerActions}>
            <button onClick={fetchData} style={styles.refreshBtn} disabled={loading}>
              {loading ? "⏳" : "🔄"} Tải lại
            </button>
            <button onClick={handleExport} style={styles.exportBtn}>
              📥 Xuất CSV
            </button>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* Stats */}
        {stats && (
          <>
            <StatsCards stats={stats} />
            <SecondaryStats stats={stats} />
          </>
        )}

        {/* Search and Filter */}
        <div style={styles.toolbar}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên, SĐT, email..."
              style={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch("")} style={styles.clearSearchBtn}>
                ✕
              </button>
            )}
          </div>

          <div style={styles.filterContainer}>
            {(["all", "pending", "paid", "cancelled"] as FilterStatus[]).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  style={{
                    ...styles.filterBtn,
                    ...(filter === status ? styles.filterBtnActive : {}),
                  }}
                >
                  {status === "all" && "Tất cả"}
                  {status === "pending" && "⏳ Chờ TT"}
                  {status === "paid" && "✅ Đã TT"}
                  {status === "cancelled" && "❌ Đã hủy"}
                </button>
              )
            )}
          </div>
        </div>

        {/* Count */}
        <div style={styles.resultCount}>
          Hiển thị{" "}
          <strong style={{ color: "#a78bfa" }}>
            {filteredRegistrations.length}
          </strong>{" "}
          / {registrations.length} đăng ký
        </div>

        {/* Table */}
        <RegistrationTable
          registrations={filteredRegistrations}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNotes={handleUpdateNotes}
        />
      </main>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateVN(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
  } catch {
    return isoString;
  }
}

// ─── Styles (Inline CSS for single-file component) ─────────────────────

const styles: Record<string, React.CSSProperties> = {
  // Loading
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f1117",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid rgba(139,92,246,0.2)",
    borderTopColor: "#8b5cf6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  // Login
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f1117 0%, #1a1b2e 50%, #0f1117 100%)",
    padding: "1rem",
  },
  loginCard: {
    width: "100%",
    maxWidth: 400,
    background: "rgba(30, 32, 48, 0.9)",
    borderRadius: 20,
    padding: "2.5rem 2rem",
    border: "1px solid rgba(139,92,246,0.2)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    textAlign: "center" as const,
    backdropFilter: "blur(20px)",
  },
  loginIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  loginTitle: {
    fontSize: "1.75rem",
    fontWeight: 800,
    color: "#e2e8f0",
    margin: "0 0 0.5rem",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  loginSubtitle: {
    color: "#94a3b8",
    fontSize: "0.875rem",
    margin: "0 0 2rem",
  },
  loginInput: {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(15, 17, 23, 0.8)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: 12,
    color: "#e2e8f0",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: "0.5rem",
  },
  loginButton: {
    width: "100%",
    padding: "0.875rem",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "1rem",
    transition: "opacity 0.2s",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "0.8rem",
    margin: "0.5rem 0 0",
    textAlign: "left" as const,
  },

  // Page
  pageContainer: {
    minHeight: "100vh",
    background: "#0f1117",
    color: "#cbd5e1",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  // Header
  header: {
    background: "rgba(30, 32, 48, 0.95)",
    borderBottom: "1px solid rgba(139,92,246,0.15)",
    padding: "1rem 1.5rem",
    position: "sticky" as const,
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(12px)",
  },
  headerContent: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#e2e8f0",
    margin: 0,
  },
  headerSubtitle: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    margin: "0.25rem 0 0",
  },
  headerActions: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
  },
  refreshBtn: {
    padding: "0.5rem 1rem",
    background: "rgba(99,102,241,0.15)",
    color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  exportBtn: {
    padding: "0.5rem 1rem",
    background: "rgba(16,185,129,0.15)",
    color: "#34d399",
    border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  logoutBtn: {
    padding: "0.5rem 1rem",
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 8,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },

  // Main
  main: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "1.5rem",
  },

  // Stats
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },
  statCard: {
    background: "rgba(30, 32, 48, 0.8)",
    borderRadius: 16,
    padding: "1.25rem",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginTop: 2,
  },

  // Secondary stats
  secondaryStatsRow: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap" as const,
  },
  secondaryStatItem: {
    background: "rgba(30, 32, 48, 0.6)",
    borderRadius: 10,
    padding: "0.5rem 0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    border: "1px solid rgba(100,116,139,0.15)",
    fontSize: "0.8rem",
  },
  secondaryStatIcon: {
    fontSize: "0.875rem",
  },
  secondaryStatValue: {
    fontWeight: 700,
    color: "#e2e8f0",
  },
  secondaryStatLabel: {
    color: "#94a3b8",
  },

  // Toolbar
  toolbar: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  searchContainer: {
    flex: "1 1 300px",
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute" as const,
    left: 12,
    fontSize: "0.875rem",
    pointerEvents: "none" as const,
  },
  searchInput: {
    width: "100%",
    padding: "0.625rem 2.5rem 0.625rem 2.25rem",
    background: "rgba(30, 32, 48, 0.8)",
    border: "1px solid rgba(100,116,139,0.2)",
    borderRadius: 10,
    color: "#e2e8f0",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  clearSearchBtn: {
    position: "absolute" as const,
    right: 8,
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: 4,
  },
  filterContainer: {
    display: "flex",
    gap: "0.375rem",
    flexWrap: "wrap" as const,
  },
  filterBtn: {
    padding: "0.5rem 0.75rem",
    background: "rgba(30, 32, 48, 0.6)",
    border: "1px solid rgba(100,116,139,0.2)",
    borderRadius: 8,
    color: "#94a3b8",
    fontSize: "0.75rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap" as const,
  },
  filterBtnActive: {
    background: "rgba(139,92,246,0.2)",
    borderColor: "rgba(139,92,246,0.4)",
    color: "#c4b5fd",
  },

  // Result count
  resultCount: {
    fontSize: "0.8rem",
    color: "#64748b",
    marginBottom: "0.75rem",
  },

  // Table
  tableContainer: {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(100,116,139,0.15)",
    background: "rgba(30, 32, 48, 0.6)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "0.8rem",
    display: "table",
  },
  th: {
    textAlign: "left" as const,
    padding: "0.75rem 0.875rem",
    background: "rgba(15, 17, 23, 0.8)",
    color: "#94a3b8",
    fontWeight: 600,
    fontSize: "0.7rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    borderBottom: "1px solid rgba(100,116,139,0.15)",
    whiteSpace: "nowrap" as const,
  },
  td: {
    padding: "0.75rem 0.875rem",
    borderBottom: "1px solid rgba(100,116,139,0.08)",
    verticalAlign: "middle" as const,
    color: "#cbd5e1",
  },
  trEven: {
    background: "transparent",
  },
  trOdd: {
    background: "rgba(15, 17, 23, 0.3)",
  },

  // Mobile cards
  mobileCards: {
    display: "none",
  },

  mobileCard: {
    background: "rgba(30, 32, 48, 0.8)",
    borderRadius: 12,
    border: "1px solid rgba(100,116,139,0.15)",
    marginBottom: "0.75rem",
    overflow: "hidden",
  },
  mobileCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    background: "rgba(15, 17, 23, 0.5)",
    borderBottom: "1px solid rgba(100,116,139,0.1)",
  },
  mobileCardBody: {
    padding: "0.75rem 1rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.4rem",
    fontSize: "0.8rem",
  },
  mobileField: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
  },
  mobileLabel: {
    color: "#94a3b8",
    whiteSpace: "nowrap" as const,
    minWidth: 85,
  },

  // Badges
  badge: {
    display: "inline-block",
    padding: "0.2rem 0.5rem",
    borderRadius: 6,
    fontSize: "0.7rem",
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },
  statusBadge: {
    display: "inline-block",
    padding: "0.3rem 0.6rem",
    borderRadius: 8,
    fontSize: "0.7rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
    whiteSpace: "nowrap" as const,
  },

  // Notes
  notesEditContainer: {
    display: "flex",
    gap: 4,
    alignItems: "center",
  },
  notesInput: {
    flex: 1,
    padding: "0.3rem 0.5rem",
    background: "rgba(15, 17, 23, 0.8)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: 6,
    color: "#e2e8f0",
    fontSize: "0.75rem",
    outline: "none",
    minWidth: 80,
    boxSizing: "border-box" as const,
  },
  notesSaveBtn: {
    padding: "0.3rem 0.5rem",
    background: "rgba(16,185,129,0.2)",
    color: "#34d399",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  notesDisplay: {
    cursor: "pointer",
    padding: "0.2rem 0.4rem",
    borderRadius: 4,
    transition: "background 0.2s",
    color: "#94a3b8",
    fontSize: "0.75rem",
  },

  // Empty
  emptyState: {
    textAlign: "center" as const,
    padding: "3rem 1rem",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  emptyText: {
    color: "#64748b",
    fontSize: "0.9rem",
  },
};
