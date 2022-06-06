import { useState, useEffect } from "react";
import { socket } from "../shared/socket";

const Chat = ({ username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessagesList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-header">Live chat</div>
      <div className="chat-body">
        {messagesList.map((messageContent) => {
          return <h1>{messageContent.message}</h1>;
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="start typing"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
      </div>
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
};

export default Chat;
