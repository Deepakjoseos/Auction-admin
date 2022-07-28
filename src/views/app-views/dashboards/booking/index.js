import { Route, Switch, Redirect } from "react-router-dom";
import BookingList from "./list-booking";
import BookedList from "./booked-lotteries";

// In here we will define all our routes
const Booking = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={BookingList} />
      <Route path={`${match.url}/booked-lotteries/:bookingNumber`} component={BookedList} />

    </Switch>
  );
};

export default Booking;
