import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const { ipcRenderer } = window.require("electron");

const Search = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ipcRenderer.invoke("getDB").then((result) => {
      if (result.status === "success") {
        console.log(result.data);
        setData(result.data);
      } else {
        toast.error("Please create passwords first!");
      }
    });
  }, []);
  return (
    <div className="w-screen h-screen bg-[#0a1929] overflow-hidden">
      <Link to={"/dashboard"}>
        <AiOutlineArrowLeft
          size={40}
          className="mt-3 ml-5 font-bold p-2 rounded-full bg-blue-500 cursor-pointer text-white w-100%"
        />
      </Link>
      <div className="w-full flex justify-center">
        <img
          src="logo.png"
          alt="SafePass Logo"
          className="w-50 h-10 mt-8 mb-4"
        />
      </div>
      <div className="overflow-y-scroll h-full grid"></div>
    </div>
  );
};

export default Search;
