import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "../reducers";
import authReducer from "../reducers/authSlice";

const store = configureStore({
  reducer: {
    ads: adsReducer,
    auth: authReducer,
  },
});
export default store;
