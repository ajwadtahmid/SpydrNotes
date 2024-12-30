import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  // show/hide password
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="text-sm">
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <div className="relative mt-2">
        <input
          value={value}
          onChange={onChange}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          id="password"
          name="password"
          // required
          autoComplete="current-password"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />

        {isShowPassword ? (
          <FaRegEye
            size={22}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
