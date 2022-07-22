import fetch from "auth/FetchInterceptor";
const bookingService = {};
const api = "/booking";
bookingService.getBookings = async function (query) {
  try {
    let url = `${api}/all/admin`;

    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default bookingService;
