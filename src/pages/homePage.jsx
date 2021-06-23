import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { gantt, details, team, costs, revenue, options } = useSelector(
    (state) => state.entities.project.data.status
  );

  // combined status
  // gantt, revenue, options

  // individual
  // details, team, costs
  
  return (
    <Container>
      <h2>Grant Portal</h2>
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
  height: 80vh;
  color: white;
  h2 {
    font-size: 120px;
  }
`;
