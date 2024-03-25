import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Spare parts inventory status</h1>
      <p>Order new (number) </p>
    </div>
  );
}

export default App;
