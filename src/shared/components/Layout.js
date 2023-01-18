import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LoginPage from "../../authPages/LoginPage/LoginPage";

function Layout({ children }) {
  const user = useSelector((state) => state.auth.userDetails);

  return (
    <>
      {user ? (
        <>
          {" "}
          <Navbar />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "30%",
                height: "100%",
                minHeight: "700px",
                backgroundColor: "green",
              }}
            ></div>
            <div
              style={{ width: "70%", height: "100%", backgroundColor: "green" }}
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
