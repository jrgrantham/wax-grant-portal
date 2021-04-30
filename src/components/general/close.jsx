import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import closeImg from "../../images/close-grey-white.png";
import { updateUserSelection } from "../../store/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastDelay } from "../../helpers";

function Close(props) {
  const { message } = props.data;
  const dispatch = useDispatch();
  let notification = true;
  function close() {
    if (message) {
      if (notification) {
        toast.configure();
        toast.info(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: toastDelay,
        });
        notification = false;
      }
    } else
      dispatch(
        updateUserSelection({
          key: "showComponent",
          value: "",
        })
      );
  }
  return (
    <Container onClick={close}>
      <img src={closeImg} alt="close" />
    </Container>
  );
}
export default Close;

const Container = styled.div`
  position: absolute;
  top: -11px;
  right: -11px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;
