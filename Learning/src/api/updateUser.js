export const updateUser = async (user) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return res.json();
};