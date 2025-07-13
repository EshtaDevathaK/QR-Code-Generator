import Tabs from "./tabs";       // 🧠 BRING the tab brain logic
import './tabs.css';             // 🎨 BRING the tab clothes (style)

// 🎯 EXTRA content for one tab — just to show component as tab content
function RandomComponent() {
  return <h1>Some random content</h1>;
}

// 📦 MAIN component: packs tab data & sends to Tabs component
export default function TabTest() {
  const tabs = [
    {
      label: "Tab 1",                           // 🏷️ This is tab button name
      content: <div>This is content for Tab 1</div>,  // 📄 What appears when clicked
    },
    {
      label: "Tab 2",
      content: <h3>This is content for Tab 2</h3>,
    },
    {
      label: "Tab 3",
      content: <RandomComponent />,             // ⚙️ Shows a separate component
    },
  ];

  function handleChange(currentTabIndex) {
    console.log(currentTabIndex);              // 📢 LOG tab number when clicked
  }

  return <Tabs tabsContent={tabs} onChange={handleChange} />;  // 🚀 SEND tabs + callback
}
