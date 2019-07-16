import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "../routes";
import withTracker from "../withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { DefaultLayout } from "../layouts";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <DefaultLayout>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return <route.component {...props} />;
              })}
            />
          );
        })}
      </div>
    </DefaultLayout>
  </Router>
);
