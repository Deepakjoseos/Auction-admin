import fetch from "auth/FetchInterceptor";
const bookedLotteryService = {};
const api = "/booked_lottery";
bookedLotteryService.getBookedLotteries = async function (query) {
  try {
    let url = `${api}/all/admin?api=bookedLottery`;

    const bookingNumber = query?.bookingNumber;
    const lotteryNumber = query?.lotteryNumber;
    const drawDate = query?.drawDate;
    const lotteryId = query?.lotteryId;
    const lotteryTypeId = query?.lotteryTypeId;
    const lotteryGroupId = query?.lotteryGroupId;
    const agentId = query?.agentId;

    if (bookingNumber) url = `${url}&bookingNumber=${bookingNumber}`;
    if (lotteryNumber) url = `${url}&lotteryNumber=${lotteryNumber}`;
    if (drawDate) url = `${url}&drawDate=${drawDate}`;
    if (lotteryId) url = `${url}&lotteryId=${lotteryId}`;
    if (lotteryTypeId) url = `${url}&lotteryTypeId=${lotteryTypeId}`;
    if (lotteryGroupId) url = `${url}&lotteryGroupId=${lotteryGroupId}`;
    if (agentId) url = `${url}&agentId=${agentId}`;
    console.log(url);
    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default bookedLotteryService;
