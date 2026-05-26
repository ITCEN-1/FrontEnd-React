// primitives.jsx — small, reusable building blocks for the 동네픽 UI kit.

// ---------- ICON ---------- (inline SVG, currentColor stroke, Lucide-shaped)
const LUCIDE_PATHS = {
  "train-front":
    '<rect x="6" y="3" width="12" height="15" rx="2"/><path d="M6 11h12"/><circle cx="9" cy="14.5" r=".6" fill="currentColor"/><circle cx="15" cy="14.5" r=".6" fill="currentColor"/><path d="M8 19l-3 2"/><path d="M16 19l3 2"/>',
  "shopping-bag":
    '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  "library-big":
    '<rect x="3" y="6" width="4" height="16" rx="1"/><rect x="9" y="2" width="4" height="20" rx="1"/><path d="M18.5 8.5l3 8-5 2-3-8z"/>',
  hospital:
    '<rect x="2" y="4" width="20" height="18" rx="2"/><path d="M2 8h20"/><path d="M12 11v6"/><path d="M9 14h6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  wallet:
    '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M14 12a2 2 0 0 0 0 4h6v-4z"/><path d="M3 7h16"/>',
  sparkles:
    '<path d="M9.94 8.06L12 2l2.06 6.06L20 10l-5.94 1.94L12 18l-2.06-6.06L4 10z"/><path d="M19 3l.7 1.8L21.5 5.5l-1.8.7L19 8l-.7-1.8L16.5 5.5l1.8-.7z"/>',
  "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  "check-circle": '<circle cx="12" cy="12" r="10"/><polyline points="9 11 12 14 16 9"/>',
  "arrow-right": '<path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>',
  "refresh-cw":
    '<path d="M21 12a9 9 0 0 0-15-6.7L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15 6.7L21 16"/><path d="M21 21v-5h-5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  "map-pinned": '<path d="M5 9.7c0 6.3 7 12.3 7 12.3s7-6 7-12.3a7 7 0 1 0-14 0z"/><circle cx="12" cy="10" r="3"/>',
  "pen-line": '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  "layout-dashboard":
    '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  "bar-chart-3": '<path d="M3 3v18h18"/><path d="M8 17V9"/><path d="M13 17V5"/><path d="M18 17v-3"/>',
  "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><path d="M12 15V3"/>',
};

export function Icon({ name, size = 18, style, ...rest }) {
  const inner = LUCIDE_PATHS[name] || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "middle", flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
}

// ---------- BUTTON ----------
function Button({ variant = "primary", size, block, leftIcon, children, ...rest }) {
  const cls = ["dp-btn", `dp-btn--${variant}`, size && `dp-btn--${size}`, block && "dp-btn--block"]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} {...rest}>
      {leftIcon && <Icon name={leftIcon} size={size === "lg" ? 18 : 16} />}
      {children}
    </button>
  );
}

// ---------- FIELD (label + input + hint/error) ----------
function Field({ label, required, hint, error, children }) {
  return (
    <div className="dp-field">
      {label && (
        <label className="dp-label">
          {label}
          {required && <span className="req">*</span>}
        </label>
      )}
      {children}
      {error ? <div className="dp-err">{error}</div> : hint ? <div className="dp-hint">{hint}</div> : null}
    </div>
  );
}
function Input({ error, ...rest }) {
  return <input className={"dp-input" + (error ? " dp-input--error" : "")} {...rest} />;
}
function InputWithUnit({ unit, ...rest }) {
  return (
    <div className="dp-input-group">
      <input className="dp-input" {...rest} />
      <span className="dp-unit">{unit}</span>
    </div>
  );
}

// ---------- TAG / PILL ----------
function Tag({ variant = "primary", dot, children }) {
  return (
    <span className={`dp-tag dp-tag--${variant}`}>
      {dot && <span className="dot" style={{ background: dotColor(variant) }} />}
      {children}
    </span>
  );
}
function dotColor(v) {
  return { primary: "#FF6B4A", success: "#1FB87A", warning: "#F5B400", info: "#2A3F5F", danger: "#FF4D4F" }[v];
}
function Pill({ active, onClick, children }) {
  return (
    <button className={"dp-pill" + (active ? " dp-pill--active" : "")} onClick={onClick}>
      {children}
    </button>
  );
}

// ---------- CARD ----------
function Card({ variant, padless, children, style, ...rest }) {
  const cls = ["dp-card", variant && `dp-card--${variant}`, padless && "dp-card--padless"].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
}

// ---------- RANK ROW ----------
function RankRow({ rank, dong, gu, score, sub, active, onClick }) {
  const numCls = rank === 1 ? "" : rank === 2 ? "r2" : rank === 3 ? "r3" : "r4plus";
  return (
    <div className={"dp-rank-row" + (active ? " dp-rank-row--active" : "")} onClick={onClick}>
      <div className={"dp-rank-row__num " + numCls}>{rank}</div>
      <div className="dp-rank-row__name">
        <b>
          {gu} {dong}
        </b>
        <span>{sub}</span>
      </div>
      <div className="dp-rank-row__score">{score.toFixed(1)}</div>
    </div>
  );
}

// ---------- PROGRESS ----------
function Progress({ step, total }) {
  const pct = (step / total) * 100;
  return (
    <div className="dp-progress">
      <div className="dp-progress__head">
        <h4>설문 진행 상황</h4>
        <b>
          {step} / {total} 단계
        </b>
      </div>
      <div className="dp-progress__track">
        <div className="dp-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ---------- LIKERT (상/중/하) ----------
function Likert({ icon, title, desc, value, onChange }) {
  const opts = [
    { k: "low", l: "하" },
    { k: "mid", l: "중" },
    { k: "high", l: "상" },
  ];
  return (
    <div className="dp-likert">
      <div className="dp-likert__icon">
        <Icon name={icon} size={20} />
      </div>
      <div className="dp-likert__label">
        <b>{title}</b>
        <span>{desc}</span>
      </div>
      <div className="dp-likert__opts">
        {opts.map((o) => (
          <button
            key={o.k}
            className={"dp-likert__opt" + (value === o.k ? " dp-likert__opt--selected" : "")}
            onClick={() => onChange(o.k)}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- TOP NAV ----------
function TopNav({ route, navigate, user = "정민준" }) {
  const tabs = [
    { id: "dashboard", label: "대시보드" },
    { id: "history", label: "히스토리" },
    { id: "board", label: "게시판" },
  ];
  return (
    <nav className="dp-nav">
      <a className="dp-nav__logo" onClick={() => navigate("/")}>
        <img src={window.__resources.wordmark} alt="동네픽" />
      </a>
      <div className="dp-nav__links">
        {tabs.map((t) => (
          <a
            key={t.id}
            className={"dp-nav__link" + (route.startsWith("/" + t.id) ? " active" : "")}
            onClick={() => navigate("/" + t.id)}
          >
            {t.label}
          </a>
        ))}
      </div>
      <div className="dp-nav__right">
        <span style={{ fontSize: 13, color: "var(--fg-2)" }}>{user}님</span>
        <div className="dp-avatar">{user[0]}</div>
      </div>
    </nav>
  );
}

Object.assign(window, {
  Icon,
  Button,
  Field,
  Input,
  InputWithUnit,
  Tag,
  Pill,
  Card,
  RankRow,
  Progress,
  Likert,
  TopNav,
});
