import React from "react";
import { useSelector } from "react-redux";
import RevenueStream from "./revenueStream";
import { Container } from "./revenueStyling";
import Titles from "./revenueTitles";
import RevenueTotal from "./revenueTotal";

function RevenueInfo() {
  const { markets, streams } = useSelector((state) => state.entities.revenue.data);

  console.log(streams);
  return (
    <Container>
      <Titles />
      <div className="rows">
        {streams.map((stream, index) => {
          return <RevenueStream stream={stream} index={index} key={index} />;
        })}
        <RevenueTotal />
      </div>
    </Container>
  );
}
export default RevenueInfo;
