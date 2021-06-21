import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RevenueStream from "./revenueStream";
import { Container } from "./revenueStyling";
import Titles from "./revenueTitles";
import RevenueTotal from "./revenueTotal";
import addGrey from "../../images/add-grey.png";
import add from "../../images/addMarket.png";
import Tippy from "@tippy.js/react";
import { addStream } from "../../store/entities/revenue";

function RevenueInfo() {
  const dispatch = useDispatch();
  const { streams } = useSelector((state) => state.entities.revenue.data);
  const max = useSelector((state) => state.entities.options.data.maxStreams);

  return (
    <Container>
      <Titles />
      <div className="rows">
        {streams.map((stream, index) => {
          return <RevenueStream stream={stream} index={index} key={index} />;
        })}

        {streams.length >= max ? (
          <Tippy content={`Maximum ${max} revenue streams`}>
            <button className="addIcon">
              <img src={addGrey} alt="add" />
            </button>
          </Tippy>
        ) : (
          <Tippy content="Add another revenue stream">
            <button className="addIcon" onClick={() => dispatch(addStream())}>
              <img src={add} alt="add" />
            </button>
          </Tippy>
        )}
      <RevenueTotal />
      </div>
    </Container>
  );
}
export default RevenueInfo;
