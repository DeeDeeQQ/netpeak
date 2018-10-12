import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loadable from "react-loadable";

import "./App.css";
import List from "./components/List";

const LoadablePost = Loadable({
  loader: () => import("./components/Post"),
  loading: () => <div>Loading...</div>
});

const App = props => (
  <Router basename={props.path}>
    <div>
      <Route exact path="/" component={List} />
      <Route path="/post/:postId" component={LoadablePost} />
    </div>
  </Router>
);

export default App;
