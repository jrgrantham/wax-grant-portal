import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllocation,
  deleteAllocation,
  updateAllocation,
  getAllocationsByTaskId,
} from "../../store/entities/allocations";

function ResourcesRow(props) {
  const dispatch = useDispatch();
  const { allPeople, task } = props;
  const { taskId } = task;
  const resources = getAllocationsByTaskId(useSelector((state) => state));

  const completion = resources[task.taskId].completion;
  const status =
    completion === 100
      ? "ok total"
      : completion < 100
      ? "under total"
      : "over total";

  function onChangeHandler(value, personId, allocationId) {
    console.log(value, personId, allocationId);
    if (value === 0) dispatch(deleteAllocation({ allocationId }));
    else if (allocationId === "new")
      dispatch(addAllocation({ taskId, personId, value }));
    else dispatch(updateAllocation({ allocationId, value }));
  }

  const percentages = [];
  let i = 0;
  while (i <= 100) {
    percentages.push(i);
    i = i + 5;
  }

  return (
    <div className="modalRow">
      <p className="description">{task.description}</p>
      {allPeople.map((person, index) => {
        return (
          <select
            className="person select"
            key={index}
            value={resources[task.taskId][person.personId].percent}
            onChange={(e) =>
              onChangeHandler(
                parseInt(e.target.value),
                person.personId,
                resources[task.taskId][person.personId].allocationId
              )
            }
            id={resources[task.taskId][person.personId].allocationId}
            name="resources"
          >
            {percentages.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        );
      })}
      <p className={status}>{completion}%</p>
    </div>
  );
}

export default ResourcesRow;
