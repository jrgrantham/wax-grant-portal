import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import {
  updateTeamMember,
  deleteTeamMember,
} from "../../store/projectData/team";
import { BiMenu } from "react-icons/bi";
import { isNumberKey } from "../../helpers";
import { deletePersonAllocations } from "../../store/projectData/allocations";
import bin from "../../images/bin-grey.png";
import ProfileModal from "../modals/teamProfileModal";
import DeleteModal from "../modals/teamDeleteModal";

function TeamRow(props) {
  const dispatch = useDispatch();
  const { projectRoles, locations } = useSelector(
    (state) => state.options.data
  );
  const { person, employmentType, provided, acronyms } = props;
  const [showProfile, setShowProfile] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function onChangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    if (key === "salary" || key === "dayRate") {
      if (e.target.value) {
        value = parseInt(value.slice(-6));
      } else value = 0;
    }
    dispatch(
      updateTeamMember({
        personId: person.personId,
        key,
        value,
      })
    );
  }

  function deletePerson() {
    dispatch(deleteTeamMember({ personId: person.personId }));
    dispatch(deletePersonAllocations({ personId: person.personId }));
  }

  return (
    <div className="row">
      {showProfile ? (
        <ProfileModal setShowProfile={setShowProfile} person={person} />
      ) : null}
      {confirmDelete ? (
        <DeleteModal
          setConfirmDelete={setConfirmDelete}
          name={person.name}
          deletePerson={deletePerson}
        />
      ) : null}
      <Tippy content="Drag to reorder the rows">
        <div {...provided.dragHandleProps} className="hidden grabHandle">
          <BiMenu />
        </div>
      </Tippy>
      <input
        id={person.personId + "name"}
        name="name"
        value={person.name}
        onChange={onChangeHandler}
        className="field name"
      />
      <input
        id={person.personId + "acronym"}
        name="acronym"
        value={person.acronym}
        onChange={onChangeHandler}
        className={
          acronyms[person.acronym] > 1
            ? "field acronym duplicate"
            : "field acronym"
        }
      />
      <input
        type="text"
        id={person.personId + "role"}
        name="role"
        placeholder={person.role}
        onChange={onChangeHandler}
        className="field role"
        list={`${person.personId}roleList`}
      />
      <datalist id={`${person.personId}roleList`}>
        {projectRoles.map((role, index) => {
          return (
            <option key={index} value={role}>
              {role}
            </option>
          );
        })}
      </datalist>

      {employmentType === "staff" ? (
        <input
          id={person.personId + "salary"}
          name="salary"
          value={person.salary}
          onKeyDown={(e) => isNumberKey(e)}
          onChange={onChangeHandler}
          className="field salary"
        />
      ) : (
        <>
          <input
            id={person.personId + "dayRate"}
            name="dayRate"
            value={person.dayRate}
            onKeyDown={(e) => isNumberKey(e)}
            onChange={onChangeHandler}
            className="field dayRate"
          />
          <select
            className="field location"
            id={person.personId + "location"}
            name="location"
            value={person.location}
            onChange={onChangeHandler}
          >
            {locations.map((location, index) => {
              return (
                <option key={index} value={location}>
                  {location}
                </option>
              );
            })}
          </select>
        </>
      )}
      <button onClick={() => setShowProfile(true)} className="profileButton">
        Profile
      </button>
      <div className="hidden deleteIcon">
        <Tippy content="All associated data will be lost">
          <img
            // className="delete"
            src={bin}
            alt="delete"
            style={{ cursor: "pointer" }}
            onClick={() => setConfirmDelete(true)}
          />
        </Tippy>
      </div>
    </div>
  );
}
export default TeamRow;
