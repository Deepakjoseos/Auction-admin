import { Route, Switch, Redirect } from "react-router-dom";
import BlockeLotteryList from "./list-blocked-lottery";

// In here we will define all our routes
const BlockedLottery = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={BlockeLotteryList} />
    </Switch>
  );
};

export default BlockedLottery;
