import { Route, Switch, Redirect } from "react-router-dom";
import TransactionList from "./list-transaction";
import TransactionForm from "./transaction-form";

// In here we will define all our routes
const Transaction = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={TransactionList} />
      <Route path={`${match.url}/add-transaction`} component={TransactionForm} />
    </Switch>
  );
};

export default Transaction;
