import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export default function configureStore() {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}
