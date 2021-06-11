import React from "react";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "./revenueStyling";
import { updateRevenueStart } from "../../store/entities/revenue";

function TargetMarketTitles() {
  const dispatch = useDispatch();
  const projectStart = parseInt(
    useSelector((state) => state.entities.project.data.details.startYear)
  );
  const revenueStart = useSelector(
    (state) => state.entities.revenue.data.revenueStart
  );
  console.log(revenueStart);

  function changeYear(e) {
    const year = parseInt(e.target.value);
    dispatch(updateRevenueStart({ year }));
  }

  return (
    <Container>
      <div className="row titles leaderTabMargin">
        <div className="title market" />
        <div className="title year relative">
          <p className="bold">Y1&nbsp;</p>
          <select
            selected={projectStart}
            value={revenueStart}
            className="title year relative subtle"
            onChange={changeYear}
          >
            <option value={projectStart}>{projectStart}</option>
            <option value={projectStart + 1}>{projectStart + 1}</option>
            <option value={projectStart + 2}>{projectStart + 2}</option>
            <option value={projectStart + 3}>{projectStart + 3}</option>
            <option value={projectStart + 4}>{projectStart + 4}</option>
          </select>
          <Tippy content="Click Y1 year to change revenue start">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        <div className="title year">
          <p>Y2&nbsp;</p>
          <p className='subtle'>{revenueStart + 1}</p>
        </div>
        <div className="title year">
          <p>Y3&nbsp;</p>
          <p className='subtle'>{revenueStart + 2}</p>
        </div>
        <div className="title year">
          <p>Y4&nbsp;</p>
          <p className='subtle'>{revenueStart + 3}</p>
        </div>
        <div className="title year">
          <p>Y5&nbsp;</p>
          <p className='subtle'>{revenueStart + 4}</p>
        </div>

        <div className="delete"></div>
      </div>
    </Container>
  );
}
export default TargetMarketTitles;
