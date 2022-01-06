import React, { forwardRef } from "react";
import "../Message.css";
//forwardRef is a higher order function function:
const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  let time =
    message.timestamp === null
      ? new Date().toLocaleTimeString()
      : new Date(message.timestamp.toDate()).toLocaleTimeString();

  return (
    <div ref={ref} className={`messageCard ${isUser && "messageUser"}`}>
      <main className={`"msger-chat" messageCard ${isUser && "messageUser"}`}>
        <div className={isUser ? "msg right-msg" : "msg left-msg"}>
          <div
            className="msg-img"
            style={
              isUser
                ? { backgroundImage: `url("me.png")` }
                : { backgroundImage: `url("u.png")` }
            }
          ></div>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">
                {!isUser && `${message.username || "unknown user"}`}
                {isUser && `${username}`}
              </div>
              <div className="msg-info-time">{time}</div>
            </div>
            <div className="msg-text">{message.message}</div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default Message;
