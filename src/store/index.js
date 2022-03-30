import thunk from "redux-thunk";
import persistedReducer from "./reducers";
import { persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistedStore = persistStore(store)

export default store;
