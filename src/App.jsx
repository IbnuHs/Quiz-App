import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Starter } from "./pages/Starter";
import { Configuration } from "./pages/Configuration";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/configuration" element={<Configuration />} />
      </Routes>
    </div>
  );
}

export default App;
