import React from "react";
// import { useDispatch } from "react-redux";

function RevenueTotal(props) {
  // const { market, index } = props;
  // const dispatch = useDispatch();

  function onChangeHandler(e) {}

  return (
    <div className="revenueStream revenueTotal">
      <div className="revenueRow">
        <p className="field market">Sales </p>
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={"role"}
          name="role"
          placeholder='{role}'
          onChange={onChangeHandler}
          className="field year"
        />
      </div>

      <div className="revenueRow">
        <p className="field market">Sales Global</p>
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          id={"year"}
          name="year"
          value={4}
          onChange={onChangeHandler}
          className="field year"
        />
        <input
          type="text"
          id={"role"}
          name="role"
          placeholder='{role}'
          onChange={onChangeHandler}
          className="field year"
        />
      </div>
    </div>
  );
}
export default RevenueTotal;
