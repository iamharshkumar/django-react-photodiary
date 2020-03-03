import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    posts: [],
    loading: false
};

const fetchPosts = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        loading: false
    })

};

const fetchPostsStart = (state) => {
    return updateObject(state, {
        loading: true
    })
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS:
           return  fetchPosts(state, action);
        case actionTypes.POSTS_FETCH:
            return fetchPostsStart(state)
        default:
            return state;
    }
};

export default postsReducer;