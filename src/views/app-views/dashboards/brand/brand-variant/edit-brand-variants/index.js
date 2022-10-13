import React from "react";
import BrandVariantForm from "../brandVariantForm";

const EditBrandVariant = (props) => {
  return <BrandVariantForm mode="EDIT" param={props.match.params} />;
};

export default EditBrandVariant;
