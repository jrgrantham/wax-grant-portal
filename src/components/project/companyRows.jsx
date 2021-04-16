import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { updateProjectInfo } from "../../store/projectData/project";
import qMark from "../../images/qMark.png";

function CompanyRows() {
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  const user = useSelector((state) => state.user.selectedLeader);

  const {
    companyName,
    companyAcronym,
    organisationType,
    organisationSize,
    postcode,
    turnover,
    lastYear,
    lawyer,
    bankHolidays,
    annualLeave,
    numEmployees,
    partnerFunding,
    fundingLevel,
    matchFundingSource,
    investorName,
  } = useSelector((state) => state.project.data[user]);

  console.log(companyName);

  return (
    <Container>
      <div className="rows">
        <div className="row">
          <Tippy placement="top-start" content="Product / Platform Name">
            <input
              type="text"
              value={companyName}
              className="field"
              name="productPlatformName"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
      </div>
    </Container>
  );
}
export default CompanyRows;
