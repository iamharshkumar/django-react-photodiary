import axios from "axios";
import {userFeed} from "../constants";
import * as actionTypes from "./actionTypes";

export const fetchUserfeed = userFeed => {
    return {
        type: actionTypes.USER_FEED,
        userFeed: userFeed
    }
};

export const userfeedFetch = () => {
    return dispatch => {
        axios.defaults.headers = {
            Authorization: `Token ${localStorage.getItem("token")}`
        };
        axios.get(userFeed)
            .then(res => {
                console.log(res.data)
                dispatch(fetchUserfeed(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
};