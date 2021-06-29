import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./optionsStyling";
import OptionsInput from "./optionsInput";
import { generateArray } from "../../helpers";
import { updateProjectValue } from "../../store/entities/setup";
import OptionsList from "./optionsList";
import Global from "./globalIndicator";
import { updateUserSelection } from "../../store/user";
import AdminModal from "../modals/adminModal";

function CostsOptions() {
  const dispatch = useDispatch();
  const {
    maxMaterials,
    maxTravel,
    maxCapex,
    maxOther,
    maxMarkets,
    maxStreams,
    materialWarn,
    materialOver,
    travelWarn,
    travelOver,
    capexWarn,
    capexOver,
    otherWarn,
    otherOver,
    marketOptions,
  } = useSelector((state) => state.entities.setup.data);

  const {
    businessWarn,
    academicWarn,
    fundingLevelMin,
    fundingLevelMax,
    fundingLevelInc,
    fundingLevelDefault,
    overheadRateMin,
    overheadRateMax,
    overheadRateInc,
    overheadRateDefault,
    matchFundingSources,
    matchFundingSourceDefault,
  } = useSelector((state) => state.entities.global.data);
  const { showComponent } = useSelector((state) => state.user);

  const funding = generateArray(
    fundingLevelMin,
    fundingLevelMax,
    fundingLevelInc
  );

  const overhead = generateArray(
    overheadRateMin,
    overheadRateMax,
    overheadRateInc
  );

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    dispatch(updateProjectValue({ key, value }));
  }

  function showModal(field) {
    const value = showComponent === field ? "" : field;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

  const modalData = {
    matchFundingSources: {
      title: "Match Funding",
      global: true,
      list: matchFundingSources,
      defaultOption: matchFundingSourceDefault,
      listKey: "matchFundingSources",
      defaultKey: "matchFundingSourceDefault",
    },

    marketOptions: {
      title: "Markets",
      list: marketOptions,
      global: false,
      // defaultOption: matchFundingSourceDefault,
      listKey: "marketOptions",
      // defaultKey: "matchFundingSourceDefault",
    },
  };

  return (
    <Container>
      {showComponent === "matchFundingSources" ||
      showComponent === "marketOptions" ? (
        <AdminModal data={modalData[showComponent]} />
      ) : null}
      <div className="materials">
        <div className="rows">
          <div className="row titles leaderTabMargin">
            <p className="title description">Finance Options</p>
            <p className="title value">Minimum</p>
            <p className="title value">Maximum</p>
            <p className="title value">Increment</p>
            <p className="title value">Default</p>
          </div>

          <div className="row">
            <p className="field display description">Funding Levels</p>
            <Global />
            <OptionsInput
              multiple={true}
              field={"fundingLevelMin"}
              value={fundingLevelMin}
            />
            <OptionsInput
              multiple={true}
              field={"fundingLevelMax"}
              value={fundingLevelMax}
              characters={3}
            />
            <OptionsInput
              multiple={true}
              field={"fundingLevelInc"}
              value={fundingLevelInc}
            />
            <select
              dir="rtl"
              name={"fundingLevelDefault"}
              value={fundingLevelDefault}
              className="field value"
              onChange={handleChange}
            >
              {funding.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row">
            <p className="field display description">Overhead Rates</p>
            <Global />
            <OptionsInput
              multiple={true}
              field={"overheadRateMin"}
              value={overheadRateMin}
            />
            <OptionsInput
              multiple={true}
              field={"overheadRateMax"}
              value={overheadRateMax}
              characters={3}
            />
            <OptionsInput
              multiple={true}
              field={"overheadRateInc"}
              value={overheadRateInc}
            />
            <select
              dir="rtl"
              name={"overheadRateDefault"}
              value={overheadRateDefault}
              className="field value"
              onChange={handleChange}
            >
              {overhead.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row">
            {global ? <Global /> : null}
            <p className="field display description">Match Funding</p>
            <button
              className="showModal value"
              onClick={() => showModal("matchFundingSources")}
            >
              Show
            </button>
          </div>

          <div className="row">
            {/* {global ? <Global /> : null} */}
            <p className="field display description">Markets</p>
            <button
              className="showModal value"
              onClick={() => showModal("marketOptions")}
            >
              Show
            </button>
          </div>

          <div className="row titles leaderTabMargin">
            <p className="title description">
              Finance Constraints and Thresholds
            </p>
            <p className="title value">Entries</p>
            <p className="title value"></p>
            <p className="title value">Amber</p>
            <p className="title value">Red</p>
          </div>

          <div className="row">
            <p className="field display description">Business</p>
            <div className="field display value" />
            <div className="field display value" />
            <div className="field display value" />

            <OptionsInput
              multiple={true}
              field={"businessWarn"}
              value={businessWarn}
              // characters={3}
            />
          </div>

          <div className="row">
            <p className="field display description">Academic</p>
            <div className="field display value" />
            <div className="field display value" />
            <div className="field display value" />
            <OptionsInput
              multiple={true}
              field={"academicWarn"}
              value={academicWarn}
              // characters={3}
            />
          </div>

          <div className="row">
            <p className="field display description">Materials</p>
            <OptionsInput
              multiple={true}
              field={"maxMaterials"}
              value={maxMaterials}
            />
            <div className="field display value" />
            <OptionsInput
              multiple={true}
              field={"materialWarn"}
              value={materialWarn}
            />
            <OptionsInput
              multiple={true}
              field={"materialOver"}
              value={materialOver}
            />
          </div>

          <div className="row">
            <p className="field display description">Travel</p>
            <OptionsInput
              multiple={true}
              field={"maxTravel"}
              value={maxTravel}
            />
            <div className="field display value" />
            <OptionsInput
              multiple={true}
              field={"travelWarn"}
              value={travelWarn}
            />
            <OptionsInput
              multiple={true}
              field={"travelOver"}
              value={travelOver}
            />
          </div>

          <div className="row">
            <p className="field display description">CapEx</p>
            <OptionsInput multiple={true} field={"maxCapex"} value={maxCapex} />
            <div className="field display value" />
            <OptionsInput
              multiple={true}
              field={"capexWarn"}
              value={capexWarn}
            />
            <OptionsInput
              multiple={true}
              field={"capexOver"}
              value={capexOver}
            />
          </div>

          <div className="row">
            <p className="field display description">Other</p>
            <OptionsInput multiple={true} field={"maxOther"} value={maxOther} />
            <div className="field display value" />
            <OptionsInput
              multiple={true}
              field={"otherWarn"}
              value={otherWarn}
            />
            <OptionsInput
              multiple={true}
              field={"otherOver"}
              value={otherOver}
            />
          </div>

          <OptionsInput
            title="Markets"
            field={"maxMarkets"}
            value={maxMarkets}
          />

          <OptionsInput
            title="Revenue Streams"
            field={"maxStreams"}
            value={maxStreams}
          />
        </div>
      </div>
    </Container>
  );
}
export default CostsOptions;
