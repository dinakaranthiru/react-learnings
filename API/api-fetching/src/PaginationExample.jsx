import { useState } from "react";

const PaginationExample = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <h2>Users List</h2>

      {/* Data */}
      {currentItems.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}

      {/* Pagination Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "5px",
              fontWeight: currentPage === i + 1 ? "bold" : "normal"
            }}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;