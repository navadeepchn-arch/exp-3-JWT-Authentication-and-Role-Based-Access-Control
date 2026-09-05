import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSelectors";

function Content() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="workspace-page">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">WORKSPACE</span>
          <h1>Content Management</h1>
          <p>
            Create, organize, and manage application content.
          </p>
        </div>

        <div className="page-action">
          <span className="action-icon">+</span>
          New Content
        </div>
      </div>

      <div className="content-stats">
        <div className="content-stat-card">
          <span className="content-stat-icon">▣</span>
          <div>
            <small>Total Content</small>
            <strong>24</strong>
          </div>
        </div>

        <div className="content-stat-card">
          <span className="content-stat-icon">✓</span>
          <div>
            <small>Published</small>
            <strong>18</strong>
          </div>
        </div>

        <div className="content-stat-card">
          <span className="content-stat-icon">◷</span>
          <div>
            <small>Drafts</small>
            <strong>6</strong>
          </div>
        </div>
      </div>

      <section className="workspace-card">
        <div className="workspace-card-header">
          <div>
            <span className="card-eyebrow">CONTENT LIBRARY</span>
            <h2>Recent Content</h2>
          </div>

          <span className="permission-label">
            Editor Access
          </span>
        </div>

        <div className="content-table">
          <div className="content-table-head">
            <span>CONTENT</span>
            <span>STATUS</span>
            <span>AUTHOR</span>
            <span>UPDATED</span>
          </div>

          <div className="content-row">
            <div className="content-title">
              <span className="content-avatar">01</span>
              <div>
                <strong>Authentication Guide</strong>
                <small>Security documentation</small>
              </div>
            </div>

            <span className="status published">
              Published
            </span>

            <span>Admin User</span>
            <span>Today</span>
          </div>

          <div className="content-row">
            <div className="content-title">
              <span className="content-avatar">02</span>
              <div>
                <strong>RBAC Documentation</strong>
                <small>Access control guide</small>
              </div>
            </div>

            <span className="status published">
              Published
            </span>

            <span>Editor User</span>
            <span>Yesterday</span>
          </div>

          <div className="content-row">
            <div className="content-title">
              <span className="content-avatar">03</span>
              <div>
                <strong>Security Checklist</strong>
                <small>Application security</small>
              </div>
            </div>

            <span className="status draft">
              Draft
            </span>

            <span>{user?.name}</span>
            <span>2 days ago</span>
          </div>
        </div>
      </section>

      <div className="permission-banner">
        <div className="permission-banner-icon">✓</div>

        <div>
          <strong>Content permissions verified</strong>
          <p>
            Your <b>{user?.role}</b> role has permission to
            access and manage content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content; 