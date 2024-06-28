import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Contact = () => {
  const [alert, setAlert] = useState(null);
  const [messages, setMessages] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactMessageRequest = () => {
    fetch("http://localhost:8000/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Errore ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessages({
          ...messages,
          name: "",
          email: "",
          message: "",
        });
        setAlert("Messaggio inviato con successo! Grazie per averci contattato.");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  const handleMessage = (e) => {
    const { name, value } = e.target;
    setMessages({
      ...messages,
      [name]: value,
    });
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    contactMessageRequest();
  };

  return (
    <main>
      <div className="contact-text">
        <h3>Per noi ogni contributo è importante!</h3>
        <p>
          Contattaci per eventuali feedback, per problematiche da risolvere o per segnalare bug da correggere. Siamo
          sempre pronti ad ascoltare nuove opinioni che possano migliorare la vostra esperienza e sopratutto l'efficenza
          per l'aiuto degli animali che ne hanno bisogno.
        </p>
      </div>
      <div className="contact-container">
        <h3>Mandaci un messaggio!</h3>
        <form onSubmit={handleMessageSubmit}>
          <div className="custom-input">
            <FaUser />
            <label htmlFor="password">Nome</label>
            <input type="text" name="name" id="name" value={messages.name} onChange={handleMessage} required />
          </div>
          <div className="custom-input">
            <IoMail />
            <label htmlFor="password">Email</label>
            <input type="email" name="email" id="email" value={messages.email} onChange={handleMessage} required />
          </div>
          <div className="custom-textarea">
            <textarea
              name="message"
              id="message"
              cols="125"
              rows="4"
              placeholder="Il tuo messaggio..."
              value={messages.message}
              onChange={handleMessage}
              required
            />
          </div>
          {alert && <span className="confirm-message">{alert}</span>}
          <button type="submit">Invia</button>
        </form>
      </div>
    </main>
  );
};
export default Contact;
