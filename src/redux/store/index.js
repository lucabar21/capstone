import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "../reducers";
import authReducer from "../reducers/authSlice";
import imagesReducer from "../reducers/imagesReducer";

const store = configureStore({
  reducer: {
    ads: adsReducer,
    auth: authReducer,
    media: imagesReducer,
  },
});
export default store;
