import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import GanttPackWork from "./ganttTaskPackInfo";
import GanttPackdeadlines from "./ganttDeadlinePackInfo";
import { addTask } from "../../store/projectData/tasks";
import {
  wpInfoColor,
  delTitleColor,
  milTitleColor,
  taskDeadlineGap,
  totalDaysColor,
} from "../../helpers";
import add from "../../images/add-white.png";
import qMark from "../../images/qMark.png";
import { updateUserSelection } from "../../store/projectData/user";
// import add from "../../images/addTask.png";

function GanttChartLeft(props) {
  const {
    taskPackTitles,
    // groupedTasks,
    workPackages,
    deliverables,
    milestones,
    totalDays,
  } = props.data;

  const projectLength = useSelector(
    (state) => state.project.data.details.projectLength
  );
  const dispatch = useDispatch();
  function createNewWorkPackage() {
    dispatch(
      addTask({
        projectLength,
        // title: `Work Package ${taskPackTitles.length + 1}`,
      })
      // addTask({ projectLength })
    );
  }

  const showSummary = useSelector((state) => state.user.showGanttSummary);

  function toggleSummary() {
    dispatch(
      updateUserSelection({ key: "showGanttSummary", value: !showSummary })
    );
  }

  return (
    <PageContainer>
      <div id="details">
        <button onClick={toggleSummary} className="summary">
          Summary
        </button>
        <div className="monthHeaderSpacer"></div>
        {workPackages.length
          ? workPackages.map((task, index) => {
              return (
                <GanttPackWork
                  key={index}
                  index={index}
                  packData={task}
                  titleBarColor={wpInfoColor}
                  title={taskPackTitles[index]}
                  taskPackTitles={taskPackTitles}
                />
              );
            })
          : null}
        <div className="divider">
          <Tippy content="Add a new work package">
            <button
              className="totalDays content"
              onClick={createNewWorkPackage}
            >
              <img src={add} alt="add" />
            </button>
          </Tippy>
          <div className="totalDays content">
            <h3>{totalDays ? totalDays : null}</h3>
            <Tippy content="Total project days. To the right are days per month">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy>
          </div>
        </div>
        <GanttPackdeadlines
          workPackData={deliverables}
          titleBarColor={delTitleColor}
          title={"Deliverables"}
        />
        <GanttPackdeadlines
          workPackData={milestones}
          titleBarColor={milTitleColor}
          title={"Milestones"}
        />
      </div>
    </PageContainer>
  );
}
export default GanttChartLeft;

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  @media screen and (max-width: 550px) {
    margin-right: 0;
    width: 100%;
  }
  .divider {
    height: ${taskDeadlineGap};
    width: 100%;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .totalDays {
      width: 80px;
    }
    .totalDays.content {
      position: relative;
      height: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: ${totalDaysColor};
    }
    .info {
      position: absolute;
      margin: 0;
      right: 0px;
      width: 19px;
      height: 19px;
    }
    button {
      height: 40px;
      background-color: transparent;
      border: none;
      padding: 0;
      display: flex;
    }
    img {
      margin: none;
      height: 80%;
      width: auto;
    }
  }
  .summary {
    position: absolute;
    top: 3px;
    right: 0;
    background-color: ${wpInfoColor};
    border: none;
    color: white;
    font-weight: 600;
    width: 100px;
  }
`;
