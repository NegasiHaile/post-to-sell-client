import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  const arrMiddleware = [middleware];

  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    // arrMiddleware.push(createLogger());
    return composeWithDevTools(applyMiddleware(...arrMiddleware));
  }
  return applyMiddleware(...arrMiddleware);
};

function configureStore({ isServer }) {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducers, bindMiddleware(sagaMiddleware));
  } else {
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["auth", "profile", "basket", "checkout"],
    };
    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = createStore(persistedReducer, bindMiddleware(sagaMiddleware));

    store.runSagaTask = () => {
      store.sagaTask = sagaMiddleware.run(sagas);
    };

    store.runSagaTask();
    store.__persistor = persistStore(store);

    return store;
  }
}

export const wrapper = createWrapper(configureStore, { debug: true });
