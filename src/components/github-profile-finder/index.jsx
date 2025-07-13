// ⚡ React Brain Tools – Memory (useState) & Side Effects (useEffect)
import { useEffect, useState } from "react";

// 🧩 Load the Face Component — shows the profile
import User from "./user";

// 🎨 Load the Styles — shape the screen
import './styles.css';

export default function GithubProfileFinder() {
  // 🧠 USERNAME MEMORY BOX — stores what's typed in input
  const [userName, setUserName] = useState("sangammukherjee");

  // 📦 PROFILE DATA BOX — holds GitHub user info after fetch
  const [userData, setUserData] = useState(null);

  // ⏳ SPINNER SWITCH — controls the "Loading..." moment
  const [loading, setLoading] = useState(true);

  // 🌐 DATA HUNTER — fetches GitHub data using username
  async function fetchGithubUserData() {
    setLoading(true); // 🕹️ TURN ON LOADING

    // 🚀 LAUNCH TO GITHUB — fetch the user profile data
    const res = await fetch(`https://api.github.com/users/${userName}`);

    // 🧬 DECODE THE RESPONSE — make it readable
    const data = await res.json();

    // 🧊 IF DATA EXISTS — store it and clean up
    if (data) {
      setUserData(data);     // 📥 DROP DATA INTO THE BOX
      setLoading(false);     // 🛑 STOP LOADING SPINNER
      setUserName('');       // 🧼 CLEAR INPUT FIELD
    }
  }

  // 🖱️ SEARCH BUTTON LOGIC — run fetch when button is clicked
  function handleSubmit() {
    fetchGithubUserData(); // 🚦 FIRE THE FETCH AGAIN
  }

  // 🚀 FIRST IMPRESSION LOGIC — run fetch only once on page load
  useEffect(() => {
    fetchGithubUserData(); // 🔁 INITIATE FIRST DATA CALL
  }, []);

  // ⏳ LOADING WALL — show this until data comes
  if (loading) {
    return <h1>Loading data ! Please wait</h1>; // ⏳ BLOCK VIEW
  }

  // 🧱 MAIN LAYOUT — input + search + user profile
  return (
    <div className="github-profile-container"> {/* 🟦 MAIN CONTAINER FRAME */}
      
      <div className="input-wrapper"> {/* 📤 INPUT SECTION BOX */}
        <input
          name="search-by-username"
          type="text"
          placeholder="Search Github Username..." // 🔍 USERNAME HINT
          value={userName}                         // ✍️ LINKED TO STATE
          onChange={(event) => setUserName(event.target.value)} // 🧲 LIVE TRACKING
        />
        <button onClick={handleSubmit}>Search</button> {/* 🖱️ LAUNCH FETCH */}
      </div>

      {/* 👤 USER BOX — shown only if data exists 
      connects with user.jsx*/}
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}

// | 🔥 Comment                  | 🧠 What it Sparks In Your Brain           |
// | --------------------------- | ----------------------------------------- |
// | 🧠 USERNAME MEMORY BOX      | "I'm tracking what the user types"        |
// | 🌐 DATA HUNTER              | "This is where the API call lives"        |
// | 🚀 LAUNCH TO GITHUB         | "We're sending a request to GitHub!"      |
// | 📥 DROP DATA INTO THE BOX   | "Store the API response inside a state"   |
// | 🔁 INITIATE FIRST DATA CALL | "Do this ONCE when the app starts"        |
// | ⏳ LOADING WALL              | "Only show this if data hasn't come yet"  |
// | 🧱 MAIN LAYOUT              | "This is where the full UI is built"      |
// | 👤 USER BOX                 | "Only show profile card if data is ready" |
