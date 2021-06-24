import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./costsStyling";
import { getTotalsByLeader, numberToCurrency } from "../../helpers";

function BreakdownInfo() {
  const state = useSelector((state) => state);
  const totals = getTotalsByLeader(state);
  const { partners } = useSelector((state) => state.entities.options.data);
  console.log(partners);
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

  const showLead = partners > 1;
  const showpOne = partners > 1;
  const showpTwo = partners > 2;

  return (
    <Container>
      <div className="breakdownTable">
        <div className="row titles leaderTabMargin">
          <p className="title column category"></p>
          {showLead ? <p className="title column center">Lead</p> : null}
          {showpOne ? <p className="title column center">Partner 1</p> : null}
          {showpTwo ? <p className="title column center">Partner 2</p> : null}
          <p className="title column center">Total</p>
        </div>
        <div className="rows">
          {totals.array.map((row, index) => {
            return (
              <div
                key={index}
                className={index === 7 ? "row highlight" : "row"}
              >
                <p className="field display column category">{row.category}</p>

                {showLead ? (
                  <div className="column border">
                    <p className="field display double">
                      {row.lead ? numberToCurrency(row.lead) : null}
                    </p>
                    {percent(index, row.lead, lead)}
                  </div>
                ) : null}

                {showpOne ? (
                  <div className="column border">
                    <p className="field display double">
                      {row.pOne ? numberToCurrency(row.pOne) : null}
                    </p>
                    {percent(index, row.pOne, pOne)}
                  </div>
                ) : null}

                {showpTwo ? (
                  <div className="column border">
                    <p className="field display double">
                      {row.pTwo ? numberToCurrency(row.pTwo) : null}
                    </p>
                    {percent(index, row.pTwo, pTwo)}
                  </div>
                ) : null}

                <div className="column">
                  <p className="field display double">
                    {numberToCurrency(row.combined)}
                  </p>
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
