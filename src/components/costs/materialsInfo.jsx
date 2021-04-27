import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";

// import TeamInfoRow from "./teamRow";
import { addMaterial, reorderMaterials } from "../../store/entities/materials";
import add from "../../images/addTeam.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./costsStyling";
import { nextIndexOfGroup } from "../../helpers";

function MaterialsInfo() {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.entities.materials.data);
  const leader = useSelector((state) => state.user.selectedLeader);
  const { maxMaterials } = useSelector(
    (state) => state.entities.options.data
  );

  const group = materials.filter((item) => item.leader === leader);

  function handleAddMaterial() {
    const position = nextIndexOfGroup(group, materials);
    const newMaterial = {
      materialId: uuidv4(),
      leader: leader,
    };
    dispatch(addMaterial({ newMaterial, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const material = group[result.source.index];
    dispatch(reorderMaterials({ material, movement }));
  }

  return (
    <Container>
      <div className="rows">
        <DragDropContext onDragEnd={handleMovingRow}>
          <Droppable droppableId="materials">
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
                          {/* <TeamInfoRow
                            provided={provided}
                            index={index}
                            key={index}
                          /> */}
                          <h3>hello</h3>
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
        {group.length >= maxMaterials ? (
          <Tippy content={`Maximum ${maxMaterials}`}>
            <button className="addIcon">
              <img src={addGrey} alt="add" />
            </button>
          </Tippy>
        ) : (
          <Tippy content="Add materials member">
            <button className="addIcon" onClick={handleAddMaterial}>
              <img src={add} alt="add" />
            </button>
          </Tippy>
        )}
      </div>
    </Container>
  );
}
export default MaterialsInfo;
