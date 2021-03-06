import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiMenu } from "react-icons/bi";
import { isNumberKey, numberToCurrency } from "../../helpers";
import bin from "../../images/bin-grey.png";
import { deleteTravel, updateTravel } from "../../store/entities/travel";

function TravelRow(props) {
  const dispatch = useDispatch();
  const { travel, provided, index } = props;
  const { cost, quantity, travelId, description } = travel;
  const total = cost * quantity;
  const formattedCost = numberToCurrency(total)

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "cost" || key === "quantity") {
      if (e.target.value) {
        value = parseInt(value.slice(-4));
      } else value = 0;
    }
    dispatch(
      updateTravel({
        travelId,
        key,
        value,
      })
    );
  }

  function handleDeleteTravel() {
    dispatch(deleteTravel({ travelId }));
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
      <input
        id={index + "quantity"}
        name="quantity"
        value={quantity}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field materialsQuantity"
      />
      <p className="field display materialsTotal">{formattedCost ? formattedCost : null}</p>
      <div className="hidden deleteIcon">
        <img
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteTravel}
        />
      </div>
    </div>
  );
}
export default TravelRow;
