import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import MainMap from "./components/Maps/MainMap";
import Dashboard from "./components/Dashboard";

export default (
  <Switch>
    <Route path="/" exact component={MainMap}></Route>
    <Route path="/login" exact component={Login}></Route>
    <Route path="/register" exact component={Register}></Route>
    <Route path="/dashboard" exact component={Dashboard}></Route>
  </Switch>
);
