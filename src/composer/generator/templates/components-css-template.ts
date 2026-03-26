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
`
}
