export function buildComponentsCss(): string {
  return `/* Layout */
.app {
  display: flex;
  min-height: 100vh;
}

.app--horizontal {
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main__header {
  padding: 32px 32px 0;
}

.main__header h1 {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
}

.main__header p {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--composer-muted-foreground);
}

.main__content {
  flex: 1;
  padding: 0 32px 32px;
  max-width: 700px;
}

/* ── Vertical Sidebar ─────────────────────────────────── */

.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  background: var(--composer-sidebar-bg);
  color: var(--composer-sidebar-fg);
  border-right: 1px solid var(--composer-sidebar-border);
  flex-shrink: 0;
  transition: width 200ms ease;
}

.sidebar--collapsed {
  width: 56px;
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid var(--composer-sidebar-border);
}

.sidebar__brand {
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: var(--composer-sidebar-hover);
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
}

.sidebar__toggle:hover {
  opacity: 0.85;
}

.sidebar__nav {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 150ms ease;
}

.sidebar--collapsed .sidebar__item {
  justify-content: center;
  padding: 10px;
}

.sidebar__item:hover {
  background: var(--composer-sidebar-hover);
}

.sidebar__item--active {
  background: var(--composer-sidebar-active);
  color: var(--composer-sidebar-active-fg);
}

.sidebar__item--active:hover {
  background: var(--composer-sidebar-active);
}

.sidebar__footer {
  padding: 12px;
  border-top: 1px solid var(--composer-sidebar-border);
  text-align: center;
  font-size: 12px;
  opacity: 0.6;
}

/* ── Horizontal Header Bar ────────────────────────────── */

.header-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 56px;
  padding: 0 24px;
  background: var(--composer-card);
  border-bottom: 1px solid var(--composer-border);
  flex-shrink: 0;
}

.header-bar__brand {
  font-size: 16px;
  font-weight: 700;
  color: var(--composer-primary);
  white-space: nowrap;
}

.header-bar__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}

.header-bar__tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--composer-muted-foreground);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 150ms ease;
}

.header-bar__tab:hover {
  background: var(--composer-muted);
}

.header-bar__tab--active {
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
}

/* ── Chat Components ──────────────────────────────────── */

.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--composer-card);
  border: 1px solid var(--composer-border);
}

.chat__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--composer-border);
  font-size: 14px;
  font-weight: 600;
}

.chat__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  margin-left: auto;
}

.chat__messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* HAIVE & Support rows */
.chat__row {
  display: flex;
  gap: 8px;
  max-width: 80%;
}

.chat__row--user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chat__row--assistant {
  align-self: flex-start;
}

.chat__avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat__avatar--assistant,
.chat__avatar--bot {
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
}

.chat__avatar--user {
  background: var(--composer-muted);
  color: var(--composer-muted-foreground);
}

.chat__bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.5;
}

.chat__bubble p { margin: 0; }

.chat__bubble--assistant {
  background: var(--composer-muted);
  color: var(--composer-foreground);
}

.chat__bubble--user {
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
}

.chat__time {
  display: block;
  font-size: 11px;
  color: var(--composer-muted-foreground);
  margin-top: 4px;
}

.chat__bubble--typing { padding: 12px 18px; }

.chat__dots { display: flex; gap: 5px; }

.chat__dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--composer-muted-foreground);
  animation: dot-bounce 1.2s infinite;
}

.chat__dots span:nth-child(2) { animation-delay: 0.15s; }
.chat__dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-5px); opacity: 1; }
}

/* Bubbles variant */
.chat__bubble-row {
  display: flex;
  gap: 8px;
  max-width: 80%;
}

.chat__bubble-row--bot,
.chat__bubble-row--agent {
  align-self: flex-start;
}

.chat__bubble-row--customer {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chat__badge {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.chat__badge--bot {
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
}

.chat__badge--agent {
  background: var(--composer-accent, #d96628);
  color: #ffffff;
}

.chat__badge--customer {
  background: var(--composer-muted);
  color: var(--composer-muted-foreground);
}

.chat__bubble-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat__sender {
  font-size: 12px;
  font-weight: 600;
  color: var(--composer-muted-foreground);
}

.chat__bubble--bot {
  background: var(--composer-muted);
  color: var(--composer-foreground);
}

.chat__bubble--agent {
  background: var(--composer-secondary);
  color: #ffffff;
}

.chat__bubble--customer {
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
}

/* Chat input */
.chat__input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--composer-border);
}

.chat__input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--composer-border);
  border-radius: 10px;
  font-size: 14px;
  background: var(--composer-muted);
  color: var(--composer-foreground);
  outline: none;
}

.chat__input:focus {
  border-color: var(--composer-primary);
}

.chat__send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: var(--composer-primary);
  color: var(--composer-primary-foreground);
  cursor: pointer;
}

.chat__send:hover {
  opacity: 0.9;
}

/* ── Presentation AI chat input bar ─────────────────── */

.chat__pres-input-bar {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--composer-border);
  border-radius: 0 0 12px 12px;
  background: var(--composer-muted);
}

.chat__pres-textarea {
  width: 100%;
  min-height: 42px;
  max-height: 120px;
  resize: none;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-family: inherit;
  color: var(--composer-foreground);
  outline: none;
}

.chat__pres-textarea::placeholder {
  color: var(--composer-muted-foreground);
}

.chat__pres-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 4px 12px 10px;
}

.chat__pres-mic,
.chat__pres-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--composer-border);
  cursor: pointer;
  transition: background 150ms;
}

.chat__pres-mic {
  background: var(--composer-card);
  color: var(--composer-foreground);
}

.chat__pres-mic:hover {
  background: var(--composer-muted);
}

.chat__pres-mic--active {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.chat__pres-send {
  background: var(--composer-card);
  color: var(--composer-foreground);
}

.chat__pres-send:hover {
  background: var(--composer-muted);
}

/* ===================================================================
   TopBar — notification bell + profile dropdown
   =================================================================== */

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  min-height: 56px;
  padding: 0 20px;
  border-bottom: 1px solid var(--composer-border);
  background: var(--composer-card);
  position: sticky;
  top: 0;
  z-index: 40;
}

.topbar__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--composer-foreground);
  cursor: pointer;
}

.topbar__toggle:hover {
  background: var(--composer-muted);
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ── Notification bell ─────────────────────────────── */

.topbar__bell-wrap {
  position: relative;
}

.topbar__bell-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--composer-foreground);
  cursor: pointer;
}

.topbar__bell-btn:hover {
  background: var(--composer-muted);
}

.topbar__bell-badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.topbar__backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.topbar__notif-dropdown {
  position: absolute;
  right: 0;
  top: 42px;
  z-index: 50;
  width: 340px;
  max-height: 420px;
  background: var(--composer-card);
  border: 1px solid var(--composer-border);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar__notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--composer-border);
}

.topbar__notif-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--composer-foreground);
}

.topbar__notif-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar__notif-action {
  font-size: 12px;
  color: var(--composer-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.topbar__notif-action:hover {
  text-decoration: underline;
}

.topbar__notif-action--danger {
  color: #ef4444;
}

.topbar__notif-list {
  overflow-y: auto;
  flex: 1;
}

.topbar__notif-empty {
  padding: 24px 16px;
  text-align: center;
  font-size: 13px;
  color: var(--composer-muted-foreground);
}

.topbar__notif-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--composer-border);
  cursor: pointer;
  transition: background 150ms;
}

.topbar__notif-item:last-child {
  border-bottom: none;
}

.topbar__notif-item:hover {
  background: var(--composer-muted);
}

.topbar__notif-item--unread {
  border-left: 3px solid var(--composer-primary);
}

.topbar__notif-item-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.topbar__notif-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
}

.topbar__notif-badge--task { background: var(--composer-primary); }
.topbar__notif-badge--project { background: #8b5cf6; }
.topbar__notif-badge--document { background: #14b8a6; }
.topbar__notif-badge--report { background: #f59e0b; }

.topbar__notif-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--composer-primary);
  flex-shrink: 0;
}

.topbar__notif-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--composer-foreground);
  margin: 0;
  line-height: 1.4;
}

.topbar__notif-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.topbar__notif-time {
  font-size: 11px;
  color: var(--composer-muted-foreground);
}

.topbar__notif-delete {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--composer-muted-foreground);
  cursor: pointer;
  font-size: 14px;
}

.topbar__notif-delete:hover {
  color: #ef4444;
  background: var(--composer-muted);
}

/* ── Profile dropdown ──────────────────────────────── */

.topbar__profile-wrap {
  position: relative;
}

.topbar__profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 4px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--composer-foreground);
  cursor: pointer;
}

.topbar__profile-btn:hover {
  background: var(--composer-muted);
}

.topbar__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--composer-primary) 15%, transparent);
  color: var(--composer-primary);
  flex-shrink: 0;
}

.topbar__avatar--lg {
  width: 40px;
  height: 40px;
}

.topbar__user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.topbar__user-name {
  font-size: 13px;
  font-weight: 500;
}

.topbar__user-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--composer-muted-foreground);
}

.topbar__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #94a3b8;
}

.topbar__status-dot--online { background: #22c55e; }
.topbar__status-dot--away { background: #eab308; }
.topbar__status-dot--busy { background: #ef4444; }

.topbar__profile-dropdown {
  position: absolute;
  right: 0;
  top: 42px;
  z-index: 50;
  width: 260px;
  background: var(--composer-card);
  border: 1px solid var(--composer-border);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  padding: 6px 0;
}

.topbar__profile-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
}

.topbar__profile-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--composer-foreground);
  margin: 0;
}

.topbar__profile-email {
  font-size: 12px;
  color: var(--composer-muted-foreground);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topbar__profile-divider {
  height: 1px;
  background: var(--composer-border);
  margin: 4px 0;
}

.topbar__profile-meta {
  padding: 4px 16px;
  font-size: 12px;
  color: var(--composer-muted-foreground);
}

.topbar__profile-meta strong {
  color: var(--composer-foreground);
}

.topbar__profile-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: transparent;
  font-size: 13px;
  color: var(--composer-foreground);
  cursor: pointer;
  text-align: left;
  transition: background 150ms;
}

.topbar__profile-menu-item:hover {
  background: var(--composer-muted);
}

.topbar__profile-menu-item--danger {
  color: #ef4444;
}
`
}
