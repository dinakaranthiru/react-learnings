/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }else{
      setCount(0)
    }
  }
  return (
    <>
      <div>
        <h4>Count:{count}</h4>
      </div>
      <br />
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};

export default Counter;
