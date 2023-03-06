import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="py-24 flex items-center min-h-screen justify-center bg-[#0a1929]">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-white">
            Your Own Password Manager
          </p>
          <div className="w-full flex justify-center">
            <img
              src="logo.png"
              alt="SafePass Logo"
              className="w-50 h-10 mt-10 mb-8"
            />
          </div>
          <div className="w-full flex justify-center">
            <p className="mt-3 w-2/3 text-lg leading-relaxed text-white">
              SafePass is an open-source password manager that is designed to
              securely store and manage passwords.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Store Passwords
          </Link>
          <a
            href="/dashboard"
            className="transform rounded-md border border-slate-500 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-600"
          >
            {" "}
            Your Account{" "}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
