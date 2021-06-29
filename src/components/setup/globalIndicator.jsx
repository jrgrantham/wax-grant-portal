import React from "react";
import Tippy from "@tippy.js/react";
import styled from "styled-components";
import { settingsColor } from "../../helpers";

function GlobalIndicator() {
  return (
    <Container>
      <Tippy content="Global variable">
        <div className="global">
          &nbsp;
        </div>
      </Tippy>
    </Container>
  );
}
export default GlobalIndicator;

export const Container = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  left: -18px;
  bottom: 18px;
  border-radius: 50%;
  background-color: ${settingsColor};
`;