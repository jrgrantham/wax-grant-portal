import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { updateProjectInfo } from "../../store/projectData/project";

function OptionsRows() {
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  const {
    ganttRef,
    competitor,
  } = useSelector((state) => state.project.data);

  return (
    <Container>
      <div className="rows">
        <div className="row">
          <Tippy placement="top-start" content="Gantt Appendix Reference">
            <input
              type="text"
              value={ganttRef}
              className="field"
              name="ganttRef"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Competitors Appendix Reference">
            <input
              type="text"
              value={competitor}
              className="field"
              name="competitor"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
      </div>
    </Container>
  );
}
export default OptionsRows;
