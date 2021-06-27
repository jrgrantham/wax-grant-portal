import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { navBackground, refHeight } from "../helpers";

function ProjectIdentifier() {
  const project = useSelector(
    (state) => state.entities.project.data.projectIdentifier
  );
  const admin = useSelector((state) => state.user.admin);

  if (!admin) return null;

  return (
    <Container>
      <h3>{project}</h3>
    </Container>
  );
}

export default ProjectIdentifier;

const Container = styled.div`
  /* position: relative; */
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${refHeight};
  background-color: ${navBackground};
  /* background-color: red; */
  top: 80px;
  left: 0;
  color: white;
  z-index: 2;
`;
