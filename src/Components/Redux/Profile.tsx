import React from "react";
import { useSelector } from "react-redux";
import { selectUser, selecColor } from "../../store/reduxstore";
import { changeColor } from "../../store/reduxstore";
import { useDispatch } from "react-redux";

function Profile() {
  const user = useSelector(selectUser);
  const color = useSelector(selecColor);
  const dispatch = useDispatch();

  const style = {
    backgroundColor: color === "dark" ? "black" : "white",
    color: color === "dark" ? "pink" : "black",
  };
  //   const themeColor = useSelector((state) => state.theme.value);

  return (
    <div style={style}>
      <h1> Profile Page</h1>
      <p> Name: {user.name} </p>
      <p> Age: {user.age}</p>
      <p> Email: {user.email}</p>
      <p>
        Theme :
        <button
          style={{
            backgroundColor: color === "dark" ? "red" : "",
            color: color === "dark" ? "black" : "",
          }}
          onClick={() => {
            dispatch(changeColor("dark"));
          }}
        >
          dark
        </button>
        <button
          style={{
            backgroundColor: color === "light" ? "red" : "",
            color: color === "light" ? "black" : "",
          }}
          onClick={() => {
            dispatch(changeColor("light"));
          }}
        >
          light
        </button>
      </p>
    </div>
  );
}

export default Profile;
