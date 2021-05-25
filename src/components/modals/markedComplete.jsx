import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { toastDelay } from "../../helpers";

toast.configure();

function MarkedComplete() {
  let alerted = false;
  function alert() {
    if (!alerted) {
      toast.info("Marked as complete, click edit", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: toastDelay,
      });
      alerted = true;
    }
  }
  return <Container onClick={alert} />;
}
export default MarkedComplete;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
