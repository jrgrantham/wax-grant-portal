import React from "react";
// import React, { useEffect } from "react";
import styled from "styled-components";
// import Tippy from "@tippy.js/react";
// import "tippy.js/dist/tippy.css";

import GanttScheduleBackground from "./ganttScheduleBackground";
import GanttWPPackSchedule from "./ganttTaskPackSchedule";
import GanttDMPackSchedule from "./ganttDeadlinePackSchedule";
import {
  taskDeadlineGap,
  monthWidth,
  totalDaysColor,
  schedGapColor,
} from "../../helpers";

function GanttChartRight(props) {
  const { workPackages, deliverables, milestones, daysPerMonth } = props.data;
  // useEffect(() => {
  //   const slider = document.querySelector(".right");
  //   let isDown = false;
  //   let startX;
  //   let scrollLeft;
  //   slider.addEventListener("mousedown", (e) => {
  //     if (e.target.className.includes("backgroundColumn")) {
  //       isDown = true;
  //       startX = e.pageX - slider.offsetLeft;
  //       scrollLeft = slider.scrollLeft;
  //     }
  //   });
  //   slider.addEventListener("mouseleave", () => {
  //     isDown = false;
  //   });
  //   slider.addEventListener("mouseup", () => {
  //     isDown = false;
  //   });
  //   slider.addEventListener("mousemove", (e) => {
  //     if (!isDown) return;
  //     e.preventDefault();
  //     const x = e.pageX - slider.offsetLeft;
  //     // const walk = (x - startX) * 3; //scroll-fast
  //     const walk = x - startX;
  //     console.log(walk);
  //     slider.scrollLeft = scrollLeft - walk;
  //   });
  // }, []);

  return (
    <PageContainer>
      <div id="schedule" className="right">
        <div className="inner">
          <GanttScheduleBackground />
          <div className="monthHeaderSpacer"></div>
          {workPackages.length
            ? workPackages.map((task, index) => {
                return (
                  <GanttWPPackSchedule
                    key={index}
                    workPackData={task}
                    wpNumber={index + 1}
                  />
                );
              })
            : null}
          <div className="divider">
            {daysPerMonth.map((month, index) => {
              return (
                // <Tippy content="Turnover last financial year">
                  <div key={index} className="monthTotalDays">
                    <h3>{month ? month : null}</h3>
                  </div>
                // </Tippy>
              );
            })}
          </div>

          <GanttDMPackSchedule workPackData={deliverables} prefix={"D"} />
          <GanttDMPackSchedule workPackData={milestones} prefix={"M"} />
        </div>
      </div>
    </PageContainer>
  );
}
export default GanttChartRight;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: auto;
  width: 100%;
  @media screen and (max-width: 550px) {
    display: none;
  }
  .inner {
    position: relative;
  }

  .divider {
    height: ${taskDeadlineGap};
    display: flex;
    align-items: flex-start;
    border-bottom: 10px solid ${schedGapColor};
    background-color: ${schedGapColor};
  }
  .monthTotalDays {
    width: ${monthWidth};
    height: 30px;
    flex-shrink: 0;
    margin-top: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: ${totalDaysColor};
  }
`;
