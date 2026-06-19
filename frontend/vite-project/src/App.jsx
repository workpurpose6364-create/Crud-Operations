import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "token"
    );

  return token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/otp"
          element={<Otp />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;