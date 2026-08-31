import React, { useEffect, useState } from 'react'

const Learning = () => {

    const [advice,setAdvice] = useState("");
    const [count,setCount] = useState(0);
    const [load, setLoad] = useState(false)
    async function getAdvice(){
         const res = await fetch("https://jsonplaceholder.typicode.com/todos");
         const data = await res.json();
         const randomIndex = Math.floor(Math.random() * data.length);
         setAdvice(data[randomIndex].title);
         setCount((c)=>c+1);
    }
    useEffect(()=>{
        getAdvice()
        setLoad(false)
    },[])
    if(load) return <p>Loading</p>
  return (
    <>
    <h3>{advice}</h3>
    <button onClick={getAdvice}>Click</button>
    <p>you have read <strong>{count}</strong> piece of advice</p>
        </>
  )
}

export default Learning