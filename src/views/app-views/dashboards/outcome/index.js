import { Route, Switch, Redirect } from "react-router-dom";
import CreateOutcome from "./draw-lottery";
import OutcomeList from "./list-outcome";

// In here we will define all our routes
const Outcome = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/draw-lottery`} component={CreateOutcome} />
      <Route path={`${match.url}/list`} component={OutcomeList} />
    </Switch>
  );
};

export default Outcome;
