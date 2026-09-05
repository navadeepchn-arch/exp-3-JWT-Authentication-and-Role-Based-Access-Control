import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Content from "./pages/Content";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route path="/login" element={<Login />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />


      {/* AUTHENTICATED ROUTES */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>

          {/* Admin + Editor + Viewer */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* Admin + Editor ONLY */}

          <Route element={
            <ProtectedRoute
              allowedRoles={["admin", "editor"]}
            />
          }>
            <Route
              path="/content"
              element={<Content />}
            />
          </Route>


          {/* Admin ONLY */}

          <Route element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            />
          }>
            <Route
              path="/admin"
              element={<Admin />}
            />
          </Route>

        </Route>

      </Route>


      {/* FALLBACK */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;