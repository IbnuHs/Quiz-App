import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const QuizLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center flex-1">
        <Outlet />
      </main>
    </div>
  );
};
