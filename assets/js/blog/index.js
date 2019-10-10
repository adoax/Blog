import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Article from "./article";
import Category from "./category";

export default function Index() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/react/article">Article</Link>
            </li>
            <li>
              <Link to="/react/category">Category</Link>
            </li>
          </ul>
        </nav>
        <Switch>
            <Route path="/react/article">
                <Article/>
            </Route>
            <Route path="/react/category">
                <Category/>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}
