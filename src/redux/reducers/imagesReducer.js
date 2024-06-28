import { GET_IMAGES } from "../actions";

const initialState = {
  file: null,
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
};
export default imagesReducer;
