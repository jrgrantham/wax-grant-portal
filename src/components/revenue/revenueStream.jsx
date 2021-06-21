import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RevenueStreamRow from "./revenueStreamRow";
import bin from "../../images/bin-grey.png";
import qMark from "../../images/qMark.png";
import {
  deleteStream,
  getStreamTotals,
  updateStreamName,
} from "../../store/entities/revenue";
import Tippy from "@tippy.js/react";
import { updateUserSelection } from "../../store/user";

function RevenueStream(props) {
  const { stream, index } = props;
  const state = useSelector((state) => state);
  const total = getStreamTotals(state)[index];
  const { markets } = state.entities.revenue.data;
  const display = markets.filter((market) => market.name !== "Global");
  const streamIndex = index;
  const streamName = "stream" + index;
  const { showComponent } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function setEditName(value) {
    const key = "showComponent";
    dispatch(updateUserSelection({ key, value }));
  }

  function onChangeHandler(e) {
    const key = "streamName";
    const value = e.target.value;
    dispatch(updateStreamName({ streamIndex, key, value }));
  }

  let title = `Revenue Stream ${index + 1}`;
  if (stream.streamName) title = title + ` - ${stream.streamName}`;

  return (
    <div className="revenueStream relative">
      {showComponent === streamName ? (
        <div className="streamTitle">
          <input
            id={"unitRevenue" + index}
            name="unitRevenue"
            value={stream.streamName}
            onChange={onChangeHandler}
            className="field"
          />
          <button onClick={() => setEditName("")} className="textButton">
            close
          </button>
        </div>
      ) : (
        <div className="streamTitle">
          <p className="stream">{title}</p>

          <Tippy content="click to edit stream description">
            <button
              onClick={() => setEditName(streamName)}
              className="editTitle"
            >
              <img src={qMark} alt="add" />
            </button>
          </Tippy>
        </div>
      )}

      {display.map(({ name }, index) => {
        return (
          <RevenueStreamRow
            name={name}
            key={index}
            index={index}
            streamIndex={streamIndex}
            streamName={streamName}
          />
        );
      })}
      <div className="revenueRow">
        <p className="field market display">Global</p>
        <p className="field year display">{total.y1.sales}</p>
        <p className="field year display">{total.y2.sales}</p>
        <p className="field year display">{total.y3.sales}</p>
        <p className="field year display">{total.y4.sales}</p>
        <p className="field year display">{total.y5.sales}</p>
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
