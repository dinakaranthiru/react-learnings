import React from 'react'

const EventHandling = () => {
    function handleClick(){
        alert('button was clicked')
    }
    function handleInputChange(e){
        console.log('user typed:',e.target.value);
    }

    function deleteUser(id){
        console.log(`Deleting user with ID: ${id}`)
    }
  return (
    <>
    <div>Input change</div>
    <input type="text" onChange={handleInputChange} />
    <div>EventHandling</div>
    <button onClick={handleClick}>click me</button>
    <div>Delete user</div>
    <button onClick={() => deleteUser(42)}>Delete user</button>
    </>
  )
}

export default EventHandling