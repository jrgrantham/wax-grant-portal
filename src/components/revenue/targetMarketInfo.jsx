import React from "react";
import { useDispatch, useSelector } from "react-redux";

import RevenueRow from "./targetMarketRow";
import { Container } from "./revenueStyling";
import Titles from './targetMarketTitles'

function TargetMarketInfo() {
  const dispatch = useDispatch();
  const { markets } = useSelector((state) => state.entities.revenue.data);

  return (
    <Container>
      <Titles />
      <div className="rows">
        {markets.map((market, index) => {
          return <RevenueRow market={market} index={index} key={index} />;
        })}
      </div>
    </Container>
  );
}
export default TargetMarketInfo;
