import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_bord_action } from "../../Redux/Actions/BordActions";
import Nav from "../Share/Nav";

function AddBord() {
  const [bordName, setBordName] = useState("");
  const [bordColor, setBordColor] = useState("");
  const dispatch = useDispatch();

  const add_bord = (e) => {
    e.preventDefault();
    if (bordName !== "") {
      const bord_object = {
        id: Math.round(Date.now() * Math.random()),
        title: bordName,
        bgColor: bordColor,
        list: [],
      };
      dispatch(add_bord_action(bord_object));
      setBordName("");
    } else {
      alert("Please enter a bord name");
    }
  };

  const colorClick = (e) => {
    let allColorButton = e.target.parentNode.children;
    for (let i = 0; i < allColorButton.length; i++) {
      const classList = allColorButton[i].classList;
      for (let i = 0; i < classList.length; i++) {
        if (classList[i] === "border-2" || classList[i] === "border-black") {
          classList.remove("border-2");
          classList.remove("border-black");
          e.target.classList.add("border-2");
          e.target.classList.add("border-black");
        }
        if (classList[i] !== "border-2" || classList[i] !== "border-black") {
          e.target.classList.add("border-2");
          e.target.classList.add("border-black");
        }
      }
    }
  };

  return (
    <div> 
      {/* main navigation bar// */}
       <Nav/>   
       {/* main boaard creation form// */}
      <div className="md:px-16 pt-10 pb-5 mx-2">
      <div className=" rounded shadow-lg md:w-[25rem] bg-white">
        <div className="p-3 pb-4 text-center bg-gray-200 rounded">
          <form>
            <input
              type="text"
              className=" w-full border outline-none p-1 text-[18px] rounded"
              onChange={(e) => setBordName(e.target.value)}
              value={bordName}
              placeholder="Enter Board Title"
              autoFocus
            />
            <div className="submit__button__and__color__set flex md:flex-row flex-col justify-start md:justify-between pt-3 ">
              <div className="left flex w-[17rem] mt-2">
                <button
                  className="w-[2rem] h-[2rem] bg-red-300 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-red-300");
                    colorClick(e);
                  }}
                ></button>
                <button
                  className="w-[2rem] h-[2rem] bg-orange-200 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-orange-200");
                    colorClick(e);
                  }}
                ></button>
                <button
                  className="w-[2rem] h-[2rem] bg-pink-200 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-pink-200");
                    colorClick(e);
                  }}
                ></button>
                <button
                  className="w-[2rem] h-[2rem] bg-blue-300 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-blue-300");
                    colorClick(e);
                  }}
                ></button>
                <button
                  className="w-[2rem] h-[2rem] bg-rose-200 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-rose-200");
                    colorClick(e);
                  }}
                ></button>
                <button
                  className="w-[2rem] h-[2rem] bg-purple-300 mr-2 rounded shadow"
                  type="button"
                  onClick={(e) => {
                    setBordColor("bg-purple-300");
                    colorClick(e);
                  }}
                ></button>
              </div>

              {/* <div className="right"> */}
                <button
                  type="submit"
                  className="w-[8rem] bg-sky-500 text-white p-1 font-medium text-[18px] rounded ml-1 mt-2 md:mr-0"
                  onClick={add_bord}
                >
                  Add Bord
                </button>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AddBord;
