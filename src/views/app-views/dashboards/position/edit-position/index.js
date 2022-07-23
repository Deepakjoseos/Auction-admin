import React from "react";
import PositionForm from "../form-position";
const EditPosition = ({ match }) => {
  return <PositionForm mode="EDIT" param={match.params} />;
};

export default EditPosition;
