import { useLoginUserMutation } from "../reducers/api/authApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setEmail } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, EyeIcon } from "lucide-react";

import AmibotLogo from "../assets/Chat/AmibotLogo.png";
import WavyUnderline from "../assets/Login/wavy_underline.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");

  const [loginUser, { isLoading: isLoggingIn }] =
    useLoginUserMutation();

  const handleLogin = async () => {
    try {
      const res = await loginUser({
        username: loginUsername,
        password: loginPassword,
      }).unwrap();

      dispatch(setAccessToken(res.access_token));
      dispatch(setEmail(loginUsername));
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error?.data) {
        console.error("Login failed (API Error):", error.data);
      } else if (error?.message) {
        console.error(
          "Login failed (Serialized Error):",
          error.message
        );
      } else if (error instanceof Error) {
        console.error(
          "Login failed (JavaScript Error):",
          error.message
        );
      } else {
        console.error("Login failed (Unknown Error):", error);
      }
    }
  };

  return (
    <div className="flex flex-row-reverse gap-10 h-screen items-center p-4 lg:p-0 lg:pr-10 justify-center lg:justify-end bg-white">
      {/* Login Form */}
      <div className="w-[90%] lg:w-[50%] flex justify-center items-center">
        <div className="px-6 md:px-14 lg:px-10 border-2 w-max border-neutral-200 py-8 rounded-2xl text-black flex flex-col gap-8 lg:gap-14 justify-center">
          <div>
            <h1 className="font-bold">AmiBot</h1>
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Login to your account
            </h1>
          </div>

          <form
            className="flex flex-col w-full gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email */}
            <div>
              <input
                className="border border-neutral-300 w-full px-4 h-12 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                type="email"
                placeholder="Email"
                value={loginUsername}
                onChange={(e) =>
                  setLoginUsername(e.target.value)
                }
                required
                disabled={isLoggingIn}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                className="border border-neutral-300 w-full px-4 h-12 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
                required
                disabled={isLoggingIn}
              />

              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeIcon className="w-5" />
                ) : (
                  <EyeClosed className="w-5" />
                )}
              </button>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="bg-black text-white w-full p-2 px-8 rounded-md cursor-pointer hover:opacity-75 disabled:opacity-50"
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center h-screen w-[50%] bg-black text-white gap-3">
        <img className="w-35" src={AmibotLogo} alt="Micorza Logo" />
        <h1 className="text-3xl font-semibold">
          AmiBot
        </h1>
        <img
          className="w-40 h-1"
          src={WavyUnderline}
          alt=""
        />
        <p className="mt-3">intelligent conversations</p>
        <p>Get answers to your questions instantly</p>
      </div>
    </div>
  );
};

export default Login;
