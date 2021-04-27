import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { monthWidth, schedGapColor, wpMarginBottom } from "../../helpers";
import GanttWPRowSchedule from "./ganttTaskRowSchedule";
// import GanttRowSchedule from "./ganttRowSchedule";

function GanttWPPackSchedule(props) {
  const { nonWPPrefix, wpNumber } = props;
  const projectLength = useSelector(
    (state) => state.entities.project.data.details.projectLength
  );

  const scheduleWidth =
    projectLength * parseInt(monthWidth.slice(0, -2)) + "px";

  return (
    <Container scheduleWidth={scheduleWidth}>
      <div className="title" />
      {props.workPackData.map((task, index) => {
        return (
          <GanttWPRowSchedule
            key={index}
            task={task}
            nonWPPrefix={nonWPPrefix}
            taskNumber={index + 1}
            wpNumber={wpNumber}
          />
        );
      })}
      <div className="addButton" />
    </Container>
  );
}

export default GanttWPPackSchedule;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: ${wpMarginBottom} solid ${schedGapColor};
  width: ${(props) => props.scheduleWidth};
  @media screen and (max-width: 750px) {
    border-bottom: 0;
  }
  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .addButton {
    height: 40px;
  }
`;
