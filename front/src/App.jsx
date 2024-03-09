import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Users from "./pages/Admin/Users/Users";
import CreateUser from "./pages/Admin/Users/CreateUser";
import MemberDashboard from "./Layouts/MemberDashboard";
import GymDashboard from "./Layouts/GymDashboard";

function isAuthenticated() {
  const accessToken = Cookies.get("accessToken");
  return accessToken !== undefined && accessToken !== null;
}

function isAdmin() {
  const roleId = Cookies.get("roleId");
  return roleId === "1";
}
function isMember() {
  const roleId = Cookies.get("roleId");
  return roleId === "2"; 
}
function PrivateMemberRoute({ element, authenticated, redirectTo }) {
  return authenticated && isMember() ? element : <Navigate to={redirectTo} />;
}
function PrivateAdminRoute({ element, authenticated, isAdmin, redirectTo }) {
  return authenticated && isAdmin ? element : <Navigate to={redirectTo} />;
}
function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? element : <Navigate to={redirectTo} />;
}
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login"}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PrivateRoute
              element={<Login />}
              authenticated={!isAuthenticated()}
              redirectTo="/admin"
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute
              element={<GymDashboard />}
              authenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              redirectTo="/login"
            />
          }
        >
          <Route
            path="createUser"
            element={
              <PrivateAdminRoute
                element={<CreateUser />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />

          <Route
            path="users"
            element={
              <PrivateAdminRoute
                element={<Users />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
        </Route>
        <Route
  path="/member"
  element={
    <PrivateMemberRoute
      element={<MemberDashboard />}
      authenticated={isAuthenticated()}
      isMember={isMember()}
      redirectTo="/login"
    />
  }
>
</Route>
      </Routes>
    </>
  );
}

export default App;
