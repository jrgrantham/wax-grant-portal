import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WPBlock from "./ganttTaskBlock";
import {
  leadingZero,
  monthWidth,
  moveBar,
  wpScheduleColor,
  resizeBar,
} from "../../helpers";

function GanttWPBar(props) {
  const [showBlock, setShowBlock] = useState(true); // when resizing
  const { task, bar, wpNumber, taskNumber, barNumber } = props;
  const { leftObstruction, rightObstruction, blockCount, startIndex } = bar;

  const wpCode = leadingZero(wpNumber);
  const taskCode = leadingZero(taskNumber);
  const barCode = leadingZero(barNumber);
  const barId = "bar-" + wpCode + "-" + taskCode + "-" + barCode;

  const blockWidth = monthWidth.slice(0, 2);
  const startPosition = startIndex * blockWidth;
  const barWidth = blockWidth * blockCount;

  const barFunctionData = {
    task,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
    blockCount,
    barNumber,
    setShowBlock,
  };

  const blockData = {
    task,
    showBlock,
    barId,
  };

  useEffect(() => {
    const barDiv = document.getElementById(barId);
    function handleMouseDown(e) {
      if (e.target.id.slice(0, 6) === "handle") {
        resizeBar(barFunctionData, barDiv, e);
      } else moveBar(barFunctionData, barDiv, e);
    }
    barDiv.addEventListener("mousedown", handleMouseDown, false);
    return () => {
      barDiv.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <Container id={barId} startPosition={startPosition}>
      {bar.map((block, index) => (
        <WPBlock
          key={index}
          block={block}
          blockIndex={startIndex + index}
          data={blockData}
        />
      ))}
    </Container>
  );
}
// export const MemoisedBar = React.memo(GanttWPBar);
export default GanttWPBar;

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.startPosition}px;
  margin: 2px 0;
  background-color: ${wpScheduleColor};
  border-radius: 6px;
  z-index: 1;
  display: flex;
  &:hover .dragHandle {
    opacity: 1;
  }
  &:active .dragHandle {
    opacity: 0;
  }
`;
// export default GanttWPBar;
