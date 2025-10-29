import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../hooks/useGetQuiz";
import {
  FaRegFaceGrinStars,
  FaRegFaceLaughWink,
  FaRegFaceMeh,
} from "react-icons/fa6";

export const QuizPage = () => {
  const quiz = localStorage.getItem("quiz");
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [choice, setChoice] = useState("");
  const [countDown, setCountDown] = useState(10);
  const [correct_answer, setCorrect_answer] = useState(0);
  const [disable, setDisable] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [complete, setComplete] = useState(false);

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!quiz) {
      navigate("/configuration");
    }
  }, [quiz]);
  const data = JSON.parse(quiz);
  data?.map(item => {
    item.incorrect_answers.push(item.correct_answer);
  });
  const mergedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      all_answer: shuffleArray([
        ...item.incorrect_answers,
        item.correct_answer,
      ]),
    }));
  });
  const answer = item => {
    setChoice(item);
    setDisable(true);
    setIsAnswer(true);
    if (data[indexQuestion].correct_answer === item) {
      setCorrect_answer(prev => prev + 1);
    }
    const timer = setTimeout(() => {
      if (indexQuestion < data.length - 1) {
        setIndexQuestion(indexQuestion + 1);
      }
      if (indexQuestion === data.length - 1) {
        setComplete(true);
      }
      setDisable(false);
      setIsAnswer(false);
      setChoice("");
    }, 1000);
    console.log("Direct Choice Answer");
    return () => clearInterval(timer);
  };
  useEffect(() => {
    console.log(countDown);
    if (countDown > 0 && indexQuestion < data.length) {
      const timer = setTimeout(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countDown === 0 && !isAnswer && indexQuestion < data.length - 1) {
      setIndexQuestion(prev => prev + 1);
      setCountDown(10);
    }

    if (countDown === 0 && !isAnswer && indexQuestion === data.length - 1) {
      console.log("check");
      setComplete(true);
    }
    return;
  }, [indexQuestion, countDown]);
  useEffect(() => {
    if (indexQuestion <= data.length) {
      setCountDown(10);
    }
  }, [indexQuestion]);
  const tryAgain = () => {
    setIndexQuestion(0);
    setCorrect_answer(0);
    setComplete(false);
  };
  const restart = () => {
    localStorage.removeItem("quiz");
    navigate("/configuration");
  };
  console.log(data.length);
  return (
    <div className="min-h-screen flex flex-col items-center gap-3 w-full justify-center px-8 ">
      {quiz && indexQuestion <= data.length - 1 && !complete ? (
        <div className="flex flex-col items-center gap-3 justify-center w-full md:max-w-[400px]">
          <div className=" border-2 border-gray-400 w-full text-center rounded-md text-gray-500 font-semibold relative">
            <div className="absolute bg-gray-400 top-0 bottom-0 w-[100%] -z-10"></div>
            <p className="z-20 text-white">{countDown}</p>
          </div>
          <div className="border-2 border-gray-400 min-w-full rounded-md px-5 py-9 flex flex-col gap-4 md:py-12">
            <div className="">
              <h3 className="font-semibold text-center font-bicount text-[20px] md:text-[22px] xl:text-[24px]">
                Question {indexQuestion + 1}
              </h3>
              <p
                className="font-semibold font-roboto mt-5 xl:text-[18px]"
                dangerouslySetInnerHTML={{
                  __html: mergedData[indexQuestion].question,
                }}></p>
            </div>

            <ol className="flex flex-col gap-2 w-full">
              {mergedData[indexQuestion].incorrect_answers.map(
                (item, index) => (
                  <li className="" key={index}>
                    <button
                      disabled={disable}
                      onClick={() => answer(item)}
                      className={`border-2 border-gray-400 ${
                        choice === item &&
                        item === data[indexQuestion].correct_answer
                          ? "bg-green-500 text-white font-semibold"
                          : choice === item &&
                            item !== data[indexQuestion].correct_answer
                          ? "bg-red-500 text-gray-100 font-semibold"
                          : ""
                      }  rounded-md text-[15px] py-1 w-full xl:text-[16px]`}
                      dangerouslySetInnerHTML={{ __html: item }}></button>
                  </li>
                )
              )}
            </ol>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-400 p-5 text-center flex flex-col gap-3 rounded-md w-full font-semibold max-w-[350px] lg:max-w-[400px] lg:px-8 lg:py-12">
          <h3 className=" font-bicount text-[24px] lg:text-[28px]">
            Completed
          </h3>
          {correct_answer >= 0 && correct_answer <= 5 ? (
            <div className="flex items-center justify-center flex-col gap-2 text-red-500">
              <p className=" font-delius text-[18px] lg:text-[22px]">
                Nice Try!
              </p>
              <FaRegFaceMeh className="text-[28px] lg:text-[36px]" />
            </div>
          ) : correct_answer >= 6 && correct_answer <= 7 ? (
            <div className="flex items-center justify-center flex-col gap-2">
              <p className=" font-delius text-[18px] lg:text-[22px]">
                Good Work !!!
              </p>
              <FaRegFaceLaughWink className="text-[28px] text-yellow-500 lg:text-[36px]" />
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-2">
              <p className=" font-delius text-[18px] text-green-600 lg:text-[22px]">
                Amazing !!!
              </p>
              <FaRegFaceGrinStars className="text-[28px] lg:text-[36px]" />
            </div>
          )}

          <p className="font-bicount lg:text-[24px]">
            {correct_answer}/{data.length}
          </p>
          <div className="flex justify-center items-center font-bicount">
            <button
              onClick={tryAgain}
              className="text-[12px] border-2 px-4 py-1 bg-base-blue hover:bg-[#4d8fe0] transition-all text-white rounded-md lg:text-[14px]">
              Try again
            </button>
            <button
              onClick={restart}
              className="text-[12px] border-2 px-4 py-1 bg-green-500 hover:bg-green-400 transition-all hover:text-base-white text-white rounded-md lg:text-[14px]">
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
