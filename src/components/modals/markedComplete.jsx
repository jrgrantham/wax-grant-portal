import React from "react";
import styled from "styled-components";

function MarkedComplete(props) {
  return <Container />;
}
export default MarkedComplete;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(20, 20, 20, 0.2);
  z-index: 2;
`;
