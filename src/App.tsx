import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Components/Chat";
import "./App.css";
function App() {
  const [message, setMessage] = useState<string>();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState<number | string>();
  const socket = io("http://localhost:5000");

  const sendRoom = () => {
    socket.emit("join_room", room);
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {});
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setMessage(value);
  };

  return (
    <div className="App">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRoom(e.target.value)
        }
        placeholder="Room number .."
      ></input>

      <input
        placeholder="Enter name..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <button onClick={sendRoom}>Submit</button>

      {/* <p>{messageList.length>=1 && messageList.map((message:string)=>(
        <p>{message}</p>
      ))}</p> */}
      <Chat socket={socket} room={room} username={username} />
    </div>
  );
}

export default App;
