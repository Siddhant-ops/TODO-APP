import React from "react";
import "./Posts.css";
import db from "../../firebase";
import { useStateValue } from "../../Context/StateProvider";
import { Button } from "@material-ui/core";

const Posts = ({ subject, date, deleteid }) => {
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
  return (
    <div className="list__postsContainer xyz-in" xyz="fade up-5 stagger">
      <div className="list__textContainer">
        <p>{subject}</p>
        <span>{date}</span>
      </div>
      <div className="list__button">
        <Button
          onClick={() => {
            db.collection("users")
              .doc(userName)
              .collection("todos")
              .doc(deleteid)
              .delete();
          }}
          variant="outlined"
          color="secondary"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Posts;
