import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
    // residualValue,
    utilisation,
  } = capex;
  const { projectLength } = useSelector(
    (state) => state.entities.project.data.details
  );
  const { utilisations } = useSelector((state) => state.entities.options.data);
  const residualValue = depreciation === 0 ? 0 : Math.round(
    (1 - projectLength / depreciation) * currentValue
  );
  const netCost =
    Math.round((currentValue - residualValue) * utilisation) / 100;

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "depreciation" || key === "currentValue") {
      if (e.target.value) {
        value = parseInt(value.slice(-5));
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
      <p className="field display small">{residualValue}</p>
      <select
        id={index + "utilisation"}
        name="utilisation"
        value={utilisation}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field small"
      >
        {utilisations.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <p className="field display small">{netCost ? netCost : null}</p>
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
