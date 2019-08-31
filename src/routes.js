import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Project from "./pages/Project";
import Appointment from "./pages/Appointment";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/project/:id" component={Project} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
