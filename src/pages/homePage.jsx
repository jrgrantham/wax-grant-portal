import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { navBackground, questionColor } from "../helpers/settings";
import Section from "../components/homePageSection";
import tick from "../images/tick-white.png";

function HomePage() {
  // const { gantt, details, team, costs, revenue, options } = useSelector(
  //   (state) => state.entities.project.data.status
  // );
  const status = useSelector((state) => state.entities.project.data.status);
  const project = useSelector(
    (state) => state.entities.project.data.details.productPlatformName
  );
  const admin = useSelector((state) => state.user.admin);

  const sections = [
    "Details",
    "Team",
    "Gantt",
    "Costs",
    "Revenue",
    // "Risks",
    "Setup",
  ];

  if (!admin) sections.pop();

  return (
    <Container>
      <div className="title">
        <h2>{project}</h2>
      </div>
      <div className="content shadow">
        <div className="top"></div>
        <div className="bottom">
          {sections.map((title, index) => {
            return (
              <Section
                title={title}
                index={index}
                key={index}
                status={status[title.toLowerCase()]}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 150px;
  /* border: 1px solid red; */
  color: white;
  .content {
    width: 970px;
    height: 200px;
    background-color: white;
    border-radius: 6px;
    padding: 0 20px;
    margin-top: 80px;
    box-shadow: 8px 8px 12px rgba(1, 1, 1, 0.5);
  }
  /* .title {
    position: relative;
    padding: 5px 15px;
  } */
  .top {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid grey;
  }
  .bottom {
    display: flex;
    padding-top: 30px;
    justify-content: space-evenly;
  }
  .section {
    display: flex;
    justify-content: center;
    position: relative;
    /* border: 1px solid red; */
    flex-basis: 0;
    flex-grow: 1;
  }
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
  h2 {
    font-size: 40px;
    /* margin-bottom: 30px; */
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${navBackground};
  }
`;
