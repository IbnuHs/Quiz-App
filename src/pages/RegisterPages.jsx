import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const RegisterPages = () => {
  const [visible, setVisible] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [repeatPass, setRepeatPass] = useState("");
  const onRegister = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (data.password !== repeatPass) {
      alert("Password Is Not Match");
      return;
    }
    if (data.password.length < 8) {
      alert("Password Length Should Be 8 Character");
      return;
    }
    const userExist = users.find(user => user.username === data.username);
    if (userExist) {
      alert("Username Sudah Ada");
      return;
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <form
        onSubmit={onRegister}
        className="flex font-roboto m-auto flex-col border-2 border-gray-300 w-full rounded-md px-5 py-10 max-w-[300px] gap-5 md:max-w-[380px] md:px-8 lg:px-10 lg:max-w-[400px]:">
        <h3 className="font-semibold text-center font-bicount text-[20px] mb-4 lg:text-[24px]">
          Register
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
            className=" px-2 py-0.5 border-2 font-delius text-gray-800 border-gray-300 outline-none rounded-md bg-transparent"
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
              className=" bg-transparent outline-none text-gray-500"
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="text-gray-600">
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex flex-col relative gap-1">
          <label htmlFor="" className="font-semibold font-delius text-gray-800">
            Repeat Password
          </label>
          <div className="flex w-full px-2 py-0.5 border-2 justify-between border-gray-300 rounded-md ">
            <input
              type={visibleRepeat ? "text" : "password"}
              value={repeatPass}
              required
              onChange={e => setRepeatPass(e.target.value)}
              className=" bg-transparent outline-none text-gray-500"
            />
            <button
              type="button"
              onClick={() => setVisibleRepeat(!visibleRepeat)}
              className="text-gray-600">
              {visibleRepeat ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <button
            type="submit"
            className="text-[14px] font-bicount w-fit font-semibold bg-base-blue text-green-50 px-4 py-0.5 rounded">
            Submit
          </button>
          <div className="text-[11px] font-semibold flex gap-1">
            <p>Already Have Account?</p>
            <a href="/login" className="underline text-blue-600">
              login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
