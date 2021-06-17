import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey, roundTo } from "../../helpers";
import { updateMarket, deleteMarket } from "../../store/entities/revenue";
import bin from "../../images/bin-grey.png";
import dropdown2 from "../../images/dropArrow2.png";

function TargetMarketRow(props) {
  let { name, start, growth } = props.market;
  const { index } = props;
  const dispatch = useDispatch();
  const { marketOptions } = useSelector((state) => state.entities.options.data);
  const values = name && start && growth;
  const year2 = values ? roundTo(start + (start * growth) / 100, 0) : null;
  const year3 = values ? roundTo(year2 + (year2 * growth) / 100, 0) : null;
  const year4 = values ? roundTo(year3 + (year3 * growth) / 100, 0) : null;
  const year5 = values ? roundTo(year4 + (year4 * growth) / 100, 0) : null;

  if (index === 0) name = "UK Market";

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "start" || key === "growth") {
      if (e.target.value) {
        value = parseInt(value.slice(-6));
      } else value = 0;
    }
    dispatch(updateMarket({ index, key, value }));
  }

  return (
    <div className="row">
      <div className="relative">
        {name === 'UK Market' || name === 'Global' ? (
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
      <p className="field display year">{year2}</p>
      <p className="field display year">{year3}</p>
      <p className="field display year">{year4}</p>
      <p className="field display year">{year5}</p>
      <input
        id={index + "growth"}
        name="growth"
        value={growth || 0}
        onChange={onChangeHandler}
        className="field year"
      />

      <button className="profileButton">Source</button>
      {index === 0 || name === 'Global' ? null : (
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
