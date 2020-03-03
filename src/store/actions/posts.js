import * as actionTypes from './actionTypes'
import axios from "axios";
import {postListURL} from "../constants";

export const fetchPosts = posts => {
    return {
        type: actionTypes.FETCH_POSTS,
        posts: posts
    }
};

export const postFetchStart = () => {
    return {
        type: actionTypes.POSTS_FETCH
    }
};

export const postsFetch = () => {
    return dispatch => {
        dispatch(postFetchStart())
        axios.get(postListURL)
            .then(res => {
                // console.log(res.data);
                dispatch(fetchPosts(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
};

