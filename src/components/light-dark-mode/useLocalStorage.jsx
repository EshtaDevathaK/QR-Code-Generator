// 🧠 HOOK POWER-UP: React tools for side-effects and state
import { useEffect } from "react";
import { useState } from "react";

// 🧰 CUSTOM HOOK: Save and retrieve from localStorage with fallback
export default function useLocalStroage(key, defaultValue) {
  
  // 🗃️ STATE INIT COMMAND: Lazy-load value from localStorage (only runs once)
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      // 🔍 READ COMMAND: Try getting saved value from localStorage
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      // ❌ FALLBACK COMMAND: If error, use default value
      console.log(error);
      currentValue = defaultValue;
    }

    return currentValue;
  });

  // 📦 SAVE COMMAND: Store the updated value into localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 🔁 RETURN COMMAND: Give back both current value and setter
  return [value, setValue];
}
