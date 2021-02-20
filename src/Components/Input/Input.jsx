import React, { useState } from "react";
import firebase from "firebase";
import db from "../../firebase";
import { Button } from "@material-ui/core";
import "./Input.css";
import { useStateValue } from "../../Context/StateProvider";

const Input = () => {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  function getUserName(str) {
    var splitStr = str.split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join("_");
  }

  const userName = getUserName(user.displayName) + "_" + user.uid;

  let mydate = new Date().toDateString();
  const send_task = async (e) => {
    e.preventDefault();
    await db.collection("users").doc(userName).collection("todos").add({
      task: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      time: mydate,
    });
    setInput("");
  };

  return (
    <div className="list__inputContainer">
      <div className="list__inputMain">
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="list__input"
            type="text"
            name=""
            id=""
            placeholder="List it Down!!!"
          />
          <Button
            type="submit"
            onClick={send_task}
            disabled={!input}
            variant="outlined"
            color="secondary"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Input;
