import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../services/AuthUser";

const Register = () => {
  const { http, saveToken, fetchCSRFToken } = AuthUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    http
      .post("/register", {
        name: name,
        surname: surname,
        email: email,
        password: password,
        password_confirmation: passwordConf,
        remember_token: "",
      })
      .then((res) => {
        const { user, token, rememberToken } = res.data;
        saveToken(user, token, rememberToken);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors);
          console.error("Errore durante la registrazione:", error);
          setErrors("Errore durante la registrazione. Riprova più tardi.");
        }
      });
  };
  return (
    <main>
      <div className="register-container">
        <h3>Registrati e diventa un Pet's Super Hero!</h3>
        <form action="">
          <div className="custom-input">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="custom-input">
            <label htmlFor="surname">Cognome</label>
            <input type="text" id="surname" onChange={(e) => setSurname(e.target.value)} required />
          </div>
          <div className="custom-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="custom-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="custom-input">
            <label htmlFor="password_confirmation">Conferma password</label>
            <input
              type="password"
              id="password_confirmation"
              onChange={(e) => setPasswordConf(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={submitForm}>
            Registrati
          </button>
        </form>
        {errors && <div className="error-login">{errors}</div>}
      </div>
    </main>
  );
};
export default Register;
