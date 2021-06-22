import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRevenueData,
  isNumberKey,
  numberToCurrency,
} from "../../helpers";
import { updateRevenueKey } from "../../store/entities/revenue";
import { updateUserSelection } from "../../store/user";

function RevenueTotal() {
  const state = useSelector((state) => state);
  const { showComponent } = useSelector((state) => state.user);
  const { profitMargin, taxRate } = state.entities.revenue.data;
  const {
    corpTax,
    globalShare,
    profit,
    revenue,
    roiInnovate,
    roiLead,
    ukShare,
    cumulativeCorpTax,
  } = getAllRevenueData(state);
  const dispatch = useDispatch();

  function show(value) {
    const key = "showComponent";
    dispatch(updateUserSelection({ key, value }));
  }

  function handleChange(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (value) value = parseInt(value.slice(-2));
    dispatch(updateRevenueKey({ key, value }));
  }

  return (
    <div className="revenueStream revenueTotal relative">
      <div className="revenueRow">
        <p className="field market">Total Revenue</p>
        <p className="field year">{numberToCurrency(revenue.y1)}</p>
        <p className="field year">{numberToCurrency(revenue.y2)}</p>
        <p className="field year">{numberToCurrency(revenue.y3)}</p>
        <p className="field year">{numberToCurrency(revenue.y4)}</p>
        <p className="field year">{numberToCurrency(revenue.y5)}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Profit</p>
        <p className="field year">{numberToCurrency(profit.y1)}</p>
        <p className="field year">{numberToCurrency(profit.y2)}</p>
        <p className="field year">{numberToCurrency(profit.y3)}</p>
        <p className="field year">{numberToCurrency(profit.y4)}</p>
        <p className="field year">{numberToCurrency(profit.y5)}</p>
        {showComponent === "profitMargin" ? (
          <div className="hiddenInput">
            <input
              id={"profitMargin"}
              name="profitMargin"
              value={profitMargin}
              onChange={handleChange}
              onKeyDown={isNumberKey}
              className="field year"
            />
            <button onClick={() => show("")} className="textButton">
              close
            </button>
          </div>
        ) : (
          <button
            onClick={() => show("profitMargin")}
            className="textButton marginLeft"
          >{`Profit margin (${profitMargin}%)`}</button>
        )}
      </div>
      <div className="revenueRow">
        <p className="field market">Corporation Tax</p>
        <p className="field year">{numberToCurrency(corpTax.y1)}</p>
        <p className="field year">{numberToCurrency(corpTax.y2)}</p>
        <p className="field year">{numberToCurrency(corpTax.y3)}</p>
        <p className="field year">{numberToCurrency(corpTax.y4)}</p>
        <p className="field year">{numberToCurrency(corpTax.y5)}</p>
        {showComponent === "taxRate" ? (
          <div className="hiddenInput">
            <input
              id={"taxRate"}
              name="taxRate"
              value={taxRate}
              onChange={handleChange}
              onKeyDown={isNumberKey}
              className="field year"
            />
            <button onClick={() => show("")} className="textButton">
              close
            </button>
          </div>
        ) : (
          <button
            onClick={() => show("taxRate")}
            className="textButton marginLeft"
          >{`Tax rate (${taxRate}%)`}</button>
        )}
      </div>
      <div className="revenueRow">
        <p className="field market">Cumulative Corp Tax</p>
        <p className="field year">{numberToCurrency(cumulativeCorpTax.y1)}</p>
        <p className="field year">{numberToCurrency(cumulativeCorpTax.y2)}</p>
        <p className="field year">{numberToCurrency(cumulativeCorpTax.y3)}</p>
        <p className="field year">{numberToCurrency(cumulativeCorpTax.y4)}</p>
        <p className="field year">{numberToCurrency(cumulativeCorpTax.y5)}</p>
      </div>
      <div className="revenueRow">
        <p className="field market">UK Market Share</p>
        <p className="field year">{ukShare.y1}%</p>
        <p className="field year">{ukShare.y2}%</p>
        <p className="field year">{ukShare.y3}%</p>
        <p className="field year">{ukShare.y4}%</p>
        <p className="field year">{ukShare.y5}%</p>
      </div>
      <div className="revenueRow">
        <p className="field market">Global Market Share</p>
        <p className="field year">{globalShare.y1}%</p>
        <p className="field year">{globalShare.y2}%</p>
        <p className="field year">{globalShare.y3}%</p>
        <p className="field year">{globalShare.y4}%</p>
        <p className="field year">{globalShare.y5}%</p>
      </div>
      <div className="revenueRow">
        <p className="field market">ROI Innovate UK</p>
        <p className="field year">{roiInnovate.y1}%</p>
        <p className="field year">{roiInnovate.y2}%</p>
        <p className="field year">{roiInnovate.y3}%</p>
        <p className="field year">{roiInnovate.y4}%</p>
        <p className="field year">{roiInnovate.y5}%</p>
      </div>
      <div className="revenueRow">
        <p className="field market">ROI Lead</p>
        <p className="field year" />
        <p className="field year" />
        <p className="field year" />
        <p className="field year" />
        <p className="field year">{roiLead.y5}%</p>
      </div>
    </div>
  );
}
export default RevenueTotal;
