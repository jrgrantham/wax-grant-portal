import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TargetMarketRow(props) {
  const {market} = props
  const dispatch = useDispatch();

  function onChangeHandler(e) {

  }

  return (
    <div className="row">
      <input
        id={market.name + "name"}
        name="name"
        value={market.name}
        onChange={onChangeHandler}
        className="field market"
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

      <button className="profileButton">
        Source
      </button>
    </div>
  );
}
export default TargetMarketRow;
