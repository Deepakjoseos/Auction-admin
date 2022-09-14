import React from "react";
import GroupForm from "../group-form";

const EditGroup = (props) => {
  return <GroupForm mode="EDIT" param={props.match.params} />;
};

export default EditGroup;
