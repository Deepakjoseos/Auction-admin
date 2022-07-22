import { Route, Switch, Redirect } from "react-router-dom";
import TransactionList from "./list-transaction";

// In here we will define all our routes
const Transaction = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      {/* <Route path={`${match.url}/add`} component={AddPosition} /> */}
      {/* <Route path={`${match.url}/edit/:id`} component={EditPosition} /> */}
      <Route path={`${match.url}/list`} component={TransactionList} />
    </Switch>
  );
};

export default Transaction;
