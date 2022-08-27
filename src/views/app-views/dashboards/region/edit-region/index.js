import React from "react";
import RegionForm from "../regionForm";

const EditRegion = (props) => {
  return <RegionForm mode="EDIT" param={props.match.params} />;
};

export default EditRegion;
