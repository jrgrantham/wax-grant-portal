import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";

import TeamInfoRow from "./teamRow";
import { addTeamMember, reorderTeam } from "../../store/entities/team";
import add from "../../images/addTeam.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./teamStyling";
import { nextIndexOfGroup } from "../../helpers";

function TeamInfo() {
  const dispatch = useDispatch();
  const employmentType = useSelector((state) => state.user.selectedTeamOption);
  const team = useSelector((state) => state.entities.team.data);
  const leader = useSelector((state) => state.user.selectedLeader);
  const { maxTeamMembers, maxSubcontract } = useSelector(
    (state) => state.entities.setup.data
  );

  const employmentGroup = team.filter(
    (person) => person.employment === employmentType
  );
  const group = employmentGroup.filter((person) => person.leader === leader);

  const max = {
    staff: maxTeamMembers,
    subcontract: maxSubcontract,
  };

  function addPerson() {
    const position = nextIndexOfGroup(group, team);
    const number = team.length + 1;
    const newPerson = {
      personId: uuidv4(),
      name: `Team Member ${number}`,
      role: "tbc",
      salary: 0,
      leader: leader,
      acronym: `TM${number}`,
      employment: employmentType,
    };
    dispatch(addTeamMember({ newPerson, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const person = group[result.source.index];
    console.log(person, movement);
    dispatch(reorderTeam({ person, movement }));
  }

  function countAcronyms() {
    const acronymCount = {};
    for (let i = 0; i < team.length; i++) {
      if (acronymCount[team[i].acronym]) {
        acronymCount[team[i].acronym] = acronymCount[team[i].acronym] + 1;
      } else acronymCount[team[i].acronym] = 1;
    }
    return acronymCount;
  }
  const acronyms = countAcronyms();

  return (
    <Container>
      <div className="rows">
        <DragDropContext onDragEnd={handleMovingRow}>
          <Droppable droppableId="team">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {group.map((person, index) => {
                  return (
                    <Draggable
                      key={person.personId}
                      draggableId={person.personId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="MonthContainer packBackground"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <TeamInfoRow
                            employmentType={employmentType}
                            provided={provided}
                            index={index}
                            key={index}
                            person={person}
                            acronyms={acronyms}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {group.length >= max[employmentType] ? (
          <Tippy content={`Maximum ${max[employmentType]}`}>
            <button className="addIcon">
              <img src={addGrey} alt="add" />
            </button>
          </Tippy>
        ) : (
          <Tippy content="Add team member">
            <button className="addIcon" onClick={addPerson}>
              <img src={add} alt="add" />
            </button>
          </Tippy>
        )}
      </div>
    </Container>
  );
}
export default TeamInfo;
