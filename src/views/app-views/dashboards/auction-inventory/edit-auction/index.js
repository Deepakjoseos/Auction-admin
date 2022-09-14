import React from "react";
import AuctionInventoryForm from "../add-auction/auction-inventory-form";

const EditAuctionInventory = (props) => {
  console.log(`Hello`);
  return <AuctionInventoryForm mode="EDIT" param={props.match.params} />;
};

export default EditAuctionInventory;
