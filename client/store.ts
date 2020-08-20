import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducers from './reducers/index';
// import { composeWithDevTools } from 'redux-devtools-extension';

export type TAppState = ReturnType<typeof reducers>;
export type AppThunk = ThunkAction<void, TAppState, unknown, Action<string>>;

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
