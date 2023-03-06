import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { RingLoader } from "react-spinners";
import { app } from "../firebase/firebase";
import { toast } from "react-toastify";
const { ipcRenderer } = window.require("electron");

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [registering, setRegistering] = useState(false);
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/dashboard");
    }
  }, []);
  function handleRegister() {
    if (
      document.querySelector("#email").value !== "" &&
      document.querySelector("#password").value !== ""
    ) {
      setRegistering(true);
    } else {
      toast.info("Please fill all fields!");
    }
    const auth = getAuth(app);
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setRegistering(!registering);
        toast.success(`Thank you for registering!`);
        sessionStorage.setItem("Auth Token", userCredential.user.uid);
        ipcRenderer.invoke("createUser", password).then((result) => {
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        toast.error(error.message);
        setRegistering(false);
      });
  }
  return (
    <div className="w-screen h-screen bg-[#0a1929]">
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <div className="w-full flex justify-center">
                <img
                  src="logo.png"
                  alt="SafePass Logo"
                  className="w-50 h-10 my-10"
                />
              </div>
              <p className="text-gray-500">Sign up to access your account</p>
            </div>
            <div className="m-7">
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-300 bg-gray-700 text-white border-gray-600"
                  />
                </div>
                <div className="mb-6">
                  <div className="mb-2">
                    <label htmlFor="password" className="text-sm text-gray-400">
                      Password
                    </label>
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    required
                    className="w-full px-3 py-2  placeholder-gray-500 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600 relative"
                  />
                  <div>
                    {showPass ? (
                      <AiOutlineEyeInvisible
                        color={"white"}
                        className="absolute right-[27%] bottom-[39%] cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      />
                    ) : (
                      <AiOutlineEye
                        color={"white"}
                        className="absolute right-[27%] bottom-[39%] cursor-pointer"
                        onClick={() => setShowPass(!showPass)}
                      />
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    onClick={(e) => handleRegister()}
                  >
                    {registering ? (
                      <RingLoader
                        color={"white"}
                        loading={registering}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <>Sign up</>
                    )}
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Have an account already?{" "}
                  <Link
                    to={"/login"}
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
