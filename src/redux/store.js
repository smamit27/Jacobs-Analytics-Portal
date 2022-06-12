import { rootReducer } from './reducers';
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const environment = process.env.NODE_ENV
const middleware = environment === 'development' ? applyMiddleware(promise, thunk, logger) : applyMiddleware(promise, thunk)

export default () => {
    return createStore(rootReducer, middleware);
}
