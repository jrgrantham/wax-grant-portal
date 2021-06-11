import React from "react";
import { useSelector } from "react-redux";
import RevenueStream from "./revenueStream";
import { Container } from "./revenueStyling";
import Titles from "./revenueTitles";
import RevenueTotal from "./revenueTotal";

function RevenueInfo() {
  const { markets } = useSelector((state) => state.entities.revenue.data);

  return (
    <Container>
      <Titles />
      <div className="rows">
        {markets.map((market, index) => {
          return <RevenueStream market={market} index={index} key={index} />;
        })}
        <RevenueTotal />
      </div>
    </Container>
  );
}
export default RevenueInfo;
