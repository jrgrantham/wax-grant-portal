import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeTask, updateTaskPack } from "../../store/projectData/tasks";
import { deleteTaskAllocations } from "../../store/projectData/allocations";
import Close from "../general/close";
import save from "../../images/save-grey.png";
import bin from "../../images/bin-grey.png";
import { Container } from "./modalStyling";
import { updateUserSelection } from "../../store/projectData/user";

function numberOfBars(schedule) {
  let bars = 0;
  for (let i = schedule.length - 1; i >= 0; i--) {
    if (schedule[i].status) {
      bars = schedule[i].barNumber;
      return bars;
    }
  }
}

function EditModal(props) {
  const { task, taskPackTitles } = props;
  const { dayLoading, days, description, workPackageTitle, schedule } = task;
  const dispatch = useDispatch();
  const barLimit = Math.ceil(schedule.length / 2);
  const bars = numberOfBars(schedule);

  const validationSchema = Yup.object({
    workPackageTitle: Yup.string().required("Required"),
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
      .required("Required")
      .integer("Must be a whole number"),
  });

  const formik = useFormik({
    initialValues: {
      workPackageTitle,
      description,
      days,
      dayLoading,
      bars,
    },
    onSubmit: (values) => {
      const parsedBars = parseInt(values.bars);
      const parsedDays = parseInt(values.days);
      const newBars = bars === parsedBars ? false : parsedBars;
      const newDays = days === parsedDays ? false : parsedDays;
      const newWorkPackageTitle =
        workPackageTitle === values.workPackageTitle
          ? false
          : values.workPackageTitle;
      const newDescription =
        description === values.description ? false : values.description;
      const newDayLoading =
        dayLoading === values.dayLoading ? false : values.dayLoading;
      const changes = {
        newBars,
        newDays,
        newWorkPackageTitle,
        newDescription,
        newDayLoading,
      };
      dispatch(
        updateTaskPack({
          task,
          changes,
        })
      );
      closeModal();
    },
    validationSchema,
  });

  function closeModal() {
    dispatch(
      updateUserSelection({
        key: "showTaskEditModal",
        value: "",
      })
    );
  }

  function resetBars() {
    // send bars = 1 then days = 1
    const changes = {
      newBars: 1,
      newDays: 1,
      reset: true, // to stop toast notification
    };
    dispatch(
      updateTaskPack({
        task,
        changes,
      })
    );
    closeModal();
  }

  function deleteTask(taskId) {
    dispatch(removeTask(taskId));
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
            <label htmlFor="work pack">Work Package</label>
            <select
              value={formik.values.workPackageTitle}
              onChange={formik.handleChange}
              name="workPackageTitle"
              id="workPackageTitle"
            >
              {taskPackTitles.map((title, index) => (
                <option value={title} key={index} className="title">
                  {title}
                </option>
              ))}
            </select>
            {formik.touched.workPackageTitle &&
            formik.errors.workPackageTitle ? (
              <p className="errorMessage">{formik.errors.workPackageTitle}</p>
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
            <button onClick={() => deleteTask(task.taskId)}>
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
