import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  )
  return response.json()
}

function Users() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    
  })

  if (isLoading) return <p>Loading users...</p>

  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2>User List</h2>
      {data.map((user) => (
        <div key={user.id}>
            <p>{user.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Users

// import { useEffect, useState } from "react";

// export function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Something went wrong");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       {users.map((user) => (
//         <p key={user.id}>{user.name}</p>
//       ))}
//     </div>
//   );
// }

// export default Users