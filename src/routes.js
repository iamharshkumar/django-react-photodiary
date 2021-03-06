import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Posts from "./containers/Posts";
import PostCreate from "./containers/PostCreate";
import PostDetail from "./containers/PostDetail";
import UserProfile from "./containers/UserProfile";
import ProfileForm from "./containers/ProfileForm";
import UserFeed from "./containers/UserFeed";
import Followers from "./containers/Followers";
import Following from "./containers/Following";
import PostEdit from "./containers/PostEdit";

const BaseRouter = () => (
    <Hoc>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/create" component={PostCreate}/>
        <Route path="/edit/:id" component={PostEdit}/>
        <Route path="/post/:id" component={PostDetail}/>
        <Route path="/profile/:username" component={UserProfile}/>
        <Route path="/profiles/:username/edit" component={ProfileForm}/>
        <Route path="/userfeed/" component={UserFeed}/>
        <Route path="/:username/followers/" component={Followers}/>
        <Route path="/:username/following/" component={Following}/>
    </Hoc>
);

export default BaseRouter;
