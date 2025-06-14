import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5100");

const App = () => {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [privateMessage, setPrivateMessage] = useState("");
  const [privateChat, setPrivateChat] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [group, setGroup] = useState("");
  const [groupMessage, setGroupMessage] = useState("");
  const [groupChat, setGroupChat] = useState([]);

  useEffect(() => {
    socket.on("private-message", (data) => {
      setPrivateChat((prev) => [...prev, `${data.sender}: ${data.message}`]);
    });

    socket.on("group-message", (data) => {
      setGroupChat((prev) => [...prev, `${data.sender}: ${data.message}`]);
    });

    return () => socket.disconnect();
  }, []);

  const joinChat = () => {
    socket.emit("join", username);
    setConnected(true);
  };

  const sendPrivateMessage = () => {
    if (privateMessage.trim()) {
      socket.emit("private-message", { receiverId, message: privateMessage });
      setPrivateMessage("");
    }
  };

  const joinRoom = () => {
    socket.emit("join-room", group);
  };

  const sendGroupMessage = () => {
    if (groupMessage.trim()) {
      socket.emit("group-message", { room: group, message: groupMessage });
      setGroupMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!connected ? (
        <>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join Chat</button>
        </>
      ) : (
        <>
          <h3>Private Chat</h3>
          <input
            type="text"
            placeholder="Receiver ID"
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            value={privateMessage}
            onChange={(e) => setPrivateMessage(e.target.value)}
          />
          <button onClick={sendPrivateMessage}>Send</button>
          <div>{privateChat.map((msg, i) => <p key={i}>{msg}</p>)}</div>

          <h3>Group Chat</h3>
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setGroup(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
          <input
            type="text"
            placeholder="Message"
            value={groupMessage}
            onChange={(e) => setGroupMessage(e.target.value)}
          />
          <button onClick={sendGroupMessage}>Send</button>
          <div>{groupChat.map((msg, i) => <p key={i}>{msg}</p>)}</div>
        </>
      )}
    </div>
  );
};

export default App;
