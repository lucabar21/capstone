import { useEffect, useState } from "react";
import Message from "./sub_components/Message";

const Messages = () => {
  const [messages, setMessages] = useState(null);

  const messageRequest = () => {
    fetch("http://localhost:8000/api/contacts")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    messageRequest();
  }, []);

  return (
    <div className="messages-container">
      {messages && messages.map((message) => <Message message={message} key={message.id} />)}
    </div>
  );
};
export default Messages;
