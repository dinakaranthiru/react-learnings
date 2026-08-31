import { useState } from "react";

const Formvalidation = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([]);

  const handleSubmit = () => {
    if (email.split("@").length !== 2 || !email.endsWith("@gmail.com")) {
      setError("Invalid email");
      return;
    }

    const alreadySubmitted = submittedEmails.includes(
      email.trim().toLowerCase(),
    );
    if (alreadySubmitted) {
      setError("Email already Submitted");
      alert("Already Submitted0");
      return;
    }

    setError("");
    setSubmittedEmails((prev) => [...prev, email.trim().toLowerCase()]);

    setTimeout(() => {
      alert("submitted");
    }, 100);
    
  };

  return (
    <div>
      <input type="text" onChange={(e) => setEmail(e.target.value)}
      value={email} placeholder="Enter Email" />
      <button onClick={handleSubmit}>Submit</button>
      <p style={{color:"red"}}>{error}</p>
    </div>
  );
};

export default Formvalidation;
