import React from 'react'

const EventHandling = () => {
    function handleClick(){
        alert('button was clicked')
    }
  return (
    <>
    <div>EventHandling</div>
    <button onClick={handleClick}>click me</button>
    </>
  )
}

export default EventHandling