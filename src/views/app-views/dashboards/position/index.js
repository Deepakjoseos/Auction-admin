import { Route, Switch, Redirect } from "react-router-dom";
import AddPosition from "./add-position";
import EditPosition from "./edit-position";
import PositionList from "./listPosition";

// In here we will define all our routes
const Position = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/add`} component={AddPosition} />
      <Route path={`${match.url}/edit/:id`} component={EditPosition} />
      <Route path={`${match.url}/list`} component={PositionList} />
    </Switch>
  );
};

export default Position;
