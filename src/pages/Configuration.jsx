import React, { useState } from "react";
import { useGetCategory } from "../hooks/useGetCategory";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQuiz } from "../hooks/useGetQuiz";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Configuration = () => {
  const { data } = useGetCategory();
  const { mutate, isSuccess, isError, isPending } = useQuiz();
  const progress = JSON.parse(localStorage.getItem("progress")) || null;
  const [config, setConfig] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  if (progress && !progress.complete) {
    return <Navigate to="/quiz" replace />;
  }
  const navigate = useNavigate();
  const navigeteToQuiz = e => {
    e.preventDefault();
    mutate(config, {
      onSuccess: res => {
        localStorage.setItem("quiz", JSON.stringify(res.results));
        navigate("/quiz");
      },
    });
  };
  return (
    <div className="flex items-center justify-center w-full px-4 flex-col">
      <div className="border-2 rounded w-full border-gray-400 max-w-[300px] flex flex-col lg:max-w-[380px]">
        <h3 className="text-center font-semibold font-bicount text-[18px] border-b-2 border-gray-400 py-2 lg:py-4 lg:text-[22px]">
          Select Category
        </h3>
        <form
          onSubmit={navigeteToQuiz}
          className="px-4 py-6 flex flex-col gap-3 min-w-full lg:px-8 lg:py-10 lg:gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-semibold font-delius text-[14px] lg:text-[16px]">
              Category
            </label>
            <select
              name=""
              id=""
              required
              value={config.category}
              onChange={e => {
                setConfig(prev => ({ ...prev, category: e.target.value }));
              }}
              className="bg-transparent p-1 w-full border-2 rounded-md font-roboto border-gray-300 text-[14px] lg:text-[16px] lg:p-1.5">
              <option value="" disabled>
                Select Category
              </option>
              {data &&
                data.trivia_categories.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="font-semibold font-delius text-[14px] lg:text-[16px]">
              Difficulty
            </label>
            <select
              name=""
              id=""
              required
              value={config.difficulty}
              onChange={e => {
                setConfig(prev => ({ ...prev, difficulty: e.target.value }));
              }}
              className="bg-transparent p-1 border-2 w-full rounded-md font-roboto border-gray-300 text-[14px] lg:text-[16px] lg:p-1.5">
              <option value="" disabled>
                Select Difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 min-w-full">
            <label
              htmlFor=""
              className="font-semibold font-delius text-[14px] lg:text-[16px]">
              Type
            </label>
            <select
              name=""
              id=""
              required
              value={config.type}
              onChange={e => {
                setConfig(prev => ({ ...prev, type: e.target.value }));
              }}
              className="bg-transparent w-full p-1 border-2 rounded-md font-roboto border-gray-300 text-[14px] lg:text-[16px] lg:p-1.5">
              <option value="" disabled>
                Select Type
              </option>
              <option value="multiple">Multiple</option>
              <option value="boolean">True/False</option>
            </select>
          </div>

          <div className="flex items-center justify-center lg:mt-2">
            <button
              type="submit"
              disabled={isPending}
              className="mt-3 font-bicount text-base-white rounded-md hover:bg-[#3f91f5] px-4 py-0.5 border bg-base-blue lg:text-[18px] lg:py-1">
              {isPending ? (
                <AiOutlineLoading3Quarters className="text-[24px] m-auto animate-spin" />
              ) : (
                "Start"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
