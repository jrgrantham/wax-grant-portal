import React from "react";
import { Container } from "./optionsStyling";

function FinanceOptions(props) {
  const { title, first, second, third, fourth} = props

  return (
    <Container>
      <div className="row titles leaderTabMargin">
        <p className="title value">{title}</p>
        <p className="title value">{first}</p>
        <p className="title value">{second}</p>
        <p className="title value">{third}</p>
        <p className="title value">{fourth}</p>
      </div>
    </Container>
  );
}
export default FinanceOptions;
