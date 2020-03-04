import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    userProfile: null,
    loading: false
};

const userProfile = (state, action) => {
    return updateObject(state, {
        userProfile: action.userProfile,
        loading: false
    });
};

const fetchProfileStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE:
            return userProfile(state, action);
        case actionTypes.FETCH_PROFILE_START:
            return fetchProfileStart(state);
        default:
            return state
    }
};

export default userProfileReducer;