import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import { updateStream } from "../../store/entities/revenue";

function RevenueStreamRow(props) {
  const { name, index, streamIndex, stream } = props;
  const dispatch = useDispatch();
  function onChangeHandler(e) {
    const year = e.target.name;
    let value = e.target.value;
    if (value) value = parseInt(value.slice(-6));
    dispatch(updateStream({ streamIndex, market: name, year, value }));
  }

  console.log(stream);

  const streamMarketData = useSelector(
    (state) => state.entities.revenue.data.streams[streamIndex][name]
  );
  let y1, y2, y3, y4, y5;
  if (streamMarketData) ({ y1, y2, y3, y4, y5 } = streamMarketData);

  return (
    <div className="revenueRow">
      <p className="field market display">{name}</p>
      <input
        id={name + streamIndex + "y1"}
        name="y1"
        value={y1 || ""}
        onChange={onChangeHandler}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={name + streamIndex + "y2"}
        name="y2"
        value={y2 || ""}
        onChange={onChangeHandler}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={name + streamIndex + "y3"}
        name="y3"
        value={y3 || ""}
        onChange={onChangeHandler}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={name + streamIndex + "y4"}
        name="y4"
        value={y4 || ""}
        onChange={onChangeHandler}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={name + streamIndex + "y5"}
        name="y5"
        value={y5 || ""}
        onChange={onChangeHandler}
        onKeyDown={isNumberKey}
        className="field year"
      />
    </div>
  );
}
export default RevenueStreamRow;
