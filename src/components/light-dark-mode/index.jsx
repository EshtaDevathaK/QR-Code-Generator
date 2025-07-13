// 🧠 COMMAND: Bring in saved theme logic from localStorage
import useLocalStroage from "./useLocalStorage";

// 🎨 COMMAND: Load the style system that reacts to theme changes
import './theme.css';

// 🚀 COMPONENT START: Light/Dark mode toggler
export default function LightDarkMode() {
  
  // 🔒 COMMAND: Lock theme into state with localStorage backup
  const [theme, setTheme] = useLocalStroage("theme", "dark");

  // 🔁 COMMAND: Flip the theme value on button click
  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // 🪵 DEBUG COMMAND: Log current theme for tracking
  console.log(theme);

  return (
    // 🎯 COMMAND: Apply theme data to entire section for CSS to read
    <div className="light-dark-mode" data-theme={theme}>
      <div className="container">
        <p>Hello World !</p>
        
        {/* 🖱️ COMMAND: Button to toggle between light and dark */}
        <button onClick={handleToggleTheme}>Change Theme</button>
      </div>
    </div>
  );
}


// | 🔥 Command Trigger      | 🧠 What's Really Happening                                              |
// | ----------------------- | ----------------------------------------------------------------------- |
// | `LOCK theme into state` | Uses `useLocalStorage` to both save and retrieve theme                  |
// | `FLIP theme`            | Toggles between `"light"` and `"dark"` via ternary                      |
// | `APPLY theme data`      | Adds `data-theme` to DOM for CSS to pick up                             |
// | `READ localStorage`     | On component mount, retrieve saved preference                           |
// | `SAVE localStorage`     | On every theme change, persist it in browser                            |
// | `HOOK POWER-UP`         | Shows you're combining multiple hooks to form one re-usable logic block |
// | `FALLBACK DEFAULT`      | Keeps app safe even when localStorage data is missing or corrupt        |
// | `CUSTOM HOOK`           | Encapsulate side-effect logic into reusable function                    |
