import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";

const Message = ({ message }) => {
  const [show, setShow] = useState(false);

  const handleDropdown = (e) => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="message" key={message.id}>
      <h5>
        <IoMailOutline onClick={handleDropdown} />
        {message.name}
      </h5>
      {show && (
        <div className="message-text">
          <h6>{message.email}</h6>
          <p>{message.message}</p>
        </div>
      )}
    </div>
  );
};
export default Message;
