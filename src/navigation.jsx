import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Menu from "./components/general/menu";
import { appTop, appWidth, navBackground, navHighlight } from "./helpers";
import navHome from "./images/navHome.png";
import navBurger from "./images/navBurger.png";
import { updateUserSelection } from "./store/user";

function Navigation() {
  const dispatch = useDispatch();
  function openMenu() {
    dispatch(updateUserSelection({ key: "showMenu", value: true }));
  }
  return (
    <Container appWidth={appWidth}>
      <Menu />
      <div className="navBar">
        <div className="burger" />
        <div className="pageLinks">
          <NavLink
            exact
            to="/"
            className="navButton icon"
            activeClassName="selected"
          >
            <img src={navHome} alt="home" />
          </NavLink>
          <NavLink
            exact
            to="/project"
            className="navButton"
            activeClassName="selected"
          >
            <h3>Details</h3>
          </NavLink>
          <NavLink
            exact
            to="/team"
            className="navButton"
            activeClassName="selected"
          >
            <h3>Team</h3>
          </NavLink>
          <NavLink to="/gantt" className="navButton" activeClassName="selected">
            <h3>Gantt Chart</h3>
          </NavLink>
          <NavLink
            exact
            to="/costs"
            className="navButton"
            activeClassName="selected"
          >
            <h3>Costs</h3>
          </NavLink>
          <NavLink
            exact
            to="/revenue"
            className="navButton"
            activeClassName="selected"
          >
            <h3>Revenue</h3>
          </NavLink>
          <NavLink
            exact
            to="/risks"
            className="navButton"
            activeClassName="selected"
          >
            <h3>Risks</h3>
          </NavLink>
        </div>

        <div className="icon burger" onClick={openMenu}>
          <img src={navBurger} alt="menu" />
        </div>
      </div>
    </Container>
  );
}
export default Navigation;

const Container = styled.nav`
  // full width of screen
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  height: ${appTop};
  background-color: ${navBackground};
  z-index: 10;

  .navBar {
    width: 100%;
    max-width: ${(props) => props.appWidth};
    /* height: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pageLinks {
    display: flex;
  }
  .navButton {
    display: flex;
    justify-content: center;
    color: white;
    border-radius: 5px;
    padding: 5px 15px;
    margin: 0 5px;
    &:hover h3 {
      border-bottom: 2px solid rgba(255, 255, 255, 1);
    }
  }
  .navButton.selected:hover h3 {
    border-bottom: 2px solid ${navHighlight};
  }
  .icon {
    height: 40px;
    padding: 10px 15px;
  }
  .burger {
    height: 20px;
    width: 20px;
    padding: 0;
    cursor: pointer;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .selected {
    background-color: ${navHighlight};
    h3 {
      border-bottom: 2px solid ${navHighlight};
    }
  }
  h3 {
    border-top: 2px solid rgba(255, 255, 255, 0);
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    padding: 2px 0px;
    transition: border-bottom 0.6s;
  }
`;
