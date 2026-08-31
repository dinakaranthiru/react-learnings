import React, { useState } from "react";

function Toggle() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </button>
      {visible && <p>This text can be toggled.</p>}
    </div>
  );
}

export default Toggle;