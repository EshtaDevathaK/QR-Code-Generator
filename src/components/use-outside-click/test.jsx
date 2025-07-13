// test.jsx

import { useRef, useState } from "react";  // 🧠 useState for show/hide, useRef to tag the element
import useOutsideClick from ".";           // 🔁 importing our custom hook

export default function UseOnclickOutsideTest() {
  const [showContent, setShowContent] = useState(false);  // 🧠 show/hide state
  const ref = useRef();                                   // 🧠 ref for the box we protect

  // 🧠 Hook kicks in: if someone clicks OUTSIDE ref → hide content
  useOutsideClick(ref, () => setShowContent(false));

  return (
    <div>
      {showContent ? (
        // ✅ If box is visible → render content and attach ref
        <div ref={ref}>
          <h1>This is a random content</h1>
          <p>
            Please click outside of this to close this. It won't close if you
            click inside of this content
          </p>
        </div>
      ) : (
        // 🔘 Button to show the content box
        <button onClick={() => setShowContent(true)}>Show Content</button>
      )}
    </div>
  );
}
