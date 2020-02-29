import * as actionTypes from './actionTypes';
import axios from 'axios';
import {createComment, likes, postDetailURL} from "../constants";

const postDetail = (post_data) => {
    return {
        type: actionTypes.POST_DETAIL,
        postDetail: post_data
    }
};

export const fetchPostLike = (data) => {
    return dispatch => {
        axios.defaults.headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.post(likes, data)
            .then(res => {
                dispatch(postDetail(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
};

export const addComment = (data) => {
    return dispatch => {
        axios.defaults.headers = {
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.post(createComment, data)
            .then(res => {
                dispatch(postDetail(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
};

export const fetchPostDetail = (post_id) => {
    return dispatch => {
        axios.get(postDetailURL(post_id))
            .then(res => {
                console.log(res.data);
                dispatch(postDetail(res.data))
            })
            .catch(err => {
                console.log(err)
            });
    }
};