import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { app } from "../firebase/firebase";

function ForgotPass() {
  const [resetting, setResetting] = useState(false);
  function forgotHandler() {
    const auth = getAuth(app);
    const email = document.getElementById("email").value;
    if (email !== "") {
      setResetting(true);
    } else {
      toast.info("Please enter your email address!");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetting(false);
        toast.success(`Password reset link sent to ${email}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <div className="w-screen h-screen bg-[#0a1929]">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="w-full flex justify-center">
                <img
                  src="logo.png"
                  alt="SafePass Logo"
                  className="w-50 h-10 my-10"
                />
              </div>
              <h1 className="block text-xl font-bold text-white">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Remember your password?
                <Link
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
                  to="/login"
                >
                  {" "}
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@company.com"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="py-3 px-4  rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => forgotHandler()}
                  >
                    {resetting ? (
                      <div className="w-full flex justify-center">
                        <RingLoader
                          color={"white"}
                          loading={resetting}
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    ) : (
                      <>Reset Password</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
