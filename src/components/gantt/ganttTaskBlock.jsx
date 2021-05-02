import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateBlock } from "../../store/entities/tasks";
import { wpScheduleColor, isNumberKey } from "../../helpers";

function GanttWPBlock(props) {
  const dispatch = useDispatch();
  const { block, blockIndex } = props;
  const { task, showBlock, barId } = props.data;
  const { blockNumber, value } = block;
  const blockPosition = blockNumber.slice(-1);

  const leftHandle = "handle-" + barId + "-lft";
  const rightHandle = "handle-" + barId + "-rgt";

  function handleDayChange(e) {
    let number;
    if (e.target.value) {
      number = e.target.value.slice(-2);
      number = parseInt(number);
    } else {
      number = 0;
    }
    if (number || number === 0)
      dispatch(
        updateBlock({
          taskId: task.taskId,
          blockIndex,
          value: number,
        })
      );
  }

  return (
    <Container>
      {showBlock ? (
        <div>
          <div className="editDays">
            <input
              // autoFocus
              className="days highlight packBackground"
              type="text"
              value={value}
              onKeyDown={(e) => isNumberKey(e)}
              onChange={(e) => handleDayChange(e)}
            />
          </div>
        </div>
      ) : null}
      {blockPosition === "s" ? (
        <div id={leftHandle} className="dragHandle left" />
      ) : null}
      {blockPosition === "e" ? (
        <div id={rightHandle} className="dragHandle right applyShadow" />
      ) : null}
    {blockPosition === "x" ? (
        <>
          <div id={leftHandle} className="dragHandle left" />
          <div id={rightHandle} className="dragHandle right applyShadow" />
        </>
      ) : null}
    </Container>
  );
}
export default GanttWPBlock;
// export const MemoisedWPBlock = React.memo(GanttWPBlock);

const Container = styled.div`
  flex-grow: 1;
  width: 40px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  input {
    text-align: center;
    width: 20px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: ${wpScheduleColor};
    color: white;
    z-index: 1;
  }

  .dragHandle {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    height: 22px;
    width: 12px;
    background-color: ${wpScheduleColor};
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 35%;
    /* z-index: 3; */
    cursor: col-resize;
  }
  .right {
    right: -5px;
  }
  .left {
    left: -5px;
  }
`;
// export default GanttWPBlock;
