import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// If there is only one file to access then its index.jsx so Upto Folder is enouh 
// so when we have multiple files in a folder we must mention file name with extension
// import TabTest  from './components/CustomTabs/tab-test.jsx';
// import Display from "./components/qr-code-generator/Display.jsx";

// function App() {
//   return (
//     <>
//       <MenuItem url={"https://picsum.photos/v2/list"} limit={10} page={14}/>
//     </>
//   );
// }

// export default App;


import QRCodeGenerator from "./components/qr-code-generator";

function App() {
  return (
   
      <div>
        <h1>Welcome to My App</h1>
        <QRCodeGenerator />
      </div>
   
  );
}

export default App;










// import TreeView from "./components/treeView/index.jsx";


// function App() {
//   const menus = [
//     {
//       label: "Home",
//     },
//     {
//       label: "About",
//       children: [
//         {
//           label: "Team",
//         },
//         {
//           label: "Company",
//         },
//       ],
//     },
//     {
//       label: "Services",
//       children: [
//         {
//           label: "Web Development",
//         },
//         {
//           label: "Design",
//         },
//       ],
//     },
//   ];

// return (
//   <>
//     <TreeView menus={menus} />
//   </>
// );
// }
// export default App;