import React from "react";
import { useSelector } from "react-redux";
import SingleBordBox from "./SingleBordBox";

function BordList() {
  const allBord = useSelector((state) => state.bord);
  return (
    <div>
      <div className="w-100 pb-4 md:px-16 m-0">
        {allBord?.map((bord) => {
          return (
            <SingleBordBox
              key={bord.id}
              id={bord.id}
              bgColor={bord.bgColor}
              title={bord.title}
              list={bord.list}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BordList;
