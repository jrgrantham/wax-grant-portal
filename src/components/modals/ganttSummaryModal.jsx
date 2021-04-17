import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import close from "../../images/close-white.png";
import { getResources, wpInfoColor } from "../../helpers/";
import { updateUserSelection } from "../../store/projectData/user";

function GanttSummaryModal() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.data);
  const people = useSelector((state) => state.team.data);

  const resources = getResources();
  const peoplesDays = {};
  people.forEach((person) => {
    const initials = person.acronym;
    peoplesDays[initials] = 0;
    allTasks.forEach((task) => {
      let percentage = 0;
      if (resources[task.taskId][initials] !== undefined) {
        percentage = resources[task.taskId][initials].percent;
      }
      if (percentage > 0) {
        const days = (task.days * percentage) / 100;
        peoplesDays[initials] = peoplesDays[initials] + days;
      }
    });
  });

  function closeModal() {
    const key = "showGanttSummary";
    const value = false;
    dispatch(updateUserSelection({ key, value }));
  }

  return (
    <Container>
      <div onClick={closeModal} className="close">
        <img src={close} alt="close" />
      </div>
      {people.map((person, index) => {
        return (
          <div key={index} className="person">
            <span>{person.acronym}:</span>
            <span>{peoplesDays[person.acronym].toFixed(2)}</span>
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
  min-width: 120px;
  z-index: 5;
  bottom: 10px;
  right: 10px;
  background-color: ${wpInfoColor};
  padding: 15px 20px;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  .close {
    position: absolute;
    top: -5px;
    right: -5px;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  .person {
    display: flex;
    justify-content: space-between;
    margin: 4px 0px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
