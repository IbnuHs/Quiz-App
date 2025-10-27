import React, { useState } from "react";
import img from "../assets/organic-flat-people-asking-questions-illustration.png";
import { useGenerateToken } from "../hooks/useGenerateToken";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Starter = () => {
  const { mutate, isPending } = useGenerateToken();
  const navigate = useNavigate();
  function generateToken() {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/configuration");
      },
    });
  }
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div className="border-2 border-gray-400 shadow-md p-12 m-auto rounded-md box-content flex flex-col md:p-14 md:max-w-[500px]">
        <h3 className="text-center font-semibold text-[24px] font-bicount md:text-[28px]">
          Quiz Time
        </h3>
        <img
          src={img}
          alt=""
          className="w-full max-w-[200px] md:max-w-[280px]"
        />
        <button
          type="button"
          onClick={generateToken}
          className="px-4 py-2 border-2 font-semibold bg-[#1C6DD0] hover:bg-[#3f91f5] text-[#FFF8F3] transition-all text-center rounded-md">
          {isPending ? (
            <AiOutlineLoading3Quarters className="text-[24px] m-auto animate-spin" />
          ) : (
            "Start"
          )}
        </button>
      </div>
    </div>
  );
};
