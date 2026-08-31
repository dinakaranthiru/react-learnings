import React, { useState } from "react";

const USEEFFECT = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Support Ticket Classifier</h2>

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter ticket description..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handlePredict}>
        Predict Category
      </button>

      {result && (
        <div>
          <h3>Prediction Result</h3>
          <p>
            <strong>Category:</strong> {result.category}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
};

export default USEEFFECT;