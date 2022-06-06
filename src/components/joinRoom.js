import { useState } from "react";
import { socket } from "../shared/socket";
import Chat from "./chat";

const JoinRoom = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const join = () => {
    if (email !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div>
          <label>Username: </label>
          <input
            placeholder="Enter username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Room: </label>
          <input
            placeholder="Enter room id"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={join}>Join room</button>
        </div>
      ) : (
        <Chat username={email} room={room} />
      )}
    </div>
  );
};

export default JoinRoom;
