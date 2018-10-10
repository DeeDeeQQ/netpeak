import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import List from "./components/List";
import Post from "./components/Post";

const App = props => (
  <Router basename={props.path}>
    <div>
      <Route exact path="/" component={List} />
      <Route path="/post/:postId" component={Post} />
    </div>
  </Router>
);

export default App;
