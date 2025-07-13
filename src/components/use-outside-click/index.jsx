// index.jsx

import { useEffect } from "react";

// 🧠 Main function: detects if you click OUTSIDE a ref'd element
export default function useOutsideClick(ref, handler) {
  // 🧠 useEffect: runs after render, sets up event listeners
  useEffect(() => {

    // 🧠 listener: checks if click was outside the element
    function listener(event) {
      // 🧠 If ref not ready or you clicked INSIDE the element → do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // 💥 You clicked OUTSIDE the element → run the handler (e.g., close box)
      handler(event);
    }

    // 🧠 Add global listeners for both mouse and touch
    document.addEventListener("mousedown", listener);    // 🖱️ desktop
    document.addEventListener("touchstart", listener);   // 👉 mobile

    // 🧹 Cleanup: remove listeners when component unmounts
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };

  }, [handler, ref]); // 🧠 Rerun effect only if handler or ref changes
}


// | Code Snippet                    | Memory Cue 💡                                  |
// | ------------------------------- | ---------------------------------------------- |
// | `useRef()`                      | “What part of the UI do I want to *watch*?” 🧿 |
// | `useOutsideClick(ref, handler)` | “If clicked outside this area → run this” 🚨   |
// | `useEffect` with `listener`     | “Watch clicks and react!” 👂                   |
// | `contains(event.target)`        | “Did I click *inside* the box?” ✅❌             |
// | `addEventListener / remove`     | “Attach global click detectors!” 🌐            |
// | `handler()`                     | “Run my custom response — like hide box” 🔥    |
// | `setShowContent(true/false)`    | “Toggle the box — show or hide” 🎭             |
