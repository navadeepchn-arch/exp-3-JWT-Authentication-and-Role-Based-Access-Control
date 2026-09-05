import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../features/auth/authSelectors";

function Unauthorized() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">

        <div className="unauthorized-icon">
          403
        </div>

        <span className="page-eyebrow">
          ACCESS RESTRICTED
        </span>

        <h1>Permission denied</h1>

        <p>
          Your current role does not have permission to access
          this resource.
        </p>

        <div className="unauthorized-user">
          <span className="mini-avatar">
            {user?.name?.charAt(0)}
          </span>

          <div>
            <strong>{user?.name}</strong>
            <span>
              Signed in as <b>{user?.role}</b>
            </span>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="back-dashboard-button"
        >
          ← Return to Dashboard
        </Link>

      </div>
    </div>
  );
}

export default Unauthorized;