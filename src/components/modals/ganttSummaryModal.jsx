import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import close from "../../images/close-white.png";
import { getResources, wpInfoColor } from "../../helpers/";
import { updateUserSelection } from "../../store/projectData/user";
import Close from '../general/close'

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

  const data = {
    key: "showGanttSummary"
  }

  return (
    <Container>
      <Close data={data}/>
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
