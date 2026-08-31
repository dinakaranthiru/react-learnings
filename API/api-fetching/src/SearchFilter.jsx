import React, { useState } from 'react'

const SearchFilter = () => {
    const fruits = [
    "Apple",
    "Banana",
    "Grapes",
    "Orange",
    "Fig",
    "Date",
    "Guava",
    "Pineapple",
  ];

  const [search,setSearch] = useState("")

  const filteredFruit = fruits.filter((fruit) => fruit.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
        <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)}/>
        {filteredFruit.length > 0 ? (
            filteredFruit.map((fruit,index)=>(
                <p key={index}>{fruit}</p>
            ))
        ):(
            <p>No records Found</p>
        )}
    </div>
  )
}

export default SearchFilter