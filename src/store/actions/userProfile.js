import * as actionTypes from './actionTypes';
import axios from 'axios';
import {profileView, userFollow} from "../constants";
import {authAxios} from "../../utils";

const userProfile = (userProfile) => {
    return {
        type: actionTypes.USER_PROFILE,
        userProfile: userProfile,
    }
};

const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
};

export const userFollowing = (username, action) => {
    return dispatch => {
        axios.defaults.headers = {
            Authorization: `Token ${localStorage.getItem("token")}`
        };
        axios.post(userFollow(username), action)
            .then(res => {
                console.log(res.data.data);
                dispatch(userProfile(res.data))
            })
            .then(err => {
                console.log(err)
            })
    }
};

export const profileData = (username) => {
    return dispatch => {
        dispatch(fetchProfileStart());

        axios.defaults.headers = {
            Authorization: `Token ${localStorage.getItem("token")}`
        };
        axios.get(profileView(username))
            .then(res => {
                console.log(res.data)
                dispatch(userProfile(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
};