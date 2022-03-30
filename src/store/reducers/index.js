import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import accountsReducer from "./accounts.reducer";
import storageSession from "redux-persist/lib/storage/session";
import experienceReducer from "./experience.reducer";


const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['accounts'],
  migrate: async (state) => {
    return {
      ...state,
      accounts: {
        ...state.accounts,
        loading: false,
      }
    };
  },
};

const rootReducer = combineReducers({
  accounts: accountsReducer,
  experience: experienceReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
