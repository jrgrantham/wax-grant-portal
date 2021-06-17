import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RevenueStreamRow from "./revenueStreamRow";
import bin from "../../images/bin-grey.png";
import { deleteStream, getStreamTotals } from "../../store/entities/revenue";
import { store } from "../../store";

function RevenueStream(props) {
  const { stream, index } = props;
  const state = store.getState()
  const dispatch = useDispatch();
  const { markets } = useSelector((state) => state.entities.revenue.data);
  const streamIndex = index;

  const display = markets.filter(market => market.name !== 'Global')

  function onChangeHandler(e) {}

  const total = getStreamTotals(state)[index]

  let title = `Revenue Stream ${index + 1}`;
  if (stream.name) title = title + ` - ${stream.name}`;

  return (
    <div className="revenueStream relative">
      <div className="revenueRow">
        <p className="stream">{title}</p>
        <input
          id={stream.name + "revenue"}
          name="revenue"
          value={stream.unitRevenue}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>

      {display.map(({ name }, index) => {
        return (
          <RevenueStreamRow
            name={name}
            key={index}
            index={index}
            streamIndex={streamIndex}
            stream={stream}
          />
        );
      })}
      <div className="revenueRow">
      <p className="field market display">Global</p>
      < p className="field year display">{total.y1.sales}</p>
      < p className="field year display">{total.y2.sales}</p>
      < p className="field year display">{total.y3.sales}</p>
      < p className="field year display">{total.y4.sales}</p>
      < p className="field year display">{total.y5.sales}</p>
    </div>
      <button
        onClick={() => dispatch(deleteStream({ index }))}
        className="streamDelete hidden"
      >
        <img src={bin} alt="delete" />
      </button>
    </div>
  );
}
export default RevenueStream;
