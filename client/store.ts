import { createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducers from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from 'redux-devtools-extension';

export type TAppState = ReturnType<typeof reducers>;
export type AppThunk = ThunkAction<void, TAppState, unknown, Action<string>>;

const persistConfig = {
  key: 'root',
  storage: storage,
};
const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(pReducer, applyMiddleware(thunk, logger));

export default store;
export const persistor = persistStore(store);
