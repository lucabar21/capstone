import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthUser from "./AuthUser";
import { setAuth } from "../../redux/reducers/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const { http, fetchCSRFToken, saveToken } = useAuthUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    await fetchCSRFToken();

    try {
      const response = await http.post("/login", { email, password });
      const { user, token } = response.data;
      saveToken(user, token);
      dispatch(setAuth({ user, token }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      setError("Credenziali non corrette");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      <h3>Sei già un Pet's Super Hero? Accedi qui</h3>
      <form onSubmit={submitForm}>
        <div className="custom-input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="custom-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>{" "}
        {error && <div className="error-login">{error}</div>}
        <Link to="/register">
          <span>Non sei ancora un Pet's Super Hero?</span>
        </Link>
        <button type="submit">Accedi</button>
      </form>
    </div>
  );
};
export default Login;
