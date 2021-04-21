import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { appWidth } from "../../helpers";
import { updateUserSelection } from "../../store/projectData/user";

function Navigation() {
  const showMenu = useSelector((state) => state.user.showMenu);
  const dispatch = useDispatch();
  function closeMenu() {
    console.log("close");
    dispatch(updateUserSelection({ key: "showMenu", value: false }));
  }
  const data = {
    menuWidth: "200px",
    offset: "-200px",
    showMenu,
  };
  return (
    <Container appWidth={appWidth} data={data} onClick={closeMenu} id="menu">
      <div className="topButtons">
        <button onClick={() => console.log("Export")} className="menuButton">
          Export
        </button>
        <button onClick={() => console.log("Logout")} className="menuButton">
          Logout
        </button>
      </div>
      <button className="menuButton">
        <a href="http://intangible-engineering.com">Developer</a>
      </button>
    </Container>
  );
}
export default Navigation;

const Container = styled.nav`
  position: fixed;
  right: ${(props) => (props.data.showMenu ? "0" : props.data.offset)};
  top: 0;
  transition: right 0.3s;
  width: ${(props) => props.data.menuWidth};
  height: 100%;

  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  background-color: rgba(50, 50, 50, 1);
  cursor: pointer;

  .topButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  a {
    font-size: 14px;
  }

  .menuButton {
    margin-top: 20px;
    width: 150px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid #404040;
  }
`;
