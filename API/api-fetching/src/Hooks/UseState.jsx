{/*
    USESTATE:
      - usestate is a react hook that alows functional components to store and manage data(state).
      - it is used when data in the ui need to change dynamically:
      1. Counter value
      2. Form inout values
      3. API response daa
      4. Show /Hide Password
      5. Theme Switching
      6. User Information.
*/}


//SYNTAX:
// const [state, setState] = useState(initialValue);

import React  from "react";
import { useState } from "react";

const UseState = () =>{
    const [count,setCount] = useState(0)

    function Inc(){
        setCount(count +1)
    }
    function Dec(){
        if(count > 0){
            setCount(count -1)
        }else{
            setCount(0)
        }
    }
    function Reset(){
      setCount(count*0)
    }

    return(
        <div>
            <h2>Counter App</h2>
            <span>Count: {count}</span>
            <br></br>
            <button onClick={Inc}>+</button>
            <button onClick={Dec}>-</button>
            <button onClick={Reset}>Reset</button>
        </div>
    )
}

export default UseState