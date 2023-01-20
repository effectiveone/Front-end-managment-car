import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import AddNewVehicleForm from "./Dashboard/AddNewVehicleForm";
import AddNewAnnouncement from "./Dashboard/AddNewAnnouncement";
import AlertNotification from "./shared/components/AlertNotification";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/addVehicle">
            <AddNewVehicleForm />
          </Route>
          <Route exact path="/AddNewAnnouncement">
            <AddNewAnnouncement />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
      <AlertNotification typeOfAlert="info" />
    </>
  );
}

export default App;
