import { createStore } from 'redux';
import authReducer from "../store/reducers/auth";

const store = createStore(authReducer);

export default store;
