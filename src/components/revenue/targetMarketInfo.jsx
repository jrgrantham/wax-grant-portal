import React from "react";
import { useDispatch, useSelector } from "react-redux";
import addGrey from "../../images/add-grey.png";
import add from "../../images/addMarket.png";
import Tippy from "@tippy.js/react";
import TargetMarketRow from "./targetMarketRow";
import { Container } from "./revenueStyling";
import Titles from "./targetMarketTitles";
import { addMarket } from "../../store/entities/revenue";

function TargetMarketInfo() {
  const dispatch = useDispatch();
  const { markets } = useSelector((state) => state.entities.revenue.data);
  const max = useSelector((state) => state.entities.options.data.maxMarkets);

  return (
    <Container>
      <Titles />
      <div className="rows">
        {markets.map((market, index) => {
          console.log(market);
          return <TargetMarketRow market={market} index={index} key={index} />;
        })}
        {markets.length >= max + 1 ? (
          <Tippy content={`Maximum ${max} markets`}>
            <button className="addIcon">
              <img src={addGrey} alt="add" />
            </button>
          </Tippy>
        ) : (
          <Tippy content="Add another market">
            <button className="addIcon" onClick={() => dispatch(addMarket())}>
              <img src={add} alt="add" />
            </button>
          </Tippy>
        )}
      </div>
    </Container>
  );
}
export default TargetMarketInfo;
