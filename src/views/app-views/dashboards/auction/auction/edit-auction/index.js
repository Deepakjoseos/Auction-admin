import React from "react";
import AuctionForm from "../add-auction/group-form";

const EditAuction = (props) => {
  return <AuctionForm mode="EDIT" param={props.match.params} />;
};

export default EditAuction;
