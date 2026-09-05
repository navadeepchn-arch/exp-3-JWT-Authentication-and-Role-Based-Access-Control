import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";
import {
  selectCurrentUser,
  selectUserRole,
} from "../features/auth/authSelectors";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectUserRole);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">E3</div>

        <div>
          <h2>SecureHub</h2>
          <span>Authentication & RBAC</span>
        </div>
      </div>

      <div className="navbar-user">
        <div className="user-info">
          <strong>{user?.name}</strong>
          <span className={`role-badge role-${role}`}>
            {role}
          </span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;