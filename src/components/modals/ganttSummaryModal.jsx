import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { wpInfoColor } from "../../helpers/";
import { updateUserSelection } from "../../store/projectData/user";
import { getTotalDaysByPersonId } from "../../store/projectData/allocations";

function GanttSummaryModal() {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.team.data);
  const daysById = getTotalDaysByPersonId(useSelector((state) => state));

  function close() {
    dispatch(updateUserSelection({ key: "showGanttSummary", value: false }));
  }

  return (
    <Container onClick={close}>
      <h3>Days</h3>
      {people.map((person, index) => {
        return (
          <div key={index} className="person">
            <span>{person.acronym}:</span>
            <span>{daysById[person.personId].toFixed(1)}</span>
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
