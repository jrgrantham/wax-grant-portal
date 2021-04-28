import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiMenu } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import bin from "../../images/bin-grey.png";
import { deleteMaterial, updateMaterial } from "../../store/entities/materials";

function MaterialsRow(props) {
  const dispatch = useDispatch();
  const { material, provided } = props;

  console.log(props);
  const total = material.cost * material.quantity

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "salary" || key === "dayRate") {
      if (e.target.value) {
        value = parseInt(value.slice(-6));
      } else value = 0;
    }
    dispatch(
      updateMaterial({
        materialId: material.materialId,
        key,
        value,
      })
    );
  }

  function handleDeleteMaterial() {
    dispatch(deleteMaterial({ materialId: material.materialId }));
  }

  return (
    <div className="row">
      <Tippy content="Drag to reorder rows">
        <div {...provided.dragHandleProps} className="hidden grabHandle">
          <BiMenu />
        </div>
      </Tippy>
      <input
        id={material.materialId + "description"}
        name="description"
        value={material.description}
        onChange={onChangeHandler}
        className="field materialsDescription"
      />
      <input
        type="text"
        id={material.cost + "cost"}
        name="cost"
        placeholder={material.cost}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field materialsCost"
        // list={`${material.materialId}roleList`}
      />
      <input
        id={material.materialId + "quantity"}
        name="quantity"
        value={material.quantity}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field materialsQuantity"
      />
      <p className="field display materialsTotal">
        {total ? total : null}
      </p>
      <div className="hidden deleteIcon">
        {/* <Tippy content="All associated data will be lost"> */}
        <img
          // className="delete"
          src={bin}
          alt="delete"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteMaterial}
        />
        {/* </Tippy> */}
      </div>
    </div>
  );
}
export default MaterialsRow;
