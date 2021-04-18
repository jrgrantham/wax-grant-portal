import React from "react";
import styled from "styled-components";
import closeWhite from "../../images/close-white.png";
import closeGrey from "../../images/close-grey.png";

function GanttSummaryModal(props) {
  const color = props.color === "white" ? closeWhite : closeGrey;
  return (
    <Container>
      <img onClick={props.close} src={color} alt="close" />
    </Container>
  );
}
export default GanttSummaryModal;

const Container = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;
