import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";
import { updateUserSelection } from "../../store/user";
import {
  addToList,
  removeFromList,
  setDefault,
} from "../../store/entities/options";
// import {addToList}

function ListOption(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { showComponent } = useSelector((state) => state.user);
  const { title, list, defaultOption, listKey, defaultKey } = props;

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function toggleList(list) {
    const value = showComponent === list ? "" : list;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

  function submitNew() {
    const result = value.trim();
    if (result) {
      dispatch(addToList({ key: listKey, value: result }));
      setValue("");
    }
  }

  function removeItem(index) {
    dispatch(removeFromList({ key: listKey, index }));
  }

  function submitDefault(value) {
    dispatch(setDefault({ key: defaultKey, value }));
  }

  return (
    <>
      <div className="row">
        <p className="field display description">{title}</p>
        <input
          type="text"
          id={listKey}
          name={listKey}
          value={value}
          // placeholder={defaultOption}
          // onKeyDown={isNumberKey}
          onChange={handleChange}
          className="field value"
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
              </div>
            );
          })}
          <div className="listRow">
            <button className="showButton">Sort</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ListOption;
