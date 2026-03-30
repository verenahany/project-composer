/**
 * Preview top bar — renders notification bell and user profile dropdown
 * in the composer preview area. Based on GoAI One TopBar/NotificationBell/ProfileDropdown.
 */

import { useState } from 'react'
import { Bell, User, LogOut, ChevronDown } from 'lucide-react'
import type { SidebarConfig } from '../config/schema'

interface Props {
  sidebarConfig: SidebarConfig
}

const DEMO_NOTIFICATIONS = [
  { id: 1, title: 'New task assigned to you', type: 'task', time: '2m ago', read: false },
  { id: 2, title: 'Project "Dashboard" updated', type: 'project', time: '15m ago', read: false },
  { id: 3, title: 'Document uploaded successfully', type: 'document', time: '1h ago', read: true },
  { id: 4, title: 'Weekly report is ready', type: 'report', time: '3h ago', read: true },
]

function NotificationBellPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="prev-topbar__bell-wrap">
      <button
        className="prev-topbar__bell-btn"
        onClick={() => setOpen(!open)}
        title="Notifications"
      >
        <Bell size={16} />
        <span className="prev-topbar__bell-badge">3</span>
      </button>

      {open && (
        <>
          <div className="prev-topbar__backdrop" onClick={() => setOpen(false)} />
          <div className="prev-topbar__notif-dropdown">
            <div className="prev-topbar__notif-header">
              <span className="prev-topbar__notif-title">Notifications</span>
              <button className="prev-topbar__notif-action">Mark all read</button>
            </div>
            <div className="prev-topbar__notif-list">
              {DEMO_NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className={`prev-topbar__notif-item ${!n.read ? 'prev-topbar__notif-item--unread' : ''}`}
                >
                  <div className="prev-topbar__notif-item-content">
                    <span className={`prev-topbar__notif-badge prev-topbar__notif-badge--${n.type}`}>
                      {n.type}
                    </span>
                    {!n.read && <span className="prev-topbar__notif-dot" />}
                  </div>
                  <p className="prev-topbar__notif-text">{n.title}</p>
                  <span className="prev-topbar__notif-time">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ProfileDropdownPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="prev-topbar__profile-wrap">
      <button
        className="prev-topbar__profile-btn"
        onClick={() => setOpen(!open)}
        title="User menu"
      >
        <span className="prev-topbar__avatar">
          <User size={14} />
        </span>
        <span className="prev-topbar__user-info">
          <span className="prev-topbar__user-name">John Doe</span>
          <span className="prev-topbar__user-status">
            <span className="prev-topbar__status-dot prev-topbar__status-dot--online" />
            <span>Online</span>
          </span>
        </span>
        <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <div className="prev-topbar__backdrop" onClick={() => setOpen(false)} />
          <div className="prev-topbar__profile-dropdown">
            <div className="prev-topbar__profile-header">
              <p className="prev-topbar__profile-name">John Doe</p>
              <p className="prev-topbar__profile-email">john@example.com</p>
            </div>
            <div className="prev-topbar__profile-divider" />
            <div className="prev-topbar__profile-meta">
              <span>Role: <strong>Admin</strong></span>
            </div>
            <div className="prev-topbar__profile-meta">
              <span>Position: <strong>Developer</strong></span>
            </div>
            <div className="prev-topbar__profile-divider" />
            <button className="prev-topbar__profile-menu-item">
              <User size={13} />
              <span>View Profile</span>
            </button>
            <div className="prev-topbar__profile-divider" />
            <button className="prev-topbar__profile-menu-item prev-topbar__profile-menu-item--danger">
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function PreviewTopBar({ sidebarConfig }: Props) {
  const { showProfile, showNotifications } = sidebarConfig.props
  if (!showProfile && !showNotifications) return null

  return (
    <div className="prev-topbar">
      <div className="prev-topbar__actions">
        {showNotifications && <NotificationBellPreview />}
        {showProfile && <ProfileDropdownPreview />}
      </div>
    </div>
  )
}
