import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Posts from "./containers/Posts";
import PostCreate from "./containers/PostCreate";
import PostDetail from "./containers/PostDetail";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={Posts} />
    <Route exact path="/create" component={PostCreate} />
    <Route path="/post/:id" component={PostDetail} />
  </Hoc>
);

export default BaseRouter;
