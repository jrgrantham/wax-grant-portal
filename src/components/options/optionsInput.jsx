import React from "react";
import { useDispatch } from "react-redux";
import { isNumberKey } from "../../helpers";
import { updateValue } from "../../store/entities/options";
import Tippy from "@tippy.js/react";
import warning from "../../images/warning.png";
import Global from "./globalIndicator";

function OptionsInput(props) {
  const dispatch = useDispatch();
  const { title, field, value, multiple, characters = 2, global } = props;

  function handleChange(e) {
    let value = e.target.value;
    if (e.target.value) {
      value = parseInt(value.slice(-characters));
    } else value = 0;
    dispatch(updateValue({ key: field, value }));
  }

  const row = (
    <div className="row">
      {global ? <Global /> : null}
      <p className="field display description">{title}</p>
      <input
        type="text"
        id={field}
        name={field}
        value={value}
        onKeyDown={isNumberKey}
        onChange={handleChange}
        className="field value"
      />
    </div>
  );

  const input = (
    <input
      type="text"
      id={field}
      name={field}
      value={value}
      onKeyDown={isNumberKey}
      onChange={handleChange}
      className="field value"
    />
  );

  if (multiple) return input;
  else return row;
}
export default OptionsInput;
