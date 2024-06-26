import React from "react";
import { useDispatch } from "react-redux";
import { delete_bord_list_id_action } from "../../Redux/Actions/BordActions";
import { delete_list } from "../../Redux/Actions/ListAction";

function OptionListItem({
  setIsOption,
  setIsEdit,
  setEditValue,
  setIsMove,
  setIsCopy,
  listTitle,
  id,
  bordId,
}) {
  const dispatch = useDispatch();

  return (
    <div className="absolute bg-slate-100 w-[12.5rem] shadow rounded top-[.5rem] left-[7.5rem] z-10">
      <ul className=" rounded">
        <li
          onClick={() => {
            setIsOption(false);
            setIsEdit(true);
            setEditValue(listTitle);
          }}
          className="hover:bg-teal-500 rounded p-1 pl-2 pr-2 hover:text-white cursor-pointer text-lg  "
        >
          Edit Title
        </li>
        <li
          onClick={() => {
            setIsOption(false);
            dispatch(delete_list({ id }));
            dispatch(delete_bord_list_id_action({ bordId, listId: id }));
          }}
          className="hover:bg-teal-500 rounded p-1 pl-2 pr-2 hover:text-white cursor-pointer text-lg "
        >
          Delete List
        </li>
        <li
          onClick={() => {
            setIsOption(false);
            setIsMove(true);
          }}
          className="hover:bg-teal-500 rounded  p-1 pl-2 pr-2 hover:text-white cursor-pointer text-lg "
        >
          Move List
        </li>
        <li
          onClick={() => {
            setIsOption(false);
            setIsCopy(true);
          }}
          className="hover:bg-teal-500 rounded  p-1 pl-2 pr-2 hover:text-white cursor-pointer text-lg "
        >
          Copy List
        </li>
      </ul>
    </div>
  );
}

export default OptionListItem;
