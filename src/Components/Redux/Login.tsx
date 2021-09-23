import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/reduxstore";

interface User {
  name: string;
  age: number;
  email: string;
}

function Login() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState<User>({ name: "", age: 0, email: "" });

  function onChange(e: any) {
    e.preventDefault();
    setInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  return (
    <div>
      <p>
        <input
          type="text"
          name="name"
          placeholder="input name"
          onChange={onChange}
        />
      </p>
      <p>
        <input
          type="number"
          name="age"
          placeholder="input age"
          onChange={onChange}
        />
      </p>
      <p>
        <input
          type="email"
          name="email"
          placeholder="input email"
          onChange={onChange}
        />
      </p>

      <button
        onClick={() => {
          dispatch(login(info));
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Login;
