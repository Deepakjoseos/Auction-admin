// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
// import AddAuction from "./add-auction";
// import AuctionInventoryList from "./auction-inventory-list";
// import EditAuctionInventory from "./edit-auction";

// const Auction = (props) => {
//   const { match } = props;
//   return (
//     <Switch>
//       <Redirect
//         exact
//         from={`${match.url}`}
//         to={`${match.url}/auction-inventory-list`}
//       />
//       <Route
//         path={`${match.url}/add-auction-inventory`}
//         component={AddAuction}
//       />
//       <Route
//         path={`${match.url}/edit-auction-inventory/:id`}
//         component={EditAuctionInventory}
//       />
//       <Route
//         path={`${match.url}/auction-inventory-list`}
//         component={AuctionInventoryList}
//       />
//     </Switch>
//   );
// };

// export default Auction;
