import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader, numberToCurrency } from "../../helpers";

function BreakdownInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const { percentWarn, percentOver } = state.entities.options.data;
  const { lead, pOne, pTwo, combined } = totals.object.totals;

  function percent(index, value, total) {
    if (total && value) {
      const result = Math.round((value / total) * 100);
      const className =
        result > percentOver
          ? "percent over"
          : result > percentWarn
          ? "percent warn"
          : "percent ok";
      if (index > 6 && total && value)
        return <p className="percent empty">{null}</p>;
      return <p className={className}>{result}%</p>;
    }
  }

  return (
    <Container>
      <div className="breakdownTable">
        <div className="row titles leaderTabMargin">
          <p className="title column category"></p>
          <p className="title column center">Lead</p>
          <p className="title column center">Partner 1</p>
          <p className="title column center">Partner 2</p>
          <p className="title column center">Total</p>
        </div>
        <div className="rows">
          {totals.array.map((row, index) => {
            return (
              <div key={index} className={index === 7 ? "row total" : "row"}>
                <p className="field display column category">{row.category}</p>
                <div className="column">
                  <p className="field display double">
                    {row.lead ? numberToCurrency(row.lead) : null}
                  </p>
                  {percent(index, row.lead, lead)}
                </div>
                <div className="column">
                  <p className="field display double">
                    {row.pOne ? numberToCurrency(row.pOne) : null}
                  </p>
                  {percent(index, row.pOne, pOne)}
                </div>
                {/* {pTwo ? ( */}
                <div className="column">
                  <p className="field display double">
                    {row.pTwo ? numberToCurrency(row.pTwo) : null}
                  </p>
                  {percent(index, row.pTwo, pTwo)}
                </div>
                {/* ) : null} */}
                <div className="column">
                  <p className="field display double">{numberToCurrency(row.combined)}</p>
                  {percent(index, row.combined, combined)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
export default BreakdownInfo;
