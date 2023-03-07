import React, { useState } from "react";
import { AiFillEye, AiOutlineSearch } from "react-icons/ai";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const { ipcRenderer } = window.require("electron");

const Search = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = (e) => {
    setId(e.target.id);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [searching, setSearching] = useState(false);
  function searchQuery() {
    const search = document.querySelector("#search");
    if (search.value !== "") {
      setSearching(true);
    } else {
      toast.info("Please give search query!");
    }
    ipcRenderer.invoke("getDB", search.value).then((data) => {
      setData(data);
    });
  }
  function decrypt() {
    const key = document.querySelector("#master");
    ipcRenderer.invoke("getPassword", [key.value, id]).then((data) => {
      data !== undefined
        ? (document.querySelector("#password").innerHTML = data)
        : toast.error("Wrong master key!");
    });
  }
  return (
    <div className="w-screen h-screen bg-[#0a1929] overflow-hidden">
      <div className="w-full flex justify-center">
        <img src="logo.png" alt="SafePass Logo" className="w-50 h-10 my-10" />
      </div>
      <div className="max-w-md mx-auto my-10">
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3">
              <AiOutlineSearch size={20} color="gray" />
            </div>
            <input
              type="text"
              id="search"
              className="border text-sm outline-none rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="Search domains"
              required
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => searchQuery()}
          >
            Search
          </button>
        </form>
      </div>
      {searching && (
        <div className="flex w-full justify-center items-center">
          <RingLoader
            color={"white"}
            loading={!(data.length > 0)}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="overflow-y-scroll h-1/2">
        {data.length > 0 ? (
          <>
            {data.map((item) => {
              return (
                <div
                  key={Math.random() * 1000}
                  className="p-3 h-[30vh] mx-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white rounded-md my-3"
                >
                  <div className="w-full flex justify-center">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.domain}`}
                      alt=""
                      className="w-10 h-10 rounded-md"
                    />
                  </div>
                  <div className="text-gray-600">
                    <span className="text-white font-bold">Email: </span>
                    {item.email}
                  </div>
                  <div className="text-gray-600">
                    <span className="text-white font-bold">Password: </span>
                    **************
                    <button
                      className="ml-5 bg-blue-500 text-white p-2 rounded-md"
                      id={item.password}
                      onClick={(e) => onOpenModal(e)}
                    >
                      View
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <span className="text-white font-bold">Domain: </span>
                    {item.domain}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Link
          to={"/dashboard"}
          className="fixed bottom-10 bg-blue-400 text-white rounded-md p-3"
        >
          Back
        </Link>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Master key</h2>
        <input
          type="text"
          id="master"
          className="border text-sm outline-none rounded-lg block w-full  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="master key"
          required
        />
        <button
          className="p-2 bg-blue-400 my-3 rounded-md text-white"
          onClick={() => decrypt()}
        >
          show
        </button>
        <h2 className="font-bold">Password</h2>
        <div className="flex justify-between">
          <p id="password">*********</p>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
