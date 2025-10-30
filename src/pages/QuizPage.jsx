import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegFaceGrinStars,
  FaRegFaceLaughWink,
  FaRegFaceMeh,
} from "react-icons/fa6";
import { parse } from "postcss";

export const QuizPage = () => {
  const user = localStorage.getItem("isLogin");
  const quiz = localStorage.getItem("quiz");
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [choice, setChoice] = useState("");
  const [countDown, setCountDown] = useState(60);
  const [correct_answer, setCorrect_answer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [disable, setDisable] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [complete, setComplete] = useState(false);
  const [reload, setReload] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState(0);

  const progress = localStorage.getItem("progress");
  useEffect(() => {
    const saveProgress = progress ? JSON.parse(progress) : null;
    if (saveProgress && !reload) {
      if (saveProgress.complete) {
        setCountDown(0);
      }
      setIndexQuestion(saveProgress.indexQuestion);
      setChoice(saveProgress.choice);
      setCorrect_answer(saveProgress.correct_answer);
      setCountDown(saveProgress.countDown);
      setWrongAnswer(saveProgress.wrongAnswer);
      setTotalAnswer(saveProgress.totalAnswer);
      setReload(true);
    }
  }, [progress]);
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
    }
    return newArray;
  }
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  const saveAllProgress = () => {
    const parseUser = JSON.parse(user);
    const progress = {
      username: parseUser.username,
      countDown: countDown,
      correct_answer: correct_answer,
      wrongAnswer: wrongAnswer,
      complete: complete,
      choice: choice,
      indexQuestion: indexQuestion,
      wrongAnswer: wrongAnswer,
      totalAnswer: totalAnswer,
    };
    localStorage.setItem("progress", JSON.stringify(progress));
  };
  useEffect(() => {
    if (!quiz) {
      navigate("/configuration");
    }
  }, [quiz]);
  const data = useMemo(() => {
    return quiz ? JSON.parse(quiz) : null;
  }, [quiz]);
  const shuffleData = useMemo(() => {
    return data?.map(item => ({
      ...item,
      allAnswers: shuffleArray([
        ...item.incorrect_answers,
        item.correct_answer,
      ]),
    }));
  }, [data]);
  const answer = item => {
    setChoice(item);
    setDisable(true);
    setIsAnswer(true);
    setTotalAnswer(prev => prev + 1);
    if (data[indexQuestion].correct_answer === item) {
      setCorrect_answer(prev => prev + 1);
    } else {
      setWrongAnswer(prev => prev + 1);
    }
    const timer = setTimeout(() => {
      if (indexQuestion < data.length - 1) {
        setIndexQuestion(indexQuestion + 1);
      }
      if (indexQuestion === data.length - 1) {
        setComplete(true);
        setCountDown(0);
      }
      setDisable(false);
      setIsAnswer(false);
      setChoice("");
    }, 500);
    return () => clearInterval(timer);
  };
  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(prev => prev - 1);
        saveAllProgress();
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countDown === 0) {
      saveAllProgress();
      setComplete(true);
    }
    return;
  }, [indexQuestion, countDown]);
  const tryAgain = () => {
    localStorage.removeItem("progress");
    setTotalAnswer(0);
    setWrongAnswer(0);
    setIndexQuestion(0);
    setCountDown(60);
    setCorrect_answer(0);
    setComplete(false);
  };
  const restart = () => {
    localStorage.removeItem("quiz");
    localStorage.removeItem("progress");
    navigate("/configuration");
  };
  return (
    <div className="flex flex-col items-center gap-3 w-full justify-center px-8 ">
      {quiz && indexQuestion <= data.length - 1 && !complete ? (
        <div className="flex flex-col items-center gap-3 justify-center w-full md:max-w-[400px]">
          <div className=" border-2 border-gray-400 w-full text-center rounded-md text-gray-500 font-semibold relative">
            <div
              className={`absolute ${
                countDown >= 0 && countDown <= 20
                  ? "bg-red-500"
                  : countDown >= 21 && countDown <= 40
                  ? "bg-yellow-300"
                  : "bg-green-400"
              } top-0 bottom-0  -z-10`}
              style={{ width: `${(countDown / 60) * 100}%` }}></div>
            <p className="z-20 text-gray-600">{countDown}</p>
          </div>
          <div className="border-2 border-gray-400 min-w-full rounded-md px-5 py-9 flex flex-col gap-4 md:py-12">
            <div className="">
              <h3 className="font-semibold text-center font-bicount text-[20px] md:text-[22px] xl:text-[24px]">
                Question {indexQuestion + 1}
              </h3>
              <p
                className="font-semibold font-roboto mt-5 xl:text-[18px]"
                dangerouslySetInnerHTML={{
                  __html: shuffleData[indexQuestion].question,
                }}></p>
            </div>

            <ol className="flex flex-col gap-2 w-full">
              {shuffleData[indexQuestion].allAnswers.map((item, index) => (
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
              ))}
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
          <table className="font-bicount text-start m-auto">
            <tbody>
              <tr>
                <td>
                  <h5>Total Answer </h5>
                </td>
                <td>
                  <p className="">
                    : {totalAnswer}/{data.length}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Correct </h5>
                </td>
                <td>
                  <p className=" text-green-600">: {correct_answer}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Wrong </h5>
                </td>
                <td>
                  <p className=" text-red-600">: {wrongAnswer}</p>
                </td>
              </tr>
            </tbody>
          </table>
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
