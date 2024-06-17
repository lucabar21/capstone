export const GET_DATA = "GET_DATA";

// ADS FETCH
export const getAds = () => {
  return (dispatch, getState) => {
    const URL = "http://127.0.0.1:8000/api/ads";

    fetch(URL)
      .then((response) => response.json())

      .then((data) => dispatch({ type: GET_DATA, payload: data }))
      .catch((error) => console.log(error));
  };
};
