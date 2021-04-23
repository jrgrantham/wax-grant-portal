import {
  getCombinedLengthOfBars,
  resizeTaskBar,
  spreadWork,
} from "../store/projectData/tasks";
import { store } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { currentCombinedLengthOfBars } from "./index";
import { toastDelay } from "./settings";
// import { spreadWork } from "./ganttRowSetup";

toast.configure();

export function resizeBar(data, barDiv, e) {
  const {
    task,
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    startPosition,
    barNumber,
    setShowBlock,
  } = data;
  const taskId = task.taskId;
  const handle = e.target.id.slice(-3);
  const offset = barDiv.offsetLeft - e.clientX;
  const originalPosition = e.clientX + offset;

  let blockCount = data.blockCount;
  let newWidth;
  let origStartIndex = startPosition / blockWidth;
  let newStartIndex = startPosition / blockWidth;
  let origEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let newEndIndex = (startPosition + barWidth) / blockWidth - 1;
  let change = 0;
  let newPosition = originalPosition;
  let combinedLength = 1;

  window.addEventListener("mousemove", resize, false);
  window.addEventListener("mouseup", stopResize, false);

  function setSize(dimension) {
    if (dimension) barDiv.style.width = dimension + "px";
    else barDiv.style.width = dimension;
  }
  function setPosition(dimension) {
    barDiv.style.left = dimension + "px";
  }

  function resize(e) {
    setShowBlock(false);
    if (handle === "rgt") {
      const draggedSize = e.pageX - barDiv.getBoundingClientRect().left;
      newWidth = Math.min(
        Math.max(blockWidth, draggedSize),
        rightObstruction * blockWidth - startPosition
      );
      setSize(newWidth);
    } else if (handle === "lft") {
      newPosition = Math.min(
        Math.max(e.clientX + offset, leftObstruction * blockWidth),
        originalPosition + barWidth - blockWidth
      );
      newWidth = barWidth + originalPosition - newPosition;
      setPosition(newPosition);
      setSize(newWidth);
    } else alert("check resize function");
  }

  function stopResize() {
    setShowBlock(true);
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
    setSize(null);
    if (!newWidth) return; // undefined if no movement
    const newBlockCount = Math.floor(newWidth / blockWidth + 0.5);
    if (handle === "rgt" && blockCount !== newBlockCount) {
      change = newBlockCount - blockCount;
      newEndIndex = newBlockCount + startPosition / blockWidth - 1;
      handleNewSize();
    } else if (handle === "rgt") setSize(blockCount * blockWidth);
    else if (handle === "lft" && blockCount !== newBlockCount) {
      change = newBlockCount - blockCount;
      newStartIndex = origStartIndex - change;
      setPosition(newStartIndex * blockWidth);
      handleNewSize();
    } else if (handle === "lft") {
      setSize(blockCount * blockWidth);
    }
  }

  function handleNewSize() {
    console.log(store.getState());
    combinedLength = getCombinedLengthOfBars(store.getState(), taskId) + change;
    if (combinedLength > task.days) {
      toast.info("Increased number of days", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: toastDelay,
      });
    }
    const newDays = Math.max(combinedLength, task.days);
    store.dispatch(
      resizeTaskBar({
        taskId,
        newDays,
        origStartIndex,
        newStartIndex,
        origEndIndex,
        newEndIndex,
        barNumber,
        // combinedLength,
      })
    );
    store.dispatch(spreadWork({ taskId, combinedLength }));
  }
}
