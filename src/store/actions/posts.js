import * as actionTypes from './actionTypes'
import axios from "axios";
import {postListURL, userFeed} from "../constants";

export const fetchPosts = posts => {
    return {
        type: actionTypes.FETCH_POSTS,
        posts: posts
    }
};

export const postsFetch = () => {

    return dispatch => {
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

