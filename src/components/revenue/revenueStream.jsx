import React from "react";
import { useDispatch } from "react-redux";

function RevenueStream(props) {
  const { stream, index } = props;
  const dispatch = useDispatch();

  function onChangeHandler(e) {}

  return (
    <div className="revenueStream">
      <div className="revenueRow spaced">
        <p className="stream market">{`Revenue Stream ${index + 1}`}</p>
        <p className="field year"/>
        <p className="field year"/>
        <p className="field year"/>
        <p className="field year"/>
        <p className="field year"/>
        <input
          type="text"
          id={stream.name + "role"}
          name="role"
          placeholder={stream.role}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>

      <div className="revenueRow">
        <p className="field market">Sales {stream.name}</p>
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={stream.name + "role"}
          name="role"
          placeholder={stream.role}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>

      <div className="revenueRow">
        <p className="field market">Sales Global</p>
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={stream.name + "year"}
          name="year"
          value={stream.year}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={stream.name + "role"}
          name="role"
          placeholder={stream.role}
          onChange={onChangeHandler}
          className="field year"
        />
      </div>
    </div>
  );
}
export default RevenueStream;
