import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import AdminTaskTable from "./Dashboard/AdminTaskTable";

import MyWallet from "./Dashboard/MyWallet";

import AddNewVehicleForm from "./Dashboard/AddNewVehicleForm";
import AddNewAnnouncement from "./Dashboard/AddNewAnnouncement";
import AddNewTask from "./Dashboard/AddNewTask";
import MapWithEVStations from "./Dashboard/MapWithEVStations";
import AlertNotification from "./shared/components/AlertNotification";
import EditUser from "./Dashboard/EditUser";
import MyTasks from "./Dashboard/MyTasks";
import MyReservations from "./Dashboard/MyReservations";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addVehicle" element={<AddNewVehicleForm />} />
        <Route path="/AddNewAnnouncement" element={<AddNewAnnouncement />} />
        <Route path="/AddNewTask" element={<AddNewTask />} />
        <Route path="/MapWithEVStations" element={<MapWithEVStations />} />
        <Route path="/EditUser" element={<EditUser />} />
        <Route path="/MyTasks" element={<MyTasks />} />
        <Route path="/MyWallet" element={<MyWallet />} />
        <Route path="/MyReservations" element={<MyReservations />} />
        <Route path="/AdminTaskTable" element={<AdminTaskTable />} />

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      <AlertNotification typeOfAlert="info" />
    </Router>
  );
}

export default App;
