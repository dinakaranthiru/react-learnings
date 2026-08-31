import React, { useEffect } from 'react'
import { useRef } from 'react'



const Newq = () => {
    const inputRef = useRef();
    const textRef = useRef("Initial Text");

    const focusInput = () =>{
        inputRef.current.focus()
    }
    
    useEffect(()=>{
      focusInput()
    },[])

  return (
    <div>
        <h1>New</h1>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus</button><br/>
        <p>{textRef.current}</p>
    </div>
  )
}

export default Newq