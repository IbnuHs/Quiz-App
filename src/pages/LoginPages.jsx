import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const LoginPages = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users"));
  const onRegister = e => {
    e.preventDefault();
    const user = users.find(
      i => i.username === data.username && i.password === data.password
    );
    if (!user) {
      alert("Invalid Username Or Wrong Password");
      return;
    }
    localStorage.setItem(
      "isLogin",
      JSON.stringify({ isLogin: true, username: user.username })
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <form
        onSubmit={onRegister}
        className="flex font-roboto m-auto flex-col border-2 border-gray-400 w-full rounded-md px-5 py-10 max-w-[300px] gap-5 md:max-w-[380px] md:px-8 lg:px-10 lg:max-w-[400px] lg:py-16">
        <h3 className="font-semibold text-center font-bicount text-[20px] mb-4 lg:text-[22px] xl:text-[24px]">
          Login
        </h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-semibold font-delius text-gray-700">
            Username
          </label>
          <input
            type="text"
            required
            value={data.username}
            onChange={e =>
              setData(prev => ({ ...prev, username: e.target.value }))
            }
            className=" px-2 py-0.5 border-2 w-full font-delius text-gray-800 border-gray-300 outline-none rounded-md bg-transparent"
          />
        </div>
        <div className="flex flex-col relative gap-1">
          <label htmlFor="" className="font-semibold font-delius text-gray-800">
            Password
          </label>
          <div className="flex w-full px-2 py-0.5 border-2 justify-between border-gray-300 rounded-md ">
            <input
              type={visible ? "text" : "password"}
              value={data.password}
              required
              onChange={e =>
                setData(prev => ({ ...prev, password: e.target.value }))
              }
              className=" bg-transparent w-full outline-none text-gray-500"
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-gray-600">
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 lg:mt-4">
          <button
            type="submit"
            className="text-[14px] font-bicount w-fit font-semibold bg-base-blue text-green-50 px-4 py-0.5 rounded">
            Submit
          </button>
          <div className="text-[11px] font-semibold flex gap-1">
            <p>Doesn't Have Account?</p>
            <a href="/register" className="underline text-blue-600">
              register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
