import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import { getMarketList, updateStreamUnit, updateStreamYear } from "../../store/entities/revenue";
import { updateUserSelection } from "../../store/user";

function RevenueStreamRow(props) {
  const { name, streamIndex, streamName, index } = props;
  const state = useSelector((state) => state);
  const { showComponent } = state.user;
  const allMarkets = getMarketList(state);
  const rowName = streamName + index;
  const dispatch = useDispatch();
  const data = state.entities.revenue.data.streams[streamIndex][name];
  
  const y1 = data && data.y1 ? data.y1 : 0;
  const y2 = data && data.y2 ? data.y2 : 0;
  const y3 = data && data.y3 ? data.y3 : 0;
  const y4 = data && data.y4 ? data.y4 : 0;
  const y5 = data && data.y5 ? data.y5 : 0;
  const unitRevenue = data && data.unitRevenue ? data.unitRevenue : 0;
  const [tempUnit, setTempUnit] = useState(unitRevenue);

  function handleQuantityChange(e) {
    const year = e.target.name;
    let value = e.target.value;
    if (value) value = parseInt(value.slice(-6));
    dispatch(updateStreamYear({ streamIndex, key: name, year, value }));
  }

  function handleUnitChange(e) {
    let value = e.target.value;
    if (value) value = parseInt(value.slice(-6));
    setTempUnit(e.target.value);
  }

  function setEditUnit(value) {
    const key = "showComponent";
    dispatch(updateUserSelection({ key, value }));
  }

  function confirmChange(input) {
    setEditUnit("");
    const all = input === 'all'
    const markets = all ? allMarkets : [name]
    dispatch(updateStreamUnit({streamIndex, markets, value: tempUnit}))
  }

  return (
    <div className="revenueRow">
      <p className="field market display">{name}</p>
      <input
        id={streamName + index + "y1"}
        name="y1"
        value={y1}
        onChange={handleQuantityChange}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={streamName + index + "y2"}
        name="y2"
        value={y2}
        onChange={handleQuantityChange}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={streamName + index + "y3"}
        name="y3"
        value={y3}
        onChange={handleQuantityChange}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={streamName + index + "y4"}
        name="y4"
        value={y4}
        onChange={handleQuantityChange}
        onKeyDown={isNumberKey}
        className="field year"
      />
      <input
        id={streamName + index + "y5"}
        name="y5"
        value={y5}
        onChange={handleQuantityChange}
        onKeyDown={isNumberKey}
        className="field year"
      />
      {showComponent === rowName ? (
        <div className="hiddenInput">
          <input
            id={streamName + index + "edit"}
            name="unitRevenue"
            value={tempUnit}
            onChange={handleUnitChange}
            onKeyDown={isNumberKey}
            className="field year "
          />
          <button onClick={() => confirmChange('one')} className="textButton">
            apply to this market
          </button>
          <button onClick={() => confirmChange('all')} className="textButton">
            apply to all markets
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditUnit(rowName)}
          className="textButton marginLeft"
        >
          Unit revenue: {unitRevenue}
        </button>
      )}
    </div>
  );
}
export default RevenueStreamRow;
