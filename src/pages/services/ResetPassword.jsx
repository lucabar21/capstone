import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  // Prendo il token dall'URL
  const { token } = useParams();

  // Prendo la mail dall'URL
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Controllo che le password siano uguali
    if (password !== confirmPassword) {
      setMessage("Le password non corrispondono");
      return;
    }

    fetch("http://localhost:8000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email,
        password,
      }),
    })
      .then((response) => {
        console.log("ciao");
        return response.json();
      })
      .then((data) => {
        setMessage("Password modificata con successo!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setMessage("Errore nel reset della password");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        console.log(error);
      });
  };
  return (
    <main>
      <div className="password-container">
        <h3>Reset della password</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="custom-input">
            <label htmlFor="password">Nuova Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="custom-input">
            <label htmlFor="confirmPassword">Conferma Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {message && <div className="error-login">{message}</div>}
          <button className="log-btn" type="submit">
            Reset
          </button>
        </form>
      </div>
    </main>
  );
};
export default ResetPassword;
