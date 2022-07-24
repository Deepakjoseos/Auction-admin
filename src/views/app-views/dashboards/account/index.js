import { Route, Switch, Redirect } from "react-router-dom";
import AccountList from "./list-account";

// In here we will define all our routes
const Account = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={AccountList} />
    </Switch>
  );
};

export default Account;
