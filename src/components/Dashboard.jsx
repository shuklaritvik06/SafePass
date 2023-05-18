import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-[#0a1929]">
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mt-10 mb-8">
            <div className="text-center">
              <div className="w-full flex justify-center">
                <img
                  src="logo.png"
                  alt="SafePass Logo"
                  className="w-50 h-10 my-10"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <Link
              to={"/create"}
              className="p-3 h-[25vh] mx-3 bg-[#132f4c] border border-[#5090d3] text-4xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Create
            </Link>
            <Link
              to={"/search"}
              className="p-3 h-[25vh] mx-3 bg-[#132f4c] border border-[#5090d3] text-4xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Search
            </Link>
          </div>
          <div className="mt-16 flex flex-col w-full items-center">
            <p className="text-white text-lg font-bold mb-5">
              Loved my work?
              <span className="text-md text-blue-400 font-medium">
                {" "}
                Support Me
              </span>
            </p>
            <a
              href="https://www.buymeacoffee.com/ritvikshukla"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{ height: "60px", width: "217px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
