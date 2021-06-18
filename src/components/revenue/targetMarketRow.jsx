import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import {
  updateMarket,
  deleteMarket,
  getMarketData,
} from "../../store/entities/revenue";
import bin from "../../images/bin-grey.png";
import dropdown2 from "../../images/dropArrow2.png";

function TargetMarketRow(props) {
  let { name, start, growth } = props.market;
  const { index } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { marketOptions } = state.entities.options.data;
  const market = getMarketData(state)[name];

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "start" || key === "growth") {
      if (e.target.value) {
        value = parseInt(value.slice(-7));
      } else value = 0;
    }
    dispatch(updateMarket({ index, key, value }));
  }

  return (
    <div className="row">
      <div className="relative">
        {name === "UK Market" || name === "Global" ? (
          <p className="field market display">{name}</p>
        ) : (
          <>
            <select
              id={index + "name"}
              name="name"
              value={name}
              onChange={onChangeHandler}
              className="field market"
            >
              <option hidden value="">
                select option
              </option>
              {marketOptions.map((market, index) => {
                return (
                  <option key={index} value={market}>
                    {market}
                  </option>
                );
              })}
            </select>
            <div className="dropdown">
              <img src={dropdown2} alt="option" />
            </div>
          </>
        )}
      </div>

      <input
        id={name + "year"}
        name="start"
        value={start || 0}
        onKeyDown={isNumberKey}
        onChange={onChangeHandler}
        className="field year"
      />
      <p className="field display year">{market.y2}</p>
      <p className="field display year">{market.y3}</p>
      <p className="field display year">{market.y4}</p>
      <p className="field display year">{market.y5}</p>
      <input
        id={index + "growth"}
        name="growth"
        value={growth || 0}
        onChange={onChangeHandler}
        className="field year"
      />

      <button className="textButton">Source</button>
      {index === 0 || name === "Global" ? null : (
        <div className="hidden deleteIcon">
          <img
            src={bin}
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(deleteMarket({ index }))}
          />
        </div>
      )}
    </div>
  );
}
export default TargetMarketRow;
