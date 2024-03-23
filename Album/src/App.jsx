import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Albums from "./components/Albums";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster />
      <Navbar />
      <Albums />
    </div>
  );
}

export default App;
