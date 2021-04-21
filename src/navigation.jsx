import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { appTop, appWidth, navBackground } from "./helpers";
import navHome from "./images/navHome.png";
import navBurger from "./images/navBurger.png";

function Navigation() {
  function openMenu() {
    setMenu(true);
  }
  const [menu, setMenu] = useState(false);
  return (
    <Container appWidth={appWidth} menu={menu}>
      <div className="navBar">
        <NavLink
          exact
          to="/"
          className="navButton icon"
          activeClassName="selected"
        >
          <img src={navHome} alt="home"/>
        </NavLink>

        <div className="pageLinks">
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

        <p className="navButton icon burger" onClick={openMenu}>
        <img src={navBurger} alt="menu"/>
        </p>
      </div>

      <div onClick={() => setMenu(false)} id="menu" className="menu">
        <div className="top">
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
    border-bottom: 2px solid rgba(30, 91, 127, 1);
  }
  .icon {
    height: 40px;
    padding: 5px 15px;
  }
  .burger {
    max-height: 35px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .selected {
    background-color: rgba(30, 91, 127, 1);
    h3 {
      border-bottom: 2px solid rgba(30, 91, 127, 1);
    }
  }
  h3 {
    border-top: 2px solid rgba(255, 255, 255, 0);
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    padding: 2px 0px;
    transition: border-bottom 0.6s;
  }

  .menu {
    position: fixed;
    right: ${(props) => (props.menu ? "0" : "-200px")};
    transition: right 0.3s;
    width: 200px;
    min-height: 100%;

    padding-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    background-color: rgba(50, 50, 50, 1);
    cursor: pointer;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    a {
      font-size: 14px;
      margin: 0;
      padding: 0;
      color: #a1a1a1;
    }
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
