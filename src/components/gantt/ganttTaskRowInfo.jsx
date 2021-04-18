import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { BiMenu, BiDotsHorizontalRounded } from "react-icons/bi";
import { isNumberKey, getResources, toastDelay } from "../../helpers";
import EditModal from "../modals/ganttEditModal";
import ResourcesModal from "../modals/ganttResourcesModal";
import {
  updateTaskKeyValue,
  updateTaskDays,
} from "../../store/projectData/tasks";
import tick from "../../images/tick-grey.png";
import { Container } from "./ganttRowStyling";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserSelection } from "../../store/projectData/user";

toast.configure();

function GanttTaskRowInfo(props) {
  const { task, provided, packData, taskPackTitles } = props;
  const { description, days, taskId } = task;
  const dispatch = useDispatch();
  const { showComponent } = useSelector(
    (state) => state.user
  );
  const resources = getResources();
  const buttonContent = resources[taskId].people;
  const [showEditDays, setShowEditDays] = useState(false);
  const [newDays, setNewDays] = useState(days);

  function handleDescriptionChange(value) {
    dispatch(
      updateTaskKeyValue({
        taskId,
        key: "description",
        value,
      })
    );
  }

  function handleDayChange(e) {
    if (e.target.value) {
      const lastThreeNumbers = e.target.value.slice(-3);
      setNewDays(parseInt(lastThreeNumbers));
    } else {
      setNewDays(0);
    }
  }

  function acceptNewDays() {
    setShowEditDays(false);
    console.log(newDays);
    if (newDays > 0) {
      if (newDays !== days) dispatch(updateTaskDays({ task, days: newDays }));
    } else {
      toast.info("Must enter at least 1 day", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: toastDelay,
      });
    }
  }

  function updateUser(key, value) {
    dispatch(updateUserSelection({ key, value }));
  }

  return (
    <Container>
      {showComponent === taskId+'edit' ? (
        <EditModal taskPackTitles={taskPackTitles} task={task} />
      ) : null}
      {showComponent === taskId+'resources' ? (
        <ResourcesModal
          packData={packData}
        />
      ) : null}
      <div className="rowDescription">
        <Tippy content="Drag to reorder tasks">
          <div {...provided.dragHandleProps} className="hidden menu">
            <BiMenu />
          </div>
        </Tippy>
        <input
          className="highlight description packBackground"
          value={description}
          type="text"
          onChange={(e) => handleDescriptionChange(e.target.value)}
          onBlur={(e) => {
            console.log("remember to send to the server");
          }}
        />
      </div>
      <div className="rowData">
        <button
          onClick={() => updateUser("showComponent", taskId+'resources')}
          className="resources highlight packBackground"
        >
          {buttonContent}
        </button>

        {showEditDays ? (
          <div className="editDays">
            <input
              autoFocus
              className="days highlight packBackground"
              type="text"
              value={newDays}
              onKeyDown={(e) => isNumberKey(e)}
              onChange={(e) => handleDayChange(e)}
            />
            {/* <button className="accept"> */}
            <button onClick={acceptNewDays} className="accept">
              <img id="accept" src={tick} alt="accept" />
            </button>
          </div>
        ) : (
          <button
            className="days highlight packBackground"
            onClick={() => setShowEditDays(true)}
          >
            {days}
          </button>
        )}

        <button
          onClick={() => updateUser("showComponent", taskId+'edit')}
          className="hidden icon"
        >
          <BiDotsHorizontalRounded />
        </button>
      </div>
    </Container>
  );
}

export default GanttTaskRowInfo;
