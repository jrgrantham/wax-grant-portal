import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";
import { updateUserSelection } from "../../store/user";
import {
  addToProjectList,
  removeFromProjectList,
  setProjectDefault,
} from "../../store/entities/setup";
import Global from "./globalIndicator";
// import {addToProjectList}

function OptionsList(props) {
  const dispatch = useDispatch();

  const { showComponent } = useSelector((state) => state.user);
  const { title, list, defaultOption, listKey, defaultKey, global } = props;

  const [value, setValue] = useState("");

  function handleChange(e) {
    let value = e.target.value;
    if (e.target.value) {
      value = value.slice(-50);
    }
    setValue(value);
  }

  function toggleList(list) {
    const value = showComponent === list ? "" : list;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

  function submitNew() {
    const result = value.trim();
    if (result) {
      dispatch(addToProjectList({ key: listKey, value: result }));
      setValue("");
    }
  }

  function removeItem(index) {
    dispatch(removeFromProjectList({ key: listKey, index }));
  }

  function submitDefault(value) {
    dispatch(setProjectDefault({ key: defaultKey, value }));
  }

  return (
    <>
      <div className="row">
        {global ? <Global /> : null}
        <p className="field display description">{title}</p>
        <input
          type="text"
          id={listKey}
          name={listKey}
          value={value}
          onChange={handleChange}
          className="field text"
        />
        <button onClick={submitNew} className="imageButton add">
          <img src={add} alt="add" />
        </button>
        <button className="showButton" onClick={() => toggleList(listKey)}>
          {showComponent === listKey ? "Hide" : "Show"}
        </button>
      </div>
      {showComponent === listKey ? (
        <div className="list">
          {list.map((type, index) => {
            return (
              <div key={index} className="listRow">
                <div className="left">
                  <button
                    onClick={() => removeItem(index)}
                    className="imageButton hidden"
                  >
                    <img src={bin} alt="delete" />
                  </button>
                  <p>{type}</p>
                </div>
                {defaultKey ? (
                  <button
                    onClick={() => submitDefault(type)}
                    className={
                      type === defaultOption
                        ? "showButton selected"
                        : "showButton hidden"
                    }
                  >
                    Default
                  </button>
                ) : null}
              </div>
            );
          })}
          {/* <div className="listRow"> */}
          {/* <button className="showButton">Sort</button> */}
          {/* </div> */}
        </div>
      ) : null}
    </>
  );
}
export default OptionsList;
