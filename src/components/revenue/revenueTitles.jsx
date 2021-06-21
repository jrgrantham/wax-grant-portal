import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./revenueStyling";

function TargetMarketTitles() {
  const revenueStart = useSelector(
    (state) => state.entities.revenue.data.revenueStart
  );
  return (
    <Container>
      <div className="row titles leaderTabMargin">
        <div className="title market" />
        <div className="title year">
          <p>Y1&nbsp;</p>
          <p className="subtle">{revenueStart}</p>
        </div>
        <div className="title year">
          <p>Y2&nbsp;</p>
          <p className="subtle">{revenueStart + 1}</p>
        </div>
        <div className="title year">
          <p>Y3&nbsp;</p>
          <p className="subtle">{revenueStart + 2}</p>
        </div>
        <div className="title year">
          <p>Y4&nbsp;</p>
          <p className="subtle">{revenueStart + 3}</p>
        </div>
        <div className="title year">
          <p>Y5&nbsp;</p>
          <p className="subtle">{revenueStart + 4}</p>
        </div>
      </div>
    </Container>
  );
}
export default TargetMarketTitles;
