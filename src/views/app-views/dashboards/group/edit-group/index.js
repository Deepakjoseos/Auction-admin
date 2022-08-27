import React from "react";
import FeeTypeForm from "../add-group/group-form";

const EditFeeType = (props) => {
  return <FeeTypeForm mode="EDIT" param={props.match.params} />;
};

export default EditFeeType;
