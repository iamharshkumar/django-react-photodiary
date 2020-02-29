import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    userProfile: null
};

const userProfile = (state, action) => {
    return updateObject(state, {
        userProfile: action.userProfile
    });
};

const userProfileReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE:
            return userProfile(state, action);
        default:
            return state
    }
};

export default userProfileReducer;