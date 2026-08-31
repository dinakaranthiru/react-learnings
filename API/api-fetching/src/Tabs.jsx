import { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Tab1");

  return (
    <div>
      <button onClick={() => setActiveTab("Tab1")}>Tab 1</button>
      <button onClick={() => setActiveTab("Tab2")}>Tab 2</button>

      {activeTab === "Tab1" && <p>Content for Tab 1</p>}
      {activeTab === "Tab2" && <p>Content for Tab 2</p>}
    </div>
  );
}

export default Tabs;