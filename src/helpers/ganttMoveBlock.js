import { store } from "../store";
import { updateDeadline } from "../store/entities/deadlines";

export function moveBlock(data, e, blockDiv, projectLength) {
  console.log('listening');
  document.addEventListener("mouseup", dropBlock, false);
  document.addEventListener("mousemove", handleMouseMove, false);

  const { blockWidth, position, deadlineId } = data;
  const leftObstruction = 0;
  const rightObstruction = store.getState().entities.project.data.details.projectLength - 1;

  let offset = blockDiv.offsetLeft - e.clientX;
  let mousePosition;
  let originalIndex = blockDiv.offsetLeft / blockWidth;
  let newPosition = position;

  function handleMouseMove(event) {
    mousePosition = event.clientX;
    newPosition = Math.min(
      Math.max(mousePosition + offset, leftObstruction * blockWidth),
      rightObstruction * blockWidth
    );
    blockDiv.style.left = newPosition + "px";
  }

  function dropBlock() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", dropBlock);
    const newIndex = Math.floor(newPosition / blockWidth + 0.5);
    if (mousePosition !== undefined && newIndex !== originalIndex) {
      store.dispatch(
        updateDeadline({ deadlineId, key: "scheduled", value: newIndex })
      );
    }
    blockDiv.style.left = null;
  }
}
