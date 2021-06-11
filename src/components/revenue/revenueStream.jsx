import React from "react";
import { useDispatch } from "react-redux";

function RevenueStream(props) {
  const { market, index } = props;
  const dispatch = useDispatch();

  function onChangeHandler(e) {}

  return (
    <div className="revenueStream">
      <p className='stream'>{`Revenue Stream ${index + 1}`}</p>

      <div className="revenueRow">
        <p className="field market">Sales {market.name}</p>
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={market.name + "role"}
          name="role"
          placeholder={market.role}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>

      <div className="revenueRow">
        <p className="field market">Sales Global</p>
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={market.name + "year"}
          name="year"
          value={market.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={market.name + "role"}
          name="role"
          placeholder={market.role}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>
    </div>
  );
}
export default RevenueStream;
