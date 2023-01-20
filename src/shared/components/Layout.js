import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LoginPage from "../../authPages/LoginPage/LoginPage";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const user = useSelector((state) => state?.auth?.userDetails);

  return (
    <>
      {user ? (
        <>
          {" "}
          <Navbar />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                width: "30%",
                height: "100%",
                minHeight: "700px",
                backgroundColor: "green",
              }}
            >
              {user.isAdmin && (
                <>
                  <Link to="/addVehicle">Add Car</Link>
                  <Link to="/AddNewAnnouncement">Add New Announcement</Link>
                </>
              )}
            </div>
            <div
              style={{
                width: "70%",
                height: "100%",
                padding: "10px 10px 10px 10px",
              }}
            >
              {children}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default Layout;
