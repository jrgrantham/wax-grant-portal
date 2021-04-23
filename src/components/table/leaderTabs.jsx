import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateUserSelection } from "../../store/projectData/user";
import { fontColorGrey, tabBottomMargin, tabHeight } from "../../helpers";

function LeaderTabs(props) {
  const dispatch = useDispatch();
  const leader = useSelector((state) => state.user.selectedLeader);

  const pOne = useSelector((state) => state.project.data.pOne.companyName);
  const pTwo = useSelector((state) => state.project.data.pTwo.companyName);

  const tabs = [
    { name: "Lead Applicant", key: "lead" },
    { name: pOne ? pOne : 'Partner One', key: "pOne" },
    { name: pTwo ? pTwo : 'Partner Two', key: "pTwo" },
    { name: "Combined", key: "combined" },
  ];

  // set to leader if combined not relevant
  if (!props.viewCombinedTab) {
    if (leader === "combined") selectLeader("lead");
    tabs.pop();
  }

  function selectLeader(value) {
    dispatch(updateUserSelection({ key: "selectedLeader", value }));
  }

  return (
    <PageContainer>
      {tabs.map((tab, index) => {
        return (
          <h3
            key={index}
            className={leader === tab.key ? "leader selectedLeader" : "leader"}
            style={index === 0 ? { borderRadius: "0px 6px 0 0" } : null}
            onClick={() => selectLeader(tab.key)}
          >
            {tab.name}
          </h3>
        );
      })}
    </PageContainer>
  );
}
export default LeaderTabs;

const PageContainer = styled.div`
  height: ${tabHeight};
  display: flex;
  background-color: rgba(88, 88, 88, 1);
  /* margin-bottom: ${tabBottomMargin}; */

  .leader {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-left: 2px solid rgba(64, 64, 64, 1);
    border-right: 2px solid rgba(110, 110, 110, 1);
    cursor: pointer;
  }
  .selectedLeader {
    background-color: white;
    color: ${fontColorGrey};
    border-radius: 6px 6px 0 0;
    border-left: 2px solid white;
    border-right: 2px solid white;
    /* border: none */
  }
`;
