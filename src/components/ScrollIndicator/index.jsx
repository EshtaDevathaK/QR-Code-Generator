// 💡 React power unlocked
import { useEffect, useState } from "react";

// 🎨 Connects CSS styling brain
import "./scroll.css";

// 🚀 Component kicks in: receives 'url' to fetch from
export default function ScrollIndicator({ url }) {

  // 🧠 Brain memory slots to track things
  const [data, setData] = useState([]);                 // 🧾 Stores product list
  const [loading, setLoading] = useState(false);        // ⏳ Shows loading time
  const [errorMessage, setErrorMessage] = useState(""); // ❌ Catches errors
  const [scrollPercentage, setScrollPercentage] = useState(0); // 📊 Live scroll % tracker

  // 🔁 Fetch engine: pull data from API
  async function fetchData(getUrl) {
    try {
      setLoading(true); // ⏳ Say “loading” started
      const response = await fetch(getUrl); // 🌐 Talk to server
      const data = await response.json();   // 🔓 Turn response into usable JSON

      // ✅ Only store if data is valid and not empty
      if (data && data.products && data.products.length > 0) {
        setData(data.products); // 🧾 Save products
        setLoading(false);      // ✅ Done loading
      }
    } catch (e) {
      console.log(e);                 // 🧯 Log any problem
      setErrorMessage(e.message);    // ⚠️ Show error to user
    }
  }

  // 🎬 Kick off data fetch when 'url' is received
  useEffect(() => {
    fetchData(url); // 🚚 Go get the data
  }, [url]);

  // 📏 Core brain: calculate how much user scrolled
  function handleScrollPercentage() {
    // 🧪 Debug lab – logs key numbers
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    // 👀 How far down did the user scroll?
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    // 📐 Total scrollable height = full height - visible height
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // 🧮 Convert to percentage
    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  // 🛰️ Scroll spy – listens to scroll and updates %
  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage); // 👂 Start listening

    return () => {
      // 🧹 Clean up properly (corrected version)
      window.removeEventListener("scroll", handleScrollPercentage);
    };
  }, []);

  // 🧾 See raw data and scroll value in console
  console.log(data, scrollPercentage);

  // ❌ If error, show message
  if (errorMessage) {
    return <div>Error ! {errorMessage}</div>;
  }

  // ⏳ Show loading screen
  if (loading) {
    return <div>Loading data ! Please wait</div>;
  }

  // 🧱 Final render: top bar + list of products
  return (
    <div>
      {/* 📦 Sticky top area */}
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>

        {/* 🪟 Bar background */}
        <div className="scroll-progress-tracking-container">
          {/* 🟩 Green progress bar grows with scroll */}
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }} // 🎯 This line makes the bar dynamic!
          ></div>
        </div>
      </div>

      {/* 🧾 List of product titles */}
      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem) => <p>{dataItem.title}</p>) // 🛒 Show each product
          : null}
      </div>
    </div>
  );
}


// [ScrollIndicator receives url]
//       ↓
// [useEffect → fetchData()]
//       ↓
// [API data fetched → setData()]
//       ↓
// [Render product list 📄]

// User scrolls down 🧍‍♂️🖱️
//       ↓
// [handleScrollPercentage() runs]
//       ↓
// [scroll % is calculated 📊]
//       ↓
// [scrollPercentage state updates]
//       ↓
// [green bar width updates with scroll 💚]
