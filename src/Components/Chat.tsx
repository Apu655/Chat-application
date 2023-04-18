import React, { useEffect, useState } from "react";

type Props = {};

const Chat = ({ socket, username, room }: any) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prev: any) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      console.log("data", data);
      setMessageList((prev: any) => [...prev, data]);
    });
    console.log("asdw", messageList);
  }, [socket]);
  return (
    <div className="chat-app">
      <div className="chat-box">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          {messageList.map((messageContent, index: number) => {
            return (
              <div>
                <div
                  id={username === messageContent.author ? "you" : "other"}
                  key={index}
                >
                  <p className="message-content">{messageContent.message}</p>
                  <p className="meta">{messageContent.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <form className="footer-form" onSubmit={sendMessage}>
          <input
            onChange={(e: any) => setCurrentMessage(e.target.value)}
            type="text"
            placeholder="Hey..."
            value={currentMessage}
          />
          <button type="submit">&#9658;</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
