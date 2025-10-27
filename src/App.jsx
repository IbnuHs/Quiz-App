import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#FFF8F3]">
      <h1 className="font-semibold">Hello World</h1>
    </div>
  );
}

export default App;
