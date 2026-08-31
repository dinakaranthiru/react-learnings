import React, { useState } from 'react'

const UseState = () => {
    const [count,setCount] = useState(0);
const incr = ()=>{
    setCount(count +1)
    }
const dec = () =>{
    if(count>0){
        setCount(count-1)
    }else{
        setCount(count=0)
    }
}    
const reset = () =>{
    setCount(count*0)
}
  return (
    
    <div>
        <p>count : {count}</p>
        <button onClick={incr}>+</button>
        <button onClick={dec}>-</button>
        <button onClick={reset}>reset</button>
    </div>
   
  )
}

export default UseState