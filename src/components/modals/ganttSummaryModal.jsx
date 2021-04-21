import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getResources, wpInfoColor } from "../../helpers/";
import { getTaskIds } from "../../store/projectData/tasks";
import { updateUserSelection } from "../../store/projectData/user";

function GanttSummaryModal() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.data);
  const people = useSelector((state) => state.team.data);
  const taskIds = getTaskIds(useSelector((state) => state));
  const resources = getResources();

  function close() {
    dispatch(updateUserSelection({ key: "showGanttSummary", value: false }));
  }

  const peoplesDays = {};
  people.forEach((person) => {
    const initials = person.acronym;
    peoplesDays[initials] = 0;
    taskIds.forEach((taskId) => {
      const taskDays = allTasks[taskId].days;
      let percentage = 0;
      if (resources[taskId][initials].percent) {
        percentage = resources[taskId][initials].percent;
        const days = (taskDays * percentage) / 100;
        peoplesDays[initials] = peoplesDays[initials] + days;
      }
    });
  });

  return (
    <Container onClick={close}>
      <h3>Days</h3>
      {people.map((person, index) => {
        return (
          <div key={index} className="person">
            <span>{person.acronym}:</span>
            <span>{peoplesDays[person.acronym].toFixed(1)}</span>
          </div>
        );
      })}
    </Container>
  );
}
export default GanttSummaryModal;

const Container = styled.div`
  position: fixed;
  min-height: 100px;
  min-width: 110px;
  z-index: 2;
  bottom: 10px;
  right: 10px;
  background-color: ${wpInfoColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  
  .person {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 3px 0px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 7px;
  }
`;
