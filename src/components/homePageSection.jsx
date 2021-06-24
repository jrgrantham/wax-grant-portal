import React from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";
import { navBackground } from "../helpers/settings";
import tick from "../images/tick-white.png";

function Section(props) {
  const { index, title, status, leaders } = props;

  const isSingle = typeof status === "object" ? false : true;

  function checkAll() {
    for (let i = 0; i < leaders.length; i++) {
      if (!status[leaders[i]]) return false;
      else return true;
    }
  }
  const complete = isSingle ? status : checkAll();

  return (
    <Container>
      <div className="badge">
        {complete ? (
          <div className="complete">
            <img src={tick} alt="complete" />
          </div>
        ) : null}
        <div className="inner">
          <h2>{index + 1}</h2>
        </div>
      </div>
      <h3>{title}</h3>
      <div className="status">
        {isSingle ? (
          <div className={status ? "single dot partnerComplete" : "single dot"} />
        ) : (
          leaders.map((leader, index) => {
            return (
              <div
                key={index}
                className={status[leader] ? "multiple dot partnerComplete" : "multiple dot"}
              />
            );
          })
        )}
      </div>
    </Container>
  );
}

export default Section;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  .status {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .dot {
    border: 2px solid ${navBackground};
    margin: 0 2px;
    border-radius: 50%;
  }
  .single {
    width: 12px;
    height: 12px;
  }
  .multiple {
    width: 8px;
    height: 8px;
  }
  .partnerComplete {
    background-color: ${navBackground};
  }
`;
