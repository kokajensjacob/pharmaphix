import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [orderQuantity, setOrderQuantity] = useState<number>();
  useEffect(() => {
    fetch("http://change.mä")
      .then((resp) => resp.json())
      .then((data) => setOrderQuantity(data.needToBeOrdered))
      .catch(() => console.error("failed to fetch"));
  }, []);
  return (
    <div>
      <h1>Spare parts inventory status</h1>
      {orderQuantity && orderQuantity > 0 && (
        <p>Order new ({orderQuantity}) </p>
      )}
    </div>
  );
}

export default App;
