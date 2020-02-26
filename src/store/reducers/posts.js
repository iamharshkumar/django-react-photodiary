import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    posts: null
};

const fetchPosts = (state, action) => {
    return updateObject(state, {
        posts: action.posts
    })

};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS:
           return  fetchPosts(state, action);
        default:
            return state;
    }
};

export default postsReducer;