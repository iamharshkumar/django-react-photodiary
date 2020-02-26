import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";


const initialState = {
    posts: null
};

const fetchUserfeed = (state, action) => {
    return updateObject(state, {
        userFeed: action.userFeed
    })
};

const userFeed = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_FEED:
            return fetchUserfeed(state, action);
        default:
            return state

    }
};

export default userFeed;