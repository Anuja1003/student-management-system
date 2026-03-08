import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import GuestFooter from "../guestLayout/GuestFooter";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'admin') {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        console.error("Invalid user data in localStorage");
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div style={{position:"fixed",top:"0",width:"100%",zIndex:"100"}}><AdminNavbar /></div>
      <div style={{minHeight:"100vh",marginTop:"80px"}}><Outlet /></div>
      <GuestFooter />
    </>
  );
};

export default AdminLayout;