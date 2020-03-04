import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    userId: {}
};

const userId = (state, action) => {
    return updateObject(state, {
        userId: action.user
    })
};

const userIdReducer = (state = initialState, action) =>  {
    switch (action.type) {
        case actionTypes.USER_ID:
            return userId(state, action);
        default:
            return state
    }
};

export default userIdReducer;