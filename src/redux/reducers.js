import { combineReducers } from 'redux';
import {commonReducer} from "./common/reducer";
import {filterReducer} from "./filter/reducer";

export const rootReducer = combineReducers({
    common:commonReducer,
    filter: filterReducer
});
