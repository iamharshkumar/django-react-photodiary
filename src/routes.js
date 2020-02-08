import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import Posts from "./containers/Posts";
import PostCreate from "./containers/PostCreate";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={Posts} />
    <Route path="/post/create" component={PostCreate} />
  </Hoc>
);

export default BaseRouter;
