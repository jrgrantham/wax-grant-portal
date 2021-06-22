import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./optionsStyling";
import MaterialsRow from "./optionsRow";

function FinanceOptions() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <Container>
      <div className="materials">
        <div className="rows">
          <div className="row titles leaderTabMargin">
            <p className="title description">Finance Constraints</p>
            <p className="title value">Minimum</p>
            <p className="title value">Maximum</p>
            <p className="title value">Increment</p>
            <p className="title value">Default</p>
          </div>
          <div className="row">
            <p className="field display description">Funding Levels</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Overhead Rates</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row titles leaderTabMargin">
            <p className="title description">Finance Thresholds</p>
            <p className="title value">Amber</p>
            <p className="title value">Red</p>
            <p className="title value"></p>
          </div>
          <div className="row">
            <p className="field display description">Business</p>
            <div className="field display value" />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Academic</p>
            <div className="field display value" />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Materials</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Travel</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Subcontract</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">CapEx</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Other</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row titles leaderTabMargin">
            <p className="title description">Finance Options</p>
            <p className="title value">Value</p>
            <p className="title value"></p>
            <p className="title value"></p>
          </div>
          <div className="row">
            <p className="field display description">Match Funding</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">Markets</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default FinanceOptions;
