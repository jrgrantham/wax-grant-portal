import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { appTop, appWidth, wpMarginBottom } from "../helpers/";
import GanttChartLeft from "../components/gantt/ganttChartLeft";
import GanttChartRight from "../components/gantt/ganttChartRight";
import MarkedCompleteModal from "../components/modals/markedComplete";
import GanttSummaryModal from "../components/modals/ganttSummaryModal";
import { getTaskIds, getWorkPackageTitles } from "../store/projectData/tasks";
// import { allResources } from "../store";

function GanttChart() {
  const taskData = useSelector((state) => state.tasks.data);
  const showSummary = useSelector((state) => state.user.showGanttSummary);
  const taskIdKeys = getTaskIds(useSelector((state) => state));
  const taskPackTitles = getWorkPackageTitles(useSelector((state) => state));
  const ganttComplete = useSelector((state) => state.project.data.status.gantt);

  const projectLength = useSelector(
    (state) => state.project.data.details.projectLength
  );

  const workPackageObject = {};
  taskIdKeys.forEach((taskId) => {
    const title = taskData[taskId].workPackageTitle;
    if (!workPackageObject[title]) workPackageObject[title] = {};
    workPackageObject[title][taskId] = taskData[taskId];
  });

  const daysPerMonth = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    taskIdKeys.forEach((task) => {
      const currentDay = taskData[task].schedule[i].value;
      days += currentDay;
      totalDays += currentDay;
    });
    daysPerMonth.push(days);
  }

  // create an array of arrays to get the site running as was

  function generateWorkPackages() {
    const taskOrder = taskData.taskOrder;
    const groupedTasks = [[]];
    // set initial value equal to the first entry
    let previousPackId = taskData[taskOrder[0]].workPackageId;
    let packIndex = 0;

    for (let i = 0; i < taskOrder.length; i++) {
      const currentTask = taskData[taskOrder[i]];
      const currentPackId = currentTask.workPackageId;
      // if new, increment the index and add an empty array
      if (currentPackId !== previousPackId) {
        packIndex++;
        groupedTasks[packIndex] = [];
      }
      groupedTasks[packIndex].push(currentTask);
      previousPackId = currentPackId;
    }
    return groupedTasks;
  }

  const workPackages = generateWorkPackages();

  const deliverables = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "deliverable")
  );
  const milestones = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "milestone")
  );

  const [chartWidth, setChartWidth] = useState(0);
  useEffect(() => {
    const scheduleElement = document.getElementById("schedule").scrollWidth;
    const detailsElement = document.getElementById("details").scrollWidth;
    setChartWidth(Math.max(500, scheduleElement + detailsElement + 2));
  }, []);

  const data = {
    taskPackTitles,
    workPackages,
    deliverables,
    milestones,
    daysPerMonth,
    totalDays,
  };

  return (
    <PageContainer chartWidth={chartWidth}>
      <div id="chartArea" className="chartArea">
      {ganttComplete ? <MarkedCompleteModal /> : null}
        <GanttChartLeft data={data} />
        <GanttChartRight data={data} />
      </div>
      {showSummary ? <GanttSummaryModal /> : null}
    </PageContainer>
  );
}
export default GanttChart;

const PageContainer = styled.div`
  position: relative;
  top: ${appTop};
  margin: auto;
  padding: 0px 10px 10px 10px;
  width: 100%;
  max-width: ${appWidth};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .chartArea {
  position: relative;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    max-width: ${(props) => props.chartWidth + 10}px;
    width: 100%;
  }
  .monthHeaderSpacer {
    height: calc(35px + ${wpMarginBottom});
    @media screen and (max-width: 750px) {
      height: 35px;
      border-bottom: 0;
    }
  }
`;
