import { Route, Switch, Redirect } from "react-router-dom";
import WinnerList from "./list-winner";

// In here we will define all our routes
const Winner = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={WinnerList} />
    </Switch>
  );
};

export default Winner;
