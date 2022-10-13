import React from "react";
import UploadeMembersForm from "../UploadeMembersForm";

const UploadGroupMember = (props) => {
  return <UploadeMembersForm param={props.match.params} />;
};

export default UploadGroupMember;
