import React from "react";
import StateForm from "../stateForm";

const EditState = (props) => {
  return <StateForm mode="EDIT" param={props.match.params} />;
};

export default EditState;
