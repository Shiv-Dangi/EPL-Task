import { combineReducers } from 'redux';
import EplReducer from './HomePage';

const rootReducer = combineReducers({ eplData: EplReducer });

export default rootReducer;
