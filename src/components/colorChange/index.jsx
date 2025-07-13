
import { useState, useEffect } from 'react';

//#456789 click hex , hex-color is created via the click of btn random-color-generator
//rgb(25, 45, 67) click rgb , rgb created 


export default function
    () {
    // Two states one is hex or either rgb 
    const [typeOfColor, setTypeOfColor] = useState("hex"); // basically represent the wordings
    const [color, setColor] = useState("#000000"); // functional color change
    //Actual Current color change

    // ✅ It's working perfectly for choosing random index positions inside arrays.
    function randomColorUtility(length) {
        return Math.floor(Math.random() * length);
    }

    // 👉  pick random number per pick single number totally picked 6 times per loop based i++ and i < 6 ( HEX color has 6 digits after #).
    function handleCreateRandomHexColor() {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#";

        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)];
        }

        console.log(hexColor);
        setColor(hexColor); //updtaing the hexColor functionality to state
    }

    function handleCreateRandomRgbColor() {
        const r = randomColorUtility(256);
        const g = randomColorUtility(256);
        const b = randomColorUtility(256);

        setColor(`rgb(${r}, ${g}, ${b}) `);
    }
    useEffect(() => {
        if (typeOfColor === "rgb") handleCreateRandomRgbColor();
        else handleCreateRandomHexColor();
    }, [typeOfColor])

    return <div style={{
        width: '100vw',
        height: '100vh',
        background: color,
    }}>
        <button onClick={() => setTypeOfColor('hex')}>hex-color is created</button>
        <button onClick={() => setTypeOfColor('rgb')}>rgb created</button>
        <button onClick={() => typeOfColor === 'hex' ? handleCreateRandomHexColor() : handleCreateRandomRgbColor()}>Generate Random color</button>
        {/* Default Mode set to hex so that When we click Generate Random Color = Generates Hex color */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '60px',
            marginTop: '50px',
        }}>
            <h3>{typeOfColor === 'rgb' ? 'rgb-color' : 'hex-color'}</h3>
            <h1>{color}</h1>
        </div>
    </div>
}




// ✅ Second: Your understanding of this line
// Copy
// Edit
// const [typeOfColor, setTypeOfColor] = useState("hex");
// You said:
// "The word hex flips, based on that our functional conditions change."

// ✅ YES! You're absolutely right. 🎯

// typeOfColor starts as "hex"

// When you click the RGB or HEX buttons, it gets updated

// And based on its value, the app knows which function to run:

// "hex" → handleCreateRandomHexColor

// "rgb" → handleCreateRandomRgbColor

// So you’ve understood this perfectly. 🙌






// import { useEffect, useState } from "react";

// export default function RandomColor() {
//   const [typeOfColor, setTypeOfColor] = useState("hex"); // basically represent the wordings
//   const [color, setColor] = useState("#000000"); // functional color change

//   function randomColorUtility(length) {
//     return Math.floor(Math.random() * length);
//   }

//   function handleCreateRandomHexColor() {
//     // #678765
//     const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
//     let hexColor = "#";

//     for (let i = 0; i < 6; i++) {
//       hexColor += hex[randomColorUtility(hex.length)];
//     }
//     setColor(hexColor);
//   }

//   function handleCreateRandomRgbColor() {
//     const r = randomColorUtility(256);
//     const g = randomColorUtility(256);
//     const b = randomColorUtility(256);

//     setColor(`rgb(${r},${g}, ${b})`);
//   }

//   useEffect(() => {
//     if (typeOfColor === "rgb") handleCreateRandomRgbColor();
//     else handleCreateRandomHexColor();
//   }, [typeOfColor]);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         background: color,
//       }}
//     >
//       <button onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
//       <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
//       <button
//         onClick={
//           typeOfColor === "hex"
//             ? handleCreateRandomHexColor
//             : handleCreateRandomRgbColor
//         }
//       >
//         Generate Random Color
//       </button>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white",
//           fontSize: "60px",
//           marginTop: "50px",
//           flexDirection  :'column',
//           gap :'20px'
//         }}
//       >
//         <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
//         <h1>{color}</h1>
//       </div>
//     </div>
//   );
// }