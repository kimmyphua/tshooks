import React, { ReactElement, useState, useContext } from "react";
import { ThemeContext, UserContext, UserState } from "../store/store";
interface Props {}

function ConsumerComp() {
  const user = useContext<UserState>(UserContext);
  return (
    <div>
      <h2>First Name : {user.firstName}</h2>
      <h2>Last Name : {user.lastName}</h2>
    </div>
  );
}

const ThemeComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: theme === "dark" ? "black" : "pink" }}>
      The theme is {theme}
    </div>
  );
};

function UseContextComponent(): ReactElement {
  const [user, setUser] = useState<UserState>({
    firstName: "elton",
    lastName: "ang",
  });

  return (
    <div>
      <ThemeContext.Provider value="light">
        <ThemeComponent />

        <UserContext.Provider value={user}>
          <ConsumerComp />
          <button
            onClick={() =>
              setUser({
                firstName: "kimmy",
                lastName: "phua",
              })
            }
          >
            Change Context
          </button>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default UseContextComponent;
