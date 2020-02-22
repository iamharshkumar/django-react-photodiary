import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Posts from "./containers/Posts";
import PostCreate from "./containers/PostCreate";
import PostDetail from "./containers/PostDetail";
import UserProfile from "./containers/UserProfile";
import ProfileForm from "./containers/ProfileForm";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={Posts} />
    <Route exact path="/create" component={PostCreate} />
    <Route path="/post/:id" component={PostDetail} />
    <Route path="/profile/:username" component={UserProfile} />
    <Route path="/profiles/:username/edit" component={ProfileForm} />
  </Hoc>
);

export default BaseRouter;
