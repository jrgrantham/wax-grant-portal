import { store } from "../store";
import { moveTaskBar } from "../store/projectData/tasks";

export function moveBar(data, bar, e) {
  const {
    blockWidth,
    leftObstruction,
    rightObstruction,
    barWidth,
    task,
    blockCount,
  } = data;

  let offset = 0;
  let mousePosition;
  let originalIndex = 0;
  let position = 0;

  offset = bar.offsetLeft - e.clientX;
  originalIndex = bar.offsetLeft / blockWidth;

  function dropBar() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", dropBar);
    bar.style.left = null;
    const newIndex = Math.floor(position / blockWidth + 0.5);
    if (mousePosition !== undefined && newIndex !== originalIndex) {
      const taskId = task.taskId;
      store.dispatch(
        moveTaskBar({ taskId, originalIndex, newIndex, blockCount })
      );
    }
  }

  document.addEventListener("mouseup", dropBar, false);
  document.addEventListener("mousemove", handleMouseMove, false);

  function handleMouseMove(event) {
    mousePosition = event.clientX;
    position = Math.min(
      Math.max(mousePosition + offset, leftObstruction * blockWidth),
      rightObstruction * blockWidth - barWidth
    );
    bar.style.left = position + "px";
  }
}
