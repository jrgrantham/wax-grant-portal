import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {
  appTop,
  appWidth,
  wpMarginBottom,
} from "../helpers/";
import GanttChartLeft from "../components/gantt/ganttChartLeft";
import GanttChartRight from "../components/gantt/ganttChartRight";
import GanttSummaryModal from "../components/modals/ganttSummaryModal";
// import { allResources } from "../store";

function GanttChart() {
  const allTasks = useSelector((state) => state.tasks.data);

  function createGroupedTasks(titles, data) {
    const groupedTask = [];
    titles.forEach((title) => {
      const group = data.filter(
        (workPack) => workPack.workPackageTitle === title
      );
      groupedTask.push(group);
    });
    return groupedTask;
  }

  const taskPackTitles = [
    ...new Set(
      allTasks.map((workPackage) => workPackage.workPackageTitle)
      // .sort((a, b) => a - b)
    ),
  ];
  const groupedTasks = createGroupedTasks(taskPackTitles, allTasks);
  const deliverables = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "deliverable")
  );
  const milestones = useSelector((state) =>
    state.deadlines.data.filter((task) => task.type === "milestone")
  );

  const projectLength = useSelector(
    (state) => state.project.data.details.projectLength
  );

  const daysPerMonth = [];
  let totalDays = 0;
  for (let i = 0; i < projectLength; i++) {
    let days = 0;
    for (let j = 0; j < allTasks.length; j++) {
      const currentDay = allTasks[j].schedule[i].value;
      days += currentDay;
      totalDays += currentDay;
    }
    daysPerMonth.push(days);
  }

  function showSummary() {
    if (useSelector(state => state.user.showGanttSummary)) return <GanttSummaryModal />
  }

  const [chartWidth, setChartWidth] = useState(0);
  useEffect(() => {
    const scheduleElement = document.getElementById("schedule").scrollWidth;
    const detailsElement = document.getElementById("details").scrollWidth;
    setChartWidth(Math.max(500, scheduleElement + detailsElement + 2));
  }, []);

  const data = {
    taskPackTitles,
    groupedTasks,
    deliverables,
    milestones,
    daysPerMonth,
    totalDays,
  };

  return (
    <PageContainer chartWidth={chartWidth}>
      <div id="chartArea" className="chartArea">
        <GanttChartLeft data={data} />
        <GanttChartRight data={data} />
      </div>
      {showSummary()}
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
