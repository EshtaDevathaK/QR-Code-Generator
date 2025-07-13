// 🧠 Importing tools from React to handle memory + side effects
import { useEffect, useState } from "react";

// 🔗 Pulling in our dropdown display helper
import Suggestions from "./suggestions";

export default function SearchAutocomplete() {
  // 🔌 Turns on loading message while API is working
  const [loading, setLoading] = useState(false);

  // 📦 Stores all names fetched from the API
  const [users, setUsers] = useState([]);

  // 🚨 Holds error if something goes wrong during fetch
  const [error, setError] = useState(null);

  // 🎯 Stores what the user is typing inside the input box
  const [searchParam, setSearchParam] = useState("");

  // 🧾 Controls whether to show the dropdown or not
  const [showDropdown, setShowDropdown] = useState(false);

  // 🎯 Stores the list of users that match your typed input
  const [filteredUsers, setFilteredUsers] = useState([]);

  // 💡 Runs every time you type into the input box
  function handleChange(event) {
    const query = event.target.value.toLowerCase(); // 📝 Convert to lowercase for easy matching
    setSearchParam(query); // 💾 Save the typed text into state

    if (query.length > 1) {
      // 🔍 Start filtering only if input is longer than 1 character
      const filteredData = users.filter((item) =>
        item.toLowerCase().includes(query)
      );

      setFilteredUsers(filteredData); // 💾 Save the matching results
      setShowDropdown(true); // 👀 Turn on the dropdown
    } else {
      setShowDropdown(false); // 🙈 Not enough letters? Hide dropdown
    }
  }

  // ✅ Runs when a name in the dropdown is clicked
  function handleClick(event) {
    setSearchParam(event.target.innerText); // 🖊️ Fill the input box with the clicked name
    setFilteredUsers([]); // 🧹 Clear the results
    setShowDropdown(false); // 🙈 Hide the dropdown
  }

  // 🌐 Fetches all users from the dummy API
  async function fetchListOfUsers() {
    try {
      setLoading(true); // 🕐 Start loading
      const response = await fetch("https://dummyjson.com/users"); // 🌍 Talk to the API
      const data = await response.json(); // 📩 Turn response into readable data

      // ✅ If we got data, extract just the first names
      if (data && data.users && data.users.length) {
        const firstNames = data.users.map((user) => user.firstName); // ✂️ Only keep first names
        setUsers(firstNames); // 💾 Save names into memory
        setLoading(false); // ✅ Done loading
        setError(null); // 🔧 Clear error
      }
    } catch (error) {
      setLoading(false); // 🛑 Stop loading
      console.log(error); // 🛠️ Debug the error
      setError(error); // 🚨 Show error if needed
    }
  }

  // 🚀 useEffect runs ONCE when component starts — perfect to call the fetch!
  useEffect(() => {
    fetchListOfUsers(); // 📞 Start the fetch process
  }, []);

  // 🧪 Just for checking what's stored inside
  console.log("All Users:", users);
  console.log("Filtered Users:", filteredUsers);

  // 🎨 What the user sees
  return (
    <div className="search-autocomplete-container">
      {loading ? (
        // 🕐 If loading is true, show this message
        <h1>Loading Data ! Please wait</h1>
      ) : (
        // 🧠 Otherwise show the input box
        <input
          value={searchParam} // 📝 Controlled input value
          name="search-users"
          placeholder="Search Users here..." // 🧾 Prompt text
          onChange={handleChange} // 🧠 Trigger on typing
        />
      )}

      {/* 📜 Show dropdown only if flag is true */}
      {showDropdown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}


// App Starts 🚀
//    ↓
// useEffect() → fetchListOfUsers() 📡
//    ↓
// setUsers() stores all names 📦
//    ↓
// User types something 🧠
//    ↓
// handleChange() runs:
//    → updates input
//    → filters matching names
//    → opens dropdown if needed
//    ↓
// filteredUsers passed into Suggestions.jsx 📜
//    ↓
// Suggestions shows <li> for each result 🧍
//    ↓
// User clicks a name 🖱️
//    ↓
// handleClick() updates input ✅ + hides dropdown ❌


// | Emoji | Brain Cue                        |
// | ----- | -------------------------------- |
// | 🧠    | Core logic moment                |
// | 💾    | Save something into memory/state |
// | 📡    | Talking to API / Fetching        |
// | 📜    | Dropdown list                    |
// | 🧍    | Individual user                  |
// | 🙈    | Hide something                   |
// | 👀    | Show something                   |
// | ✂️    | Trim, extract, modify            |
// | 🔁    | Repeating or re-rendering        |
// | 🚨    | Error-related                    |
// | ✅     | Success or completed task        |
