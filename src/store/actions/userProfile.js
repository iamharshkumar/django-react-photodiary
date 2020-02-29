import * as actionTypes from './actionTypes';
import axios from 'axios';
import {profileView} from "../constants";

const userProfile = (userProfile) => {
    return {
        type: actionTypes.USER_PROFILE,
        userProfile: userProfile,
    }
};

export const profileData = (username) => {
    return dispatch => {
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