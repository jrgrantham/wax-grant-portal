import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippy.js/react";

import { getProjectDates } from "../../store/entities/project";
import { monthWidth, schedGapColor, wpMarginBottom } from "../../helpers";

function GanttScheduleBackground() {
  const dateList = getProjectDates(useSelector((state) => state));

  const classNames = [
    "backgroundColumn columnLeft",
    "backgroundColumn",
    "backgroundColumn columnRight",
  ];

  const backgroundColumn = dateList.map((date, i) => {
    return (
      <div key={i} className={classNames[i % 3]}>
        {/* <Tippy content={date}> */}
        <Tippy delay={250} content={date}>
          <div className="monthLetter">
            <p>{date[0]}</p>
          </div>
        </Tippy>
      </div>
    );
  });

  return <Container>{backgroundColumn}</Container>;
}

export default GanttScheduleBackground;

const Container = styled.div`
  position: absolute;
  display: flex;
  height: calc(100% - ${wpMarginBottom});
  p {
    font-size: 18px;
    font-weight: 700;
    color: white;
  }
  .monthLetter {
    /* position: sticky; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 3px;
    padding-top: 3px;
    border-bottom: ${wpMarginBottom} solid ${schedGapColor};
  }
  .columnLeft {
    border-left: 2px solid ${schedGapColor};
  }
  .columnRight {
    border-right: 2px solid ${schedGapColor};
  }
  .backgroundColumn {
    height: 100%;
    width: ${monthWidth};
    background-color: rgba(255, 255, 255, 0.05);
    z-index: -1;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;
