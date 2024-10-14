import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, role, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/shop/home" />;
    } else {
      if (role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else if (role === "user") {
        return <Navigate to="/shop/home" />;
      }
    }
  }



  // if (
  //   !isAuthenticated
  //   // &&
  //   // !(
  //   //   location.pathname.includes("/login") ||
  //   //   location.pathname.includes("/register")
  //   // )
  // ) {
  //   return <Navigate to="/auth/login" />;
  // }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role === "user") {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth" />;
//     } else {
//       if (role === "admin") {
//         return <Navigate to="/admin/dashboard" />;
//       } else {
//         return <Navigate to="/shop/home" />;
//       }
//     }
//   }

//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/auth")
//       // location.pathname.includes("/register")
//     )
//   ) {
//     return <Navigate to="/auth" />;
//   }

//   if (
//     isAuthenticated &&
//     location.pathname.includes("/auth")
//     // location.pathname.includes("/register")
//   ) {
//     if (role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     } else {
//       return <Navigate to="/shop/home" />;
//     }
//   }

//   if (
//     isAuthenticated &&
//     role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauth-page" />;
//   }

//   if (
//     isAuthenticated &&
//     role === "admin" &&
//     location.pathname.includes("shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

export default CheckAuth;
