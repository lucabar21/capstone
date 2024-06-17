import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="contact-container">
      <h3>Mandaci un messaggio!</h3>
      <form action="">
        <div className="custom-input">
          <FaUser />
          <input type="text" id="name" placeholder="Nome" />
        </div>
        <div className="custom-input">
          <IoMail />
          <input type="email" id="email" placeholder="Email@esempio.it" />
        </div>
        <div className="custom-textarea">
          <textarea id="content" cols="125" rows="4" placeholder="Il tuo messaggio..." />
        </div>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};
export default Contact;
