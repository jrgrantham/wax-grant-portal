import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiMenu } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import bin from "../../images/bin-grey.png";
import { deleteCapex, updateCapex } from "../../store/entities/capex";

function CapexRow(props) {
  const dispatch = useDispatch();
  const { capex, provided, index } = props;
  const {
    capexId,
    condition,
    description,
    depreciation,
    currentValue,
    residualValue,
    utilisation,
  } = capex;
  const total = 100; // formula required here

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "cost" || key === "quantity") {
      if (e.target.value) {
        value = parseInt(value.slice(-4));
      } else value = 0;
    }
    dispatch(
      updateCapex({
        capexId,
        key,
        value,
      })
    );
  }

  function handleDeleteCapex() {
    dispatch(deleteCapex({ capexId }));
  }

  return (
    <div className="row">
      <Tippy content="Drag to reorder rows">
        <div {...provided.dragHandleProps} className="hidden grabHandle">
          <BiMenu />
        </div>
      </Tippy>
      <select
        id={index + "condition"}
        name="condition"
        value={condition}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      >
        <option value="New">New</option>
        <option value="Existing">Existing</option>
      </select>
      <input
        id={index + "description"}
        name="description"
        value={description}
        onChange={onChangeHandler}
        className="field large"
      />
      <input
        type="text"
        id={index + "depreciation"}
        name="depreciation"
        value={depreciation}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      />
      <input
        type="text"
        id={index + "currentValue"}
        name="currentValue"
        value={currentValue}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      />
      <input
        id={index + "residualValue"}
        name="residualValue"
        value={residualValue}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      />
      <input
        id={index + "utilisation"}
        name="utilisation"
        value={utilisation}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      />
      <p className="field display small">{total ? total : null}</p>
      <div className="hidden deleteIcon">
        <img
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteCapex}
        />
      </div>
    </div>
  );
}
export default CapexRow;
