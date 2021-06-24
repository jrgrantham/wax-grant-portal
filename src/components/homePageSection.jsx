import React from "react";
import styled from "styled-components";
import { navBackground } from "../helpers/settings";
import tick from '../images/tick-white.png'

function Section(props) {
  const {index, title, status} = props

  console.log(title, status);

  return (
    <Container>
    <div className="badge">
      <div className="complete">
        <img src={tick} alt="complete" />
      </div>
      <div className="inner">
        <h2>{index + 1}</h2>
      </div>
    </div>
    <h3>{title}</h3>
    </Container>
  );
}

export default Section;

const Container = styled.div`


    display: flex;
    justify-content: center;
    position: relative;
    /* border: 1px solid red; */
    flex-basis: 0;
    flex-grow: 1;

  .badge {
    top: -130px;
    /* left: 50%; */
    /* right: 50%; */
    background-color: ${navBackground};
    position: absolute;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner {
    width: 70px;
    height: 70px;
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .complete {
    border-radius: 50%;
    padding: 2px;
    background-color: ${navBackground};
    position: absolute;
    top: 1px;
    right: 1px;
    width: 26px;
    height: 26px;
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${navBackground};
  }
`;
