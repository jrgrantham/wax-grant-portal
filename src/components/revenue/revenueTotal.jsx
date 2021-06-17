import React from "react";
import { getTotalRevenue } from "../../store/entities/revenue";
import { useSelector } from "react-redux";

function RevenueTotal() {
  const state = useSelector((state) => state);
  const totals = getTotalRevenue(state);
  console.log(totals);

  return (
    <div className="revenueStream revenueTotal">
      <div className="revenueRow">
        <p className="field market"></p>
        <p className="field year">{totals.y1.sales}</p>
        <p className="field year">{totals.y2.sales}</p>
        <p className="field year">{totals.y3.sales}</p>
        <p className="field year">{totals.y4.sales}</p>
        <p className="field year">{totals.y5.sales}</p>
      </div>
    </div>
  );
}
export default RevenueTotal;
