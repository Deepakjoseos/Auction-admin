import { Route, Switch, Redirect } from "react-router-dom";
import BookedLotteryList from "./list-booked-lottery";

// In here we will define all our routes
const BookedLottery = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={BookedLotteryList} />
    </Switch>
  );
};

export default BookedLottery;
