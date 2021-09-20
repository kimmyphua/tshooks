import React, { ReactElement, useState, useEffect } from "react";

interface Props {}

function UseState({}: Props): ReactElement {
  const [val, setVal] = useState(1);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setVal((val) => val + 1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return <div>{val}</div>;
}

export default UseState;
