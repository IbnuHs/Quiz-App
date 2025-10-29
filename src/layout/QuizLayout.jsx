import React from "react";
import { Outlet } from "react-router-dom";

export const QuizLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
