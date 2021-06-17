import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiMenu } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import bin from "../../images/bin-grey.png";
import { deleteOther, updateOther } from "../../store/entities/other";
import { toggleAssignment } from "../../store/entities/assignments";

function OtherRow(props) {
  const dispatch = useDispatch();
  const { other, provided, index, leader } = props;
  const { cost, otherId, description } = other;

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "cost" || key === "quantity") {
      if (e.target.value) {
        value = parseInt(value.slice(-5));
      } else value = 0;
    }
    dispatch(
      updateOther({
        otherId,
        key,
        value,
      })
    );
  }

  function handleDeleteOther() {
    dispatch(deleteOther({ otherId }));
    dispatch(toggleAssignment({leader, }))
  }

  return (
    <div className="row">
      <Tippy content="Drag to reorder rows">
        <div {...provided.dragHandleProps} className="hidden grabHandle">
          <BiMenu />
        </div>
      </Tippy>
      <input
        id={index + "description"}
        name="description"
        value={description}
        onChange={onChangeHandler}
        className="field materialsDescription"
      />
      <input
        type="text"
        id={index + "cost"}
        name="cost"
        value={cost}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field materialsCost"
      />
      <div className="hidden deleteIcon">
        <img
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteOther}
        />
      </div>
    </div>
  );
}
export default OtherRow;
