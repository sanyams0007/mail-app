import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Constants } from "./constants";

import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage,
};

let initialState = {
  read: [],
  favorite: [],
  currentMail: {},
  mails: [],
};

const reducer = (state = initialState, action) => {
  //console.log({ state, action });

  switch (action.type) {
    case Constants.SETCURRENT: {
      return {
        ...state,
        currentMail: { ...action.payload },
      };
    }

    case Constants.SETMAIL: {
      return {
        ...state,
        mails: [...action?.payload],
      };
    }

    /* case Constants.UNSETCURRENT: {
      return {
        ...state,
        currentMail: {},
      };
    }

    case Constants.SETFILTER: {
      return {
        ...state,
        filterProp: action.payload,
      };
    } */

    case Constants.MARKFAVORITE: {
      const mailID = action.payload;

      const isFav = state.favorite.find((id) => id === mailID || false);

      if (isFav) return { ...state };
      else
        return {
          ...state,
          favorite: [...state.favorite, mailID],
        };
    }

    case Constants.MARKREAD: {
      const mailID = action.payload;

      const isRead = state.read.find((id) => id === mailID || false);

      if (isRead) return { ...state };
      else
        return {
          ...state,
          read: [...state.read, mailID],
        };
    }

    default: {
      return { ...state };
    }
  }
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

persistStore(store);

export default store;
