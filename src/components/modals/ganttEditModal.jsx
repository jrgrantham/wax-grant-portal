import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteTask,
  updateTask,
  updateTaskKey,
  updateNumberOfBars,
  spreadWork,
  getCombinedLengthOfBars,
  getNumberOfBars,
} from "../../store/projectData/tasks";
import { deleteTaskAllocations } from "../../store/projectData/allocations";
import Close from "../general/close";
import save from "../../images/save-grey.png";
import bin from "../../images/bin-grey.png";
import { Container } from "./modalStyling";
import { updateUserSelection } from "../../store/projectData/user";
import { toastDelay } from "../../helpers";

function EditModal(props) {
  const dispatch = useDispatch();
  const { task } = props;
  const { dayLoading, days, description, schedule } = task;
  const taskId = task.taskId;
  const barLimit = Math.ceil(schedule.length / 2);
  const bars = getNumberOfBars(
    useSelector((state) => state),
    taskId
  );
  const combinedLength = getCombinedLengthOfBars(
    useSelector((state) => state),
    taskId
  );

  const validationSchema = Yup.object({
    description: Yup.string().required("Required"),
    days: Yup.number()
      .typeError("You must specify a number")
      .min(1, "Minimum 1 day")
      .required("Required")
      .integer("Must be a whole number"),
    dayLoading: Yup.string().required("Required"),
    bars: Yup.number()
      .typeError("You must specify a number")
      .min(1, "Minimum 1 bar")
      .max(barLimit, `Maximum ${barLimit} bars`)
      // .max(formik.values.days, "cannot exceed days")
      .required("Required")
      .integer("Must be a whole number"),
  });

  const formik = useFormik({
    initialValues: {
      description,
      days,
      dayLoading,
      bars,
    },
    onSubmit: (values) => {
      const parsedBars = parseInt(values.bars);
      const parsedDays = parseInt(values.days);
      const newBars = bars === parsedBars ? false : parsedBars;
      let newDays = days === parsedDays ? false : parsedDays;
      const newDescription =
        description === values.description ? false : values.description;
      const newDayLoading =
        dayLoading === values.dayLoading ? false : values.dayLoading;

      if (newBars && newBars > parsedDays) {
        newDays = newBars;
        toast.info("Days increased to number of bars", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: toastDelay,
        });
      }
      if (newDescription)
        dispatch(
          updateTaskKey({ taskId, key: "description", value: newDescription })
        );
      if (newDayLoading)
        dispatch(
          updateTaskKey({ taskId, key: "daysLoading", value: newDayLoading })
        );
      if (newDays) {
        dispatch(updateTaskKey({ taskId, key: "days", value: newDays }));
      }
      if (newBars) {
        dispatch(updateNumberOfBars({ taskId, newBars }));
      }
      if (newDayLoading || newDays || newBars)
        dispatch(spreadWork({ taskId, combinedLength }));

      closeModal();
    },
    validationSchema,
  });

  function closeModal() {
    dispatch(
      updateUserSelection({
        key: "showComponent",
        value: "",
      })
    );
  }

  function resetBars() {
    dispatch(
      updateTask({
        taskId,
        newBars: 1,
        reset: true, // toast
      })
    );
    closeModal();
  }

  function handleDelete(taskId) {
    dispatch(deleteTask({ taskId }));
    dispatch(deleteTaskAllocations({ taskId }));
  }

  const closeData = {
    key: "showTaskEditModal",
  };

  return (
    <Container>
      <div className="editWindow">
        <Close data={closeData} />
        <form onSubmit={formik.handleSubmit}>
          <div className="formField">
            <label htmlFor="description">Task Title</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="errorMessage">{formik.errors.description}</p>
            ) : null}
          </div>

          <div className="formField">
            <label htmlFor="Assigned days">Assigned days</label>
            <input
              type="text"
              name="days"
              id="days"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.days}
            />
            {formik.touched.days && formik.errors.days ? (
              <p className="errorMessage">{formik.errors.days}</p>
            ) : null}
          </div>

          <div className="formField">
            <label htmlFor="Number of bars">Number of bars</label>
            <input
              type="number"
              name="bars"
              id="bars"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bars}
            />
            {formik.touched.bars && formik.errors.bars ? (
              <p className="errorMessage">{formik.errors.bars}</p>
            ) : null}
          </div>

          <div className="formField">
            <label htmlFor="Days Loading">Days Loading</label>
            <select
              id="dayLoading"
              name="dayLoading"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dayLoading}
            >
              <option value="front">Front</option>
              <option value="level">Level</option>
              <option value="back">Back</option>
            </select>
            {formik.touched.daysLoading && formik.errors.dayLoading ? (
              <p className="errorMessage">{formik.errors.dayLoading}</p>
            ) : null}
          </div>
          <div className="bottomButtons">
            <button className="leftB" onClick={resetBars}>
              Reset Bars
            </button>
            <button onClick={() => handleDelete(task.taskId)}>
              <div className="image">
                <img src={bin} alt="delete" />
              </div>
            </button>
            <button type="submit">
              <div className="image">
                <img src={save} alt="save" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditModal;
