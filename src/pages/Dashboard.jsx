import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserRole,
  selectToken,
} from "../features/auth/authSelectors";

import { decodeMockJWT } from "../utils/jwt";

function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectUserRole);
  const token = useSelector(selectToken);

  const decodedToken = token ? decodeMockJWT(token) : null;

  const roleDescription = {
    admin: "Full system administration and management access.",
    editor: "Content creation and content management access.",
    viewer: "Read-only access to available resources.",
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";

    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="dashboard-page">

      <div className="page-heading">
        <div>
          <span className="page-eyebrow">OVERVIEW</span>

          <h1>Welcome back, {user?.name}</h1>

          <p>
            Manage your account and access the features available
            to your role.
          </p>
        </div>

        <div className={`large-role-badge role-${role}`}>
          {role?.toUpperCase()}
        </div>
      </div>


      <div className="dashboard-grid">

        <div className="stat-card">
          <div className="stat-icon">✓</div>

          <div>
            <span>Authentication</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">◆</div>

          <div>
            <span>Access Level</span>
            <strong>{role?.toUpperCase()}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">◈</div>

          <div>
            <span>Session</span>
            <strong>JWT Secure</strong>
          </div>
        </div>

      </div>


      <div className="dashboard-content-grid">

        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-eyebrow">
                ACCOUNT
              </span>

              <h2>Account Information</h2>
            </div>
          </div>

          <div className="account-details">

            <div className="detail-row">
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="detail-row">
              <span>Username</span>
              <strong>{user?.username}</strong>
            </div>

            <div className="detail-row">
              <span>Role</span>
              <strong>{role}</strong>
            </div>

            <div className="detail-row">
              <span>Access</span>
              <strong>{roleDescription[role]}</strong>
            </div>

          </div>

        </section>


        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-eyebrow">
                SECURITY
              </span>

              <h2>Authentication Status</h2>
            </div>
          </div>

          <div className="security-panel">

            <div className="security-icon">
              ✓
            </div>

            <div>
              <h3>Session authenticated</h3>

              <p>
                Your session is protected using token-based
                authentication.
              </p>
            </div>

          </div>

          <div className="security-list">

            <div>
              <span>JWT Token</span>
              <strong>Valid</strong>
            </div>

            <div>
              <span>Role Verification</span>
              <strong>Enabled</strong>
            </div>

            <div>
              <span>Protected Routes</span>
              <strong>Active</strong>
            </div>

          </div>

        </section>

      </div>


      {/* JWT INSPECTION */}

      <section className="jwt-card">

        <div className="jwt-card-header">

          <div>
            <span className="card-eyebrow">
              TOKEN INSPECTION
            </span>

            <h2>JWT Session Details</h2>

            <p>
              Decoded information from your current authentication
              token.
            </p>
          </div>

          <div className="jwt-valid-badge">
            <span>●</span>
            TOKEN VALID
          </div>

        </div>


        <div className="jwt-grid">

          <div className="jwt-detail">

            <span>Algorithm</span>

            <strong>
              {decodedToken ? "HS256" : "—"}
            </strong>

          </div>


          <div className="jwt-detail">

            <span>Token Type</span>

            <strong>
              JWT
            </strong>

          </div>


          <div className="jwt-detail">

            <span>Subject ID</span>

            <strong>
              {decodedToken?.sub ?? "—"}
            </strong>

          </div>


          <div className="jwt-detail">

            <span>Username</span>

            <strong>
              {decodedToken?.username ?? "—"}
            </strong>

          </div>


          <div className="jwt-detail">

            <span>Issued At</span>

            <strong>
              {formatDate(decodedToken?.iat)}
            </strong>

          </div>


          <div className="jwt-detail">

            <span>Expires At</span>

            <strong>
              {formatDate(decodedToken?.exp)}
            </strong>

          </div>

        </div>


        <div className="jwt-structure">

          <div className="jwt-structure-title">
            <span>JWT STRUCTURE</span>
          </div>

          <div className="jwt-parts">

            <div className="jwt-part">
              <span>01</span>
              <strong>Header</strong>
              <small>Algorithm & type</small>
            </div>

            <div className="jwt-separator">
              .
            </div>

            <div className="jwt-part">
              <span>02</span>
              <strong>Payload</strong>
              <small>User & role claims</small>
            </div>

            <div className="jwt-separator">
              .
            </div>

            <div className="jwt-part">
              <span>03</span>
              <strong>Signature</strong>
              <small>Token verification</small>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;