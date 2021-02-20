import React, { useEffect, useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import Input from "../Input/Input";
import Posts from "../Posts/Posts";
import db from "../../firebase";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
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

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  const userShowName = titleCase(user.displayName);

  useEffect(() => {
    db.collection("users")
      .doc(userName)
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map((doc) => doc));
      });
  }, []);

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__brand">
            <h1>Do-IT</h1>
          </div>
          <div className="navbar__details">
            <p className="navbar__name">
              Hello, <span>{userShowName}</span>
            </p>
          </div>
        </div>
      </nav>
      <div className="main">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <Input />
        <div className="list__feed">
          {tasks.map((obj) => (
            <Posts
              key={obj.data().task}
              subject={obj.data().task}
              date={obj.data().time}
              deleteid={obj.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
