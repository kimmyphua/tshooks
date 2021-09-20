import React, { useReducer } from "react";

interface Props {}

const initialState = {
  counter: 100,
};

type ACTIONTYPES =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number };

function counterReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - action.payload,
      };
    default:
      throw new Error("NO NO");
  }
}
function UseReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h1>{state.counter}</h1>
      <button
        onClick={() =>
          dispatch({
            type: "increment",
            payload: 10,
          })
        }
      >
        Increment
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "decrement",
            payload: 10,
          })
        }
      >
        Increment
      </button>
    </div>
  );
}

export default UseReducer;
