import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/reducers/authSlice";

const useAuthUser = () => {
  const dispatch = useDispatch();

  const fetchCSRFToken = async () => {
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
  };

  const saveToken = (user, token, rememberToken) => {
    dispatch(setAuth({ user, token, rememberToken }));
  };

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/auth",
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  return {
    saveToken,
    http,
    fetchCSRFToken,
  };
};

export default useAuthUser;
