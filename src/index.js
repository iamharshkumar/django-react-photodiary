import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import postsReducer from "./store/reducers/posts";
import userFeed from "./store/reducers/userFeed";
import userProfileReducer from "./store/reducers/userProfile";
import userIdReducer from "./store/reducers/userId";
import postDetailReducer from "./store/reducers/postDetail";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    userFeed: userFeed,
    userProfile: userProfileReducer,
    user: userIdReducer,
    postDetail: postDetailReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
