import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loginSuccess,
  loginFailure,
  clearAuthError,
} from "../features/auth/authSlice";

import { selectAuthError } from "../features/auth/authSelectors";
import { mockUsers } from "../features/auth/mockUsers";
import { createMockJWT, decodeMockJWT } from "../utils/jwt";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectAuthError);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(clearAuthError());

    const user = mockUsers.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (!user) {
      dispatch(loginFailure("Invalid username or password."));
      return;
    }

    const token = createMockJWT(user);
    const decodedUser = decodeMockJWT(token);

    dispatch(
      loginSuccess({
        token,
        user: decodedUser,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-background-shape shape-one"></div>
      <div className="login-background-shape shape-two"></div>

      <div className="login-container">

        {/* LEFT SIDE */}
        <section className="login-showcase">
          <div className="showcase-content">

            <div className="showcase-logo">
              <div className="showcase-logo-icon">E3</div>

              <div>
                <strong>SecureHub</strong>
                <span>Identity Platform</span>
              </div>
            </div>

            <div className="showcase-main">
              <div className="security-badge">
                <span className="pulse-dot"></span>
                SECURE AUTHENTICATION
              </div>

              <h1>
                Your access.
                <br />
                <span>Your control.</span>
              </h1>

              <p>
                A secure role-based workspace powered by
                token authentication and permission-aware
                navigation.
              </p>
            </div>

            <div className="security-features">

              <div className="security-feature">
                <div className="feature-icon">✓</div>

                <div>
                  <strong>JWT Authentication</strong>
                  <span>Stateless token-based sessions</span>
                </div>
              </div>

              <div className="security-feature">
                <div className="feature-icon">◆</div>

                <div>
                  <strong>Role-Based Access</strong>
                  <span>Permissions matched to your role</span>
                </div>
              </div>

              <div className="security-feature">
                <div className="feature-icon">◈</div>

                <div>
                  <strong>Protected Routes</strong>
                  <span>Unauthorized access is blocked</span>
                </div>
              </div>

            </div>

            <div className="showcase-footer">
              <span>EXPERIMENT 3</span>
              <span className="footer-line"></span>
              <span>FULL STACK DEVELOPMENT</span>
            </div>
          </div>
        </section>


        {/* RIGHT SIDE */}
        <section className="login-form-section">

          <div className="login-card">

            <div className="mobile-brand">
              <div className="showcase-logo-icon">E3</div>

              <div>
                <strong>SecureHub</strong>
                <span>Identity Platform</span>
              </div>
            </div>

            <div className="login-heading">
              <span className="login-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to your workspace</h2>

              <p>
                Enter your credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">

              <div className="input-group">
                <label htmlFor="username">
                  Username
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">◉</span>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>


              <div className="input-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">◆</span>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>


              {error && (
                <div className="login-error">
                  <span>!</span>
                  {error}
                </div>
              )}


              <button
                type="submit"
                className="login-submit"
              >
                <span>Sign in securely</span>
                <span className="submit-arrow">→</span>
              </button>

            </form>


            <div className="demo-section">

              <div className="demo-heading">
                <span>DEMO ACCESS</span>
                <span className="demo-line"></span>
              </div>

              <div className="demo-roles">

                <button
                  type="button"
                  className="demo-role admin-demo"
                  onClick={() => {
                    setUsername("admin");
                    setPassword("admin123");
                  }}
                >
                  <span className="demo-role-icon">A</span>

                  <span>
                    <strong>Admin</strong>
                    <small>Full access</small>
                  </span>
                </button>


                <button
                  type="button"
                  className="demo-role editor-demo"
                  onClick={() => {
                    setUsername("editor");
                    setPassword("editor123");
                  }}
                >
                  <span className="demo-role-icon">E</span>

                  <span>
                    <strong>Editor</strong>
                    <small>Content access</small>
                  </span>
                </button>


                <button
                  type="button"
                  className="demo-role viewer-demo"
                  onClick={() => {
                    setUsername("viewer");
                    setPassword("viewer123");
                  }}
                >
                  <span className="demo-role-icon">V</span>

                  <span>
                    <strong>Viewer</strong>
                    <small>Read-only access</small>
                  </span>
                </button>

              </div>

            </div>


            <div className="login-security-note">
              <span className="secure-lock">✓</span>

              <span>
                Your session is protected with
                <strong> JWT authentication</strong>
              </span>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Login;