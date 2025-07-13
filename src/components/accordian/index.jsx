import { useState } from "react";
import data from "./data.js";
import './style.css';

// Accordion Component
export default function Accordion() {

  // 🔹 Single-Selection: Keeps track of currently selected item ID
  const [selected, setSelected] = useState(null);

  // 🔹 Enable/Disable Multi-Selection  ---> 2 Default set To Single selection mode
  const [enableMulSelec, setEnableMulSelec] = useState(false);

  // 🔹 Multi-Selection: Stores array of selected item IDs
  const [multiple, setMultiple] = useState([]);

  // 🔸 Function to handle Single Selection logic
  function handleSingleSelection(getCurrentId) {
    // If clicked again (same item), deselect it
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // 🔸 Function to handle Multi Selection logic
  //   i am choosing n no.of multiple questions and then the id of specfic question like 1, 2, 3 will ne stored in the cpyMultiple
  function handleMultSelection(getCurrentId) {
    let cpyMultiple = [...multiple]; // Copy of current multiple array
    const foundIndex = cpyMultiple.indexOf(getCurrentId); // Check if ID already exists

    if (foundIndex === -1) {
      // If ID not found, add it
      cpyMultiple.push(getCurrentId);
    } else {
      // If ID found, remove it (toggle off)
      cpyMultiple.splice(foundIndex, 1);
    }

    // Update the state with new array
    setMultiple(cpyMultiple);
  }

  return (
    <div className="wrapper">
      {/* 🔘 Toggle Button: Switch between Multi and Single Selection */}
      <button onClick={() => setEnableMulSelec(!enableMulSelec)}>
        Enable Multiple / Single Selection
      </button>

      <div className="accordian">
        {
          // ✅ Render data only if available
          data && data.length > 0 ? (

            data.map((dataItem) => (
              <div className="item" key={dataItem.id}>

                {/* 🔘 Click logic: calls different handlers based on mode */}
                {/*🔹 Enable/Disable Multi-Selection  ---> Default set To Single selection mode */}
                {/* Default set to Single selection Mode , then after clicks Multiple & Single flips on  */}
                <div
                  onClick={
                    enableMulSelec
                      ? () => handleMultSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>

                {/* 🔽 CONDITIONAL RENDERING STARTS HERE */}
                {
                  enableMulSelec
                    ? (
                      // 🔹 MULTI SELECTION MODE
                      // Check if current ID exists in the selected list
                      multiple.indexOf(dataItem.id) !== -1 && (
                        <div className="content">{dataItem.answer}</div>
                      )
                    )
                    : (
                      // 🔹 SINGLE SELECTION MODE
                      // Check if current item is the selected one
                      selected === dataItem.id && (
                        <div className="content">{dataItem.answer}</div>
                      )
                    )
                }
                {/* 🔼 CONDITIONAL RENDERING ENDS HERE */}

              </div>
            ))

          ) : (
            <div>No Data Found!</div>
          )
        }
      </div>
    </div>
  );
}



// 🔸 Function to handle Single Selection logic
//   function handleSingleSelection(getCurrentId) {
//     // If clicked again (same item), deselect it
//     setSelected(getCurrentId === selected ? null : getCurrentId);
//   }

// If you click the **same question again**, it **hides** the answer (deselects it).
// If you click a **different question**, it shows **only that new answer**, hiding the previous one.
// ✅ Yes, you're exactly right!

// When `selected = 4`, the loop checks each `dataItem.id` and **only** shows the answer for ID 4.

// But when you click and change `selected = 2`, the **entire list re-renders**, and React compares:

// | `dataItem.id` | `selected` | Check (`selected === dataItem.id`) | What Happens        |
// | ------------- | ---------- | ---------------------------------- | ------------------- |
// | 1             | 2          | `2 === 1` → ❌                      | Nothing shown       |
// | 2             | 2          | `2 === 2` → ✅                      | ✅ Show answer for 2 |
// | 3             | 2          | `2 === 3` → ❌                      | Nothing shown       |
// | 4             | 2          | `2 === 4` → ❌                      | ❌ Hide answer for 4 |

// ✨ So yes — the answer for ID `4` **auto-hides** because `selected !== 4` anymore.
// React handles this via **conditional rendering** inside the `.map()`.

// Let me know if you want a visual flow or state diagram!




// | Concept                | Mention                                                   |
// | ---------------------- | --------------------------------------------------------- |
// | `useState`             | Used to track the selected question's ID                  |
// | `.map()`               | Used to render the list dynamically                       |
// | Conditional rendering  | Used `selected === dataItem.id` to decide what to display |
// | Single source of truth | `selected` controls visibility, no duplication            |
// |   Render - Logic       | `Appears for the First Time                               |
// | Re-render logic        | Changing state causes React to re-evaluate each item      |
// | Component reusability  | Works for any number of FAQs with no extra logic          |









// Great question! Let’s break down **why** these state variables are used, **where** they are used in the code, and **how** they are connected to the app's logic.

// ---

// ## 🔹 `const [selected, setSelected] = useState(null);`

// ### ✅ **Why it's used:**

// * To **store the ID of the currently selected item** when in **Single Selection Mode**.
// * Only one item should be active at a time.

// ### 📍 **Where it's used:**

// 1. ✅ Inside the `handleSingleSelection(getCurrentId)` function:

//    ```js
//    setSelected(getCurrentId === selected ? null : getCurrentId);
//    ```

//    * Updates the selected ID (or clears it if re-clicked).

// 2. ✅ In conditional rendering:

//    ```jsx
//    selected === dataItem.id && <div className="content">{dataItem.answer}</div>
//    ```

//    * Only the item that matches `selected` will show the answer.

// ---

// ## 🔹 `const [enableMulSelec, setEnableMulSelec] = useState(false);`

// ### ✅ **Why it's used:**

// * To **toggle between single selection and multiple selection mode**.

// ### 📍 **Where it's used:**

// 1. ✅ Toggle Button:

//    ```jsx
//    <button onClick={() => setEnableMulSelec(!enableMulSelec)}>
//      Enable Multiple Selection
//    </button>
//    ```

//    * Allows switching between the two modes.

// 2. ✅ Inside onClick:

//    ```jsx
//    onClick={ enableMulSelec
//      ? () => handleMultSelection(dataItem.id)
//      : () => handleSingleSelection(dataItem.id)
//    }
//    ```

//    * Dynamically chooses which function to run based on mode.

// 3. ✅ In conditional rendering:

//    ```jsx
//    enableMulSelec
//      ? multiple.includes(dataItem.id)
//      : selected === dataItem.id
//    ```

//    * Logic differs depending on the mode.

// ---

// ## 🔹 `const [multiple, setMultiple] = useState([]);`

// ### ✅ **Why it's used:**

// * To **store an array of selected item IDs** when in **Multiple Selection Mode**.
// * Allows multiple answers to show at once.

// ### 📍 **Where it's used:**

// 1. ✅ Inside `handleMultSelection(getCurrentId)`:

//    ```js
//    if (index === -1) add ID;
//    else remove ID;
//    setMultiple(newArray);
//    ```

//    * Adds/removes selected ID from the array.

// 2. ✅ In conditional rendering:

//    ```jsx
//    multiple.includes(dataItem.id) && <div className="content">{dataItem.answer}</div>
//    ```

//    * Shows answer for each item whose ID exists in `multiple`.

// ---

// ### 🔗 Summary Table

// | State Variable   | Used For                    | Connected To                              |
// | ---------------- | --------------------------- | ----------------------------------------- |
// | `selected`       | Track 1 selected ID         | `handleSingleSelection` + rendering logic |
// | `enableMulSelec` | Toggle selection mode       | Toggle button + `onClick` logic           |
// | `multiple`       | Track multiple selected IDs | `handleMultSelection` + rendering logic   |

// ---

// Let me know if you want visual flowcharts or diagrams for these!







// 🔍 What does indexOf do?
//   i am choosing n no.of multiple questions and then the id of specfic question like 1, 2, 3 will ne stored in the cpyMultiple

//  ✅ Example Scenario
// Let’s say the user has selected question IDs: [2, 4]

// Now the user clicks on question 3.

// Let's simulate this:

// const cpyMultiple = [2, 4]; // Already selected questions
// const getCurrentId = 3;     // User clicks question 3

// const fndIdxOfCurrId = cpyMultiple.indexOf(getCurrentId); // indexOf(3)
// Since 3 is not in the array, the result will be:

// fndIdxOfCurrId = -1

//   function handleMultSelection(getCurrentId) {
//     let cpyMultiple = [...multiple]; // Copy of current multiple array
//     const foundIndex = cpyMultiple.indexOf(getCurrentId); // Check if ID already exists

//     if (foundIndex === -1) {
//       // If ID not found, add it
//       cpyMultiple.push(getCurrentId);
//     } else {
//       // If ID found, remove it (toggle off)
//       cpyMultiple.splice(foundIndex, 1);
//     }

//     // Update the state with new array
//     setMultiple(cpyMultiple);
//   }