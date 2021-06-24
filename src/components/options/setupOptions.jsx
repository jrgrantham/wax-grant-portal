import React from "react";
import { Container } from "./optionsStyling";
import OptionsInput from "./optionsInput";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "../../store/entities/options";

function SetupOptions() {
  const dispatch = useDispatch();
  const { partners, lead, pOne, pTwo } = useSelector(
    (state) => state.entities.options.data
  );

  function handleChange(e) {
    const key = e.target.name;
    const value = parseInt(e.target.value);
    dispatch(updateValue({ key, value }));
  }

  return (
    <Container>
      <div className="rows">
        <div className="row titles leaderTabMargin">
          <p className="title description">Partners</p>
          <p className="title value alignLeft">Value</p>
        </div>

        <div className="row">
          <p className="field display description">Number of Partners</p>
          <select
            // dir="rtl"
            name={"partners"}
            value={partners}
            className="field value"
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        <div className="row titles leaderTabMargin">
          <p className="title description">Accounts</p>
          <p className="title double alignLeft">eMail</p>
          <p className="title double alignLeft">Reset Password</p>
        </div>

        <div className="row">
          <p className="field display description">Lead Partner</p>
          <OptionsInput
            multiple={true}
            field={"lead"}
            value={lead}
            characters={50}
            classNames="double"
          />
          <OptionsInput
            multiple={true}
            field="leadPassword"
            value="password"
            characters={50}
            classNames="double"
          />
        </div>

        {partners > 1 ? (
          <div className="row">
            <p className="field display description">Partner One</p>
            <OptionsInput
              multiple={true}
              field={"pOne"}
              value={pOne}
              characters={50}
              classNames="double"
            />
            <OptionsInput
              multiple={true}
              field="pOnePassword"
              value="password"
              characters={50}
              classNames="double"
            />
          </div>
        ) : null}

        {partners > 2 ? (
          <div className="row">
            <p className="field display description">Partner Two</p>
            <OptionsInput
              multiple={true}
              field={"pTwo"}
              value={pTwo}
              characters={50}
              classNames="double"
            />
            <OptionsInput
              multiple={true}
              field="pTwoPassword"
              value="password"
              characters={50}
              classNames="double"
            />
          </div>
        ) : null}

        {/* <OptionsList
          global={true}
          title="Organisation Types"
          list={orgTypes}
          defaultOption={orgTypeDefault}
          listKey="orgTypes"
          defaultKey="orgTypeDefault"
        /> */}
      </div>
    </Container>
  );
}
export default SetupOptions;
