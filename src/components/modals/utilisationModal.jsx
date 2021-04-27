import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UtilisationModalRow from "./utilisationModalRow";
import Close from "../general/close";
import { wpInfoColor } from "../../helpers";
import { getUtilisations } from "../../store/entities/team";

toast.configure();

function UtilisationModal() {
  const state = useSelector((state) => state);
  const utilisation = getUtilisations(state);
  const allPeople = state.entities.team.data;
  const selectedLeader = state.user.selectedLeader;

  const filteredPeople = allPeople.filter((person) => {
    return person.leader === selectedLeader;
  });

  const data = {
    key: "showComponent",
    // message: 'closeMessage',
  };

  return (
    <Container id="background">
      <div className="editWindow">
        <Close data={data} />
        <div className="modalRow top">
          <h3 className="description">Team Member</h3>
          {utilisation.quarters.map((quarter, index) => {
            return (
              <h3 key={index} className="quarter">
                {quarter}
              </h3>
            );
          })}
        </div>
        <div className="rows">
          {filteredPeople.map((person, index) => {
            return (
              <UtilisationModalRow
                name={person.name}
                key={index}
                utilisation={utilisation[person.personId]}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default UtilisationModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 2;

  .editWindow {
    position: relative;
    max-height: 80vh;

    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-bottom: 10px;
    /* border: 1px solid black; */
    border-radius: 6px;
  }
  .rows {
    background-color: white;
    padding: 10px 0;
    border-radius: 0 0 6px 6px;
  }
  .modalRow {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .description {
      min-width: 200px;
      max-width: 300px;
    }
  }
  .top {
    height: 50px;
    /* margin-bottom: 10px; */
    background-color: ${wpInfoColor};
    color: white;
    padding: 0 20px;
    border-radius: 6px 6px 0px 0px;
  }
  .quarter {
    display: flex;
    justify-content: center;
    width: 50px;
  }
  .under {
    color: orange;
    font-weight: bold;
  }
  .ok {
    color: green;
  }
  .over {
    font-weight: bold;
    color: red;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
