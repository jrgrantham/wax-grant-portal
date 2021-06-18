import React from "react";
import { getTotalRevenue, getUKRevenue } from "../../store/entities/revenue";
import { useSelector } from "react-redux";
import { getTotalRevenueTotals } from "../../helpers";

function RevenueTotal() {
  const state = useSelector((state) => state);
  getUKRevenue(state); // delete
  const { profit, taxRate } = state.entities.revenue.data;
  const totalRevenue = getTotalRevenue(state);
  getTotalRevenueTotals(state);
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
        <button className="textButton marginLeft">{`Profit (${profit}%)`}</button>
      </div>
      <div className="revenueRow">
        <p className="field market">UK Market share</p>
        <p className="field year">{totalRevenue.y1}</p>
        <p className="field year">{totalRevenue.y2}</p>
        <p className="field year">{totalRevenue.y3}</p>
        <p className="field year">{totalRevenue.y4}</p>
        <p className="field year">{totalRevenue.y5}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Global Market share</p>
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
        <button className="textButton marginLeft">{`Tax rate (${taxRate}%)`}</button>
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
