import React, { useState, useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";
import Message from "./components/Message";
import { FormControl, Input } from "@material-ui/core";
import FlipMove from "react-flip-move";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Scroll from "./components/Scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [css, setCss] = useState(true);
  const [emoji, setEmoji] = useState({ showEmojis: false });

  //get data from db as page load:
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setMessages(
          snap.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    //alll the logic to send a message:
    db.collection("messages").add({
      message: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: userName, text: input }]);
    setInput("");
  };
  const notify = () => {
    setCss(false);
    toast.info(`Welcome ${userName} to Messenger App 😝`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };



  const closeMenu = (e) => {
    setEmoji(
      {
        showEmojis: false,
      },
      
    );
  };
  const showEmojis = (e) => {
    setEmoji(
      {
        showEmojis: true,
      },
     
    );
  };
  // useEffect(() => {}, [setEmoji]);
  return (
    <div className="app">
      <ToastContainer style={{ fontSize: "1.4rem" }} />
      <div
        id="popUp"
        style={css ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <div id="pop">
          <h1 id="heading">Welcome to Facebook Messenger</h1>
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="email"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            disabled={userName.length < 3}
            className="submit btn"
            onClick={notify}
          >
            Register
          </Button>
        </div>
      </div>

      <div className="container">
        <img src="logo.png" alt="logo" className="logo" />
        <h1> Facebook Messenger 🚀</h1>
        {/* input Field */}
        <div className="formBox">

        <form className="form">
          <FormControl className="formControl">
            <Input
              className="input"
              placeholder="message..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              className="iconBtn"
              disabled={!input}
              type="submit"
              variant="contained"
              color="primary"
              onClick={sendMessage}
            >
              <SendIcon  style={{"fontSize": "2rem","cursor":"pointer"}}/>
            </IconButton>
          </FormControl>
          {emoji.showEmojis ? (
        <>
          <Picker
            showPreview={false}
            emoji="point_up"
            emojiSize={30}
            showEmojis={true}
            emojiTooltip={true}
            className={styles.emojiPicker}
            title="WeChat"
            onSelect={(emoji) => setInput(input + emoji.native)}
          />
          <p className="emojiBtn" title="pick emoji" onClick={closeMenu}>
            {String.fromCodePoint(0x1f60a)}
          </p>
        </>
      ) : (
        <p className="emojiBtn" title="pick emoji" onClick={showEmojis}>
          {String.fromCodePoint(0x1f60a)}
        </p>
      )}
        </form>
        </div>
      </div>

      <FlipMove>
        {/*messages */}
        {messages.map(({ message, id }) => {
          return <Message key={id} message={message} username={userName} />;
        })}
      </FlipMove>
      <Scroll showBelow={250}/>
    </div>
  );
};

export default App;
const styles = {
  emojiPicker: {
    cursor: "pointer",
    zIndex: 333,
    position: "fixed",
    bottom: "3.5%",
    right: "4%",
    border: "none",
    margin: 0,
  },
};
