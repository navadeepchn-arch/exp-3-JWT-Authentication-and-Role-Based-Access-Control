import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSelectors";

function Admin() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">SYSTEM</span>
          <h1>Admin Panel</h1>
          <p>
            Manage users, permissions, and system security.
          </p>
        </div>

        <div className="admin-access-badge">
          <span>●</span>
          Administrator
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-icon">◉</div>
          <span>Users</span>
          <strong>3</strong>
          <small>Registered accounts</small>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">◆</div>
          <span>Roles</span>
          <strong>3</strong>
          <small>Access levels configured</small>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">✓</div>
          <span>Security</span>
          <strong>100%</strong>
          <small>Authentication status</small>
        </div>
      </div>

      <section className="workspace-card">
        <div className="workspace-card-header">
          <div>
            <span className="card-eyebrow">USER MANAGEMENT</span>
            <h2>System Users</h2>
          </div>
        </div>

        <div className="user-management-list">
          <div className="managed-user">
            <div className="managed-avatar admin-avatar">
              A
            </div>

            <div className="managed-user-info">
              <strong>Admin User</strong>
              <span>admin</span>
            </div>

            <span className="role-badge role-admin">
              admin
            </span>

            <span className="user-active">
              Active
            </span>
          </div>

          <div className="managed-user">
            <div className="managed-avatar editor-avatar">
              E
            </div>

            <div className="managed-user-info">
              <strong>Editor User</strong>
              <span>editor</span>
            </div>

            <span className="role-badge role-editor">
              editor
            </span>

            <span className="user-active">
              Active
            </span>
          </div>

          <div className="managed-user">
            <div className="managed-avatar viewer-avatar">
              V
            </div>

            <div className="managed-user-info">
              <strong>Viewer User</strong>
              <span>viewer</span>
            </div>

            <span className="role-badge role-viewer">
              viewer
            </span>

            <span className="user-active">
              Active
            </span>
          </div>
        </div>
      </section>

      <section className="security-overview">
        <div className="security-overview-header">
          <div>
            <span className="card-eyebrow">
              SECURITY OVERVIEW
            </span>
            <h2>System Protection</h2>
          </div>

          <span className="secure-status">
            ● Secure
          </span>
        </div>

        <div className="security-checks">
          <div>
            <span>✓</span>
            <p>JWT Authentication</p>
            <strong>Enabled</strong>
          </div>

          <div>
            <span>✓</span>
            <p>Role-Based Access</p>
            <strong>Enabled</strong>
          </div>

          <div>
            <span>✓</span>
            <p>Protected Routes</p>
            <strong>Enabled</strong>
          </div>
        </div>
      </section>

      <p className="admin-footer-note">
        Signed in as <strong>{user?.name}</strong> with
        administrator privileges.
      </p>
    </div>
  );
}

export default Admin;