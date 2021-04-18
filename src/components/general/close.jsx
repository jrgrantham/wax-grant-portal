import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import closeWhite from "../../images/close-white.png";
import closeGrey from "../../images/close-grey.png";
import { updateUserSelection } from "../../store/projectData/user";

function Close(props) {
  const {key} = props.data
  const dispatch = useDispatch();
  function close() {
    dispatch(
      updateUserSelection({
        key,
        value: "",
      })
    );
  }
  // const color = props.color === "white" ? closeWhite : closeGrey;
  return (
    <Container onClick={close}>
      <img src={closeGrey} alt="close" />
    </Container>
  );
}
export default Close;

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
