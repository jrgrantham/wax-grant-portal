import React from "react";
import { getTotalRevenue } from "../../store/entities/revenue";
import { useSelector } from "react-redux";

function RevenueTotal() {
  const state = useSelector((state) => state);
  const totalRevenue = getTotalRevenue(state);

  return (
    <div className="revenueStream revenueTotal">
      <div className="revenueRow">
        <p className="field market">Total Revenue</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Profit</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">UK Market</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Global Market</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Corporation Tax</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">ROI Innovate UK</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">ROI Lead</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
    </div>
  );
}
export default RevenueTotal;
