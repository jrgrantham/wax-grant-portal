import React from "react";
import styled from "styled-components";
import { tabHeight, tableLeftHighlight, tableLeftWidth } from "../../helpers";
import Button from "./leftMenuButton";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const {
    menuList,
    backgroundColor,
    color,
    status,
    changeStatus,
    section,
  } = props.data;

  const leader = useSelector((state) => state.user.selectedLeader);
  const company = useSelector(
    (state) => state.project.data[leader].companyName
  );

  return (
    <MenuContainer backgroundColor={backgroundColor} color={color}>
      <div className="links">
        <div className="spacer" />
        {menuList.map((option, index) => {
          return <Button option={option} key={index} data={props.data} />;
        })}
        <div className="spacer" />
      </div>
      <div className="completeDiv">
        <Tippy
          content={
            status ? 'Edit data' :  `Mark "${section}" as complete for "${company}"`
          }
        >
          <button onClick={changeStatus} className="completeButton">
            {status ? "Edit" : "Complete"}
          </button>
        </Tippy>
        <div className="spacer" />
      </div>
    </MenuContainer>
  );
}
export default LeftMenu;

const MenuContainer = styled.div`
  width: ${tableLeftWidth};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.backgroundColor};
  .completeDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .completeButton {
    margin: 0px 15px;
    /* border: 1px solid ${(props) => props.color}; */
    border: none;
    color: ${(props) => props.color};
    font-weight: 600;
    background-color: ${tableLeftHighlight};
  }
  .spacer {
    height: ${tabHeight};
  }
  .links {
    /* width: 100%; */
  }
`;
