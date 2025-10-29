import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Starter } from "./pages/Starter";
import { Configuration } from "./pages/Configuration";
import { QuizPage } from "./pages/QuizPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
