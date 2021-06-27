import React from "react";
import { Switch, Route } from "react-router-dom";
import {store} from './store'
// import { Switch, Route, Redirect } from "react-router-dom";

// import HomePage from "./pages/HomePage";
import GanttChart from "./pages/ganttChart";
import Details from "./pages/detailsTable";
import HomePage from "./pages/homePage";
import NoResult from "./pages/noResult";
import Team from "./pages/teamTable";
import Costs from "./pages/costsTable";
import Revenue from "./pages/revenueTable";
import Options from "./pages/setupTable";
import Risks from "./pages/risks";

// function protectedRoute(Component, props) {
//   // Not really secure. Any token would pass the test.
//   if (localStorage.getItem("token")) {
//     return <Component {...props} />;
//   }
//   return <Redirect to="/login" />;
// }

const admin = store.getState().user.admin

const adminView = admin ? Options : NoResult

const Router = () => (
  <Switch>
    <Route exact path="/gantt" component={GanttChart} />
    <Route exact path="/project" component={Details} />
    <Route exact path="/team" component={Team} />
    <Route exact path="/costs" component={Costs} />
    <Route exact path="/revenue" component={Revenue} />
    <Route exact path="/risks" component={Risks} />
    <Route exact path="/admin" component={adminView} />
    <Route exact path="/" component={HomePage} />
    <Route path="/" component={NoResult} />
  </Switch>
);
export default Router;
