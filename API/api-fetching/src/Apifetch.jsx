import { useEffect, useState } from "react";

const Apifetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(true);
      });
  }, []);



  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error While loading..</p>;

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {user.id}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {user.name}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {user.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Apifetch;
