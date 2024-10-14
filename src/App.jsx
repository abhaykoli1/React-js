import { Route, Routes } from "react-router-dom";
import CheckAuth from "./components/common/check-auth";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminRides from "./pages/admin-view/rides";
import AdminOrders from "./pages/admin-view/orders";
import ShopLayout from "./components/user-view/shopLayout";
// import Home from "./pages/user/Dashboard/home";
import UnauthPage from "./pages/unauth-page";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AuthLayout from "./components/auth/layout";
import UserDashboard from "./pages/user/Dashboard";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthLayout2 from "./components/auth/layout2";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userId = auth.currentUser.uid;
      {
        userId ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      // console.log("Autenticaton is :", isAuthenticated);
      // console.log("user - Id :", userId);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);
  console.log("isAuth", isAuthenticated);
  console.log("Role", role);
  // const isAuthenticated = false;
  // const role = "user";

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              role={role}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role}>
              <AuthLayout2 />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rides" element={<AdminRides />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} role={role}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<UserDashboard />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
