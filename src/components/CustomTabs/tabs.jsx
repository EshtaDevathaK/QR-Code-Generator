import { useState } from "react";

// 📦 Accepts tab data + change callback from parent
export default function Tabs({ tabsContent, onChange }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);  // 🔁 State: Which tab is active?

  // 🖱️ When user clicks a tab button
  function handleOnClick(getCurrentIndex) {
    setCurrentTabIndex(getCurrentIndex);       // 🔄 Update state to clicked tab
    onChange(getCurrentIndex);                 // 📞 Call parent function
  }

  return (
    <div className="wrapper">                  {/* 🧱 Whole tab layout */}
      
      <div className="heading">                {/* 📍 All tab buttons (in a row) */}
        {tabsContent.map((tabItem, index) => (
          <div
            className={`tab-item ${currentTabIndex === index ? "active" : ""}`}
            // 🎯 Add "active" class to highlight selected tab
            onClick={() => handleOnClick(index)} // 🖱️ Setup click
            key={tabItem.label}                 // 🔑 Unique identity
          >
            <span className="label">{tabItem.label}</span> {/* 🏷️ Show tab name */}
          </div>
        ))}
      </div>

      <div className="content" style={{ color: "red" }}> {/* 🧾 Show content box */}
        {tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content}
        {/* 📦 Show only current tab's content */}
      </div>

    </div>
  );
}
