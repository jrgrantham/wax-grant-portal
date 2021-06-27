import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { navBackground } from "../helpers/settings";
import Section from "../components/homePageSection";

function HomePage() {
  const status = useSelector((state) => state.entities.project.data.status);
  const project = useSelector(
    (state) => state.entities.project.data.details.productPlatformName
  );
  const admin = useSelector((state) => state.user.admin);
  const { partners } = useSelector((state) => state.entities.setup.data);
  const leaderList = ["lead", "pOne", "pTwo"];
  const leaders = leaderList.slice(0, partners);

  const sections = [
    "Details",
    "Team",
    "Gantt",
    "Costs",
    "Revenue",
    "Risks",
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
                leaders={leaders}
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
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  top: 150px;
  color: white;

  .content {
    width: 970px;
    height: 200px;
    background-color: white;
    border-radius: 6px;
    padding: 0 20px;
    margin-top: 100px;
    box-shadow: 8px 8px 12px rgba(1, 1, 1, 0.5);
  }
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
    padding: 3px;
    background-color: ${navBackground};
    position: absolute;
    top: -2px;
    right: -2px;
    width: 30px;
    height: 30px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${navBackground};
  }
`;
