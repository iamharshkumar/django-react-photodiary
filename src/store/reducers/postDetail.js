import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    postDetail: {},
    loading: false
};

const post = (state, action) => {
    return updateObject(state, {
        postDetail: action.postDetail,
        loading: false
    })
};

const postStart = (state) => {
    return updateObject(state, {
        loading: true
    })
};

const postDetailReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_DETAIL:
            return post(state, action);
        case actionTypes.POST_LIKE:
            return post(state, action);
        case actionTypes.POST_DETAIL_START:
            return postStart(state);
        default:
            return state
    }
};

export default postDetailReducer;
