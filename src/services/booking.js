import fetch from "auth/FetchInterceptor";
const bookingService = {};
const api = "/booking";
bookingService.getBookings = async function (query) {
  try {
    let url = `${api}/all/admin?api=booking`;
    const lotteryId = query?.lotteryId;
    const bookingNumber = query?.bookingNumber;
    const agentId = query?.agentId;
    const date = query?.date;

    if (lotteryId) url = `${url}&lotteryId=${lotteryId}`;
    if (bookingNumber) url = `${url}&bookingNumber=${bookingNumber}`;
    if (agentId) url = `${url}&agentId=${agentId}`;
    if (date) url = `${url}&date=${date}`;
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
