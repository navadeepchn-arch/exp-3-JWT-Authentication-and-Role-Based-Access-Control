import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserRole } from "../features/auth/authSelectors";

function Sidebar() {
  const role = useSelector(selectUserRole);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span>MAIN MENU</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">⌂</span>
          Dashboard
        </NavLink>

        {(role === "admin" || role === "editor") && (
          <NavLink
            to="/content"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">▣</span>
            Content
          </NavLink>
        )}

        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">⚙</span>
            Admin Panel
          </NavLink>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">◉</span>
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="security-status">
          <span className="status-dot"></span>

          <div>
            <strong>Session Secure</strong>
            <small>JWT authenticated</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;