import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    postDetail: null
};

const post = (state, action) => {
    return updateObject(state, {
        postDetail: action.postDetail
    })
};

const postDetailReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_DETAIL:
            return post(state, action);
        case actionTypes.POST_LIKE:
            return post(state, action);
        default:
            return state
    }
};

export default postDetailReducer;
