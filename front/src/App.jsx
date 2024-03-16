import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Users from "./pages/Admin/Users/Users";
import CreateUser from "./pages/Admin/Users/CreateUser";
import MemberDashboard from "./Layouts/MemberDashboard";
import GymDashboard from "./Layouts/GymDashboard";
import Dashboard from "./pages/Admin/Dashboard";
import CreateMembership from "./pages/Admin/Membership/CreateMembership";
import Memberships from "./pages/Admin/Membership/Memberships";
import CreateMembershipMember from "./pages/Admin/MemberMembership/CreateMembershipMember";
import MembershipMembers from "./pages/Admin/MemberMembership/MembershipMembers";

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
              redirectTo="/dashboard"
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
            path="Memberships"
            element={
              <PrivateAdminRoute
                element={<Memberships />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createMembership"
            element={
              <PrivateAdminRoute
                element={<CreateMembership />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                    <Route
            path="MembershipMembers"
            element={
              <PrivateAdminRoute
                element={<MembershipMembers />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="CreateMembershipMember"
            element={
              <PrivateAdminRoute
                element={<CreateMembershipMember />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="Dashboard"
            element={
              <PrivateAdminRoute
                element={<Dashboard />}
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
