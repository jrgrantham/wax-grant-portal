import React from "react";
import styled from "styled-components";
import { navBackground } from "../helpers";

function Footer() {
  return <Container />;
}

export default Footer;

const Container = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 10px;
  background-color: ${navBackground};
  bottom: 0;
  z-index: 2;
`;
