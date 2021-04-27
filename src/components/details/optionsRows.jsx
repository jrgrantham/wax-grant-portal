import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./detailsStyling";
import { updateProjectInfo } from "../../store/entities/project";
import qMark from "../../images/qMark.png";

function OptionsRows() {
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  const { ganttRef, competitor } = useSelector(
    (state) => state.entities.project.data.details
  );

  const data = {
    maxHeight: "550px",
  };

  return (
    <Container data={data}>
      <div className="rows">
        <div className="row column">
          <div className="title">
            <p>Gantt Appendix Reference</p>
            <Tippy content="This is typically Q7, but see IUK competition webpage for details">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy>
          </div>
          <input
            type="text"
            value={ganttRef}
            className="field"
            name="ganttRef"
            onChange={onchangeHandler}
          />
        </div>
        <div className="row column">
          <div className="title">
            <p>Competitors Appendix Reference</p>
          </div>
          <input
            type="text"
            value={competitor}
            className="field"
            name="competitor"
            onChange={onchangeHandler}
          />
        </div>
      </div>
    </Container>
  );
}
export default OptionsRows;
