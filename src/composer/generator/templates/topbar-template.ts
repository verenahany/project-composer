import type { ProjectConfig } from '../../config/schema'

export function buildTopBarComponent(config: ProjectConfig): string {
  const { showProfile, showNotifications } = config.sidebar.props

  return `import { useState } from 'react'
import { Bell, User, LogOut, ChevronDown } from 'lucide-react'

interface TopBarProps {
  embedded?: boolean
}

${showNotifications ? buildNotificationBell() : ''}

${showProfile ? buildProfileDropdown() : ''}

export default function TopBar({ embedded }: TopBarProps) {
  if (embedded) {
    return (
      <>
        ${showNotifications ? '<NotificationBell />' : ''}
        ${showProfile ? '<ProfileDropdown />' : ''}
      </>
    )
  }

  return (
    <div className="topbar">
      <div className="topbar__spacer" />
      <div className="topbar__actions">
        ${showNotifications ? '<NotificationBell />' : ''}
        ${showProfile ? '<ProfileDropdown />' : ''}
      </div>
    </div>
  )
}
`
}

function buildNotificationBell(): string {
  return `const DEMO_NOTIFICATIONS = [
  { id: 1, title: 'New task assigned to you', type: 'task', time: '2m ago', read: false },
  { id: 2, title: 'Project "Dashboard" updated', type: 'project', time: '15m ago', read: false },
  { id: 3, title: 'Document uploaded successfully', type: 'document', time: '1h ago', read: true },
  { id: 4, title: 'Weekly report is ready', type: 'report', time: '3h ago', read: true },
]

function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotif = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="topbar__bell-wrap">
      <button className="topbar__bell-btn" onClick={() => setOpen(!open)} title="Notifications">
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="topbar__bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>
      {open && (
        <>
          <div className="topbar__backdrop" onClick={() => setOpen(false)} />
          <div className="topbar__notif-dropdown">
            <div className="topbar__notif-header">
              <span className="topbar__notif-title">Notifications</span>
              <div className="topbar__notif-header-actions">
                {unreadCount > 0 && (
                  <button className="topbar__notif-action" onClick={markAllRead}>Mark all read</button>
                )}
                {notifications.length > 0 && (
                  <button
                    className="topbar__notif-action topbar__notif-action--danger"
                    onClick={() => setNotifications([])}
                  >Clear all</button>
                )}
              </div>
            </div>
            <div className="topbar__notif-list">
              {notifications.length === 0 ? (
                <p className="topbar__notif-empty">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={\`topbar__notif-item \${!n.read ? 'topbar__notif-item--unread' : ''}\`}
                    onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div className="topbar__notif-item-top">
                      <span className={\`topbar__notif-badge topbar__notif-badge--\${n.type}\`}>{n.type}</span>
                      {!n.read && <span className="topbar__notif-dot" />}
                    </div>
                    <p className="topbar__notif-text">{n.title}</p>
                    <div className="topbar__notif-item-bottom">
                      <span className="topbar__notif-time">{n.time}</span>
                      <button
                        className="topbar__notif-delete"
                        onClick={(e) => { e.stopPropagation(); deleteNotif(n.id) }}
                      >×</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}`
}

function buildProfileDropdown(): string {
  return `function ProfileDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="topbar__profile-wrap">
      <button className="topbar__profile-btn" onClick={() => setOpen(!open)} title="User menu">
        <span className="topbar__avatar">
          <User size={16} />
        </span>
        <span className="topbar__user-info">
          <span className="topbar__user-name">John Doe</span>
          <span className="topbar__user-status">
            <span className="topbar__status-dot topbar__status-dot--online" />
            <span>Online</span>
          </span>
        </span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <>
          <div className="topbar__backdrop" onClick={() => setOpen(false)} />
          <div className="topbar__profile-dropdown">
            <div className="topbar__profile-header">
              <span className="topbar__avatar topbar__avatar--lg">
                <User size={20} />
              </span>
              <div>
                <p className="topbar__profile-name">John Doe</p>
                <p className="topbar__profile-email">john@example.com</p>
              </div>
            </div>
            <div className="topbar__profile-divider" />
            <div className="topbar__profile-meta">Role: <strong>Admin</strong></div>
            <div className="topbar__profile-meta">Position: <strong>Developer</strong></div>
            <div className="topbar__profile-divider" />
            <button className="topbar__profile-menu-item" onClick={() => setOpen(false)}>
              <User size={14} /> View Profile
            </button>
            <div className="topbar__profile-divider" />
            <button className="topbar__profile-menu-item topbar__profile-menu-item--danger" onClick={() => setOpen(false)}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}`
}
