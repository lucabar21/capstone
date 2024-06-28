import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/forgot-password", { email });
      setMessage("Controlla la tua mail, ti abbiamo inviato un link per il reset della password.");
      setTimeout(() => {
        setMessage(null);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Errore nell'invio del link per il reset della password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <main>
      <div className="reset-container">
        <h3>Recupera le tue credenziali</h3>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Indirizzo Email"
            required
          />
          <span onClick={handleSubmit}>Invia</span>
        </form>
        {message && (
          <div style={{ marginTop: "0.5rem" }} className="error-login">
            {message}
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
