import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Starter } from "./pages/Starter";
import { Configuration } from "./pages/Configuration";
import { QuizPage } from "./pages/QuizPage";
import { RegisterPages } from "./pages/RegisterPages";
import { LoginPages } from "./pages/LoginPages";
import { AuthLayout } from "./layout/AuthLayout";
import { QuizLayout } from "./layout/QuizLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/login" element={<LoginPages />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<QuizLayout />}>
            <Route path="/" element={<Starter />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
