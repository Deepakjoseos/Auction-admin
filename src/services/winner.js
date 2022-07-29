import fetch from "auth/FetchInterceptor";
const winnerService = {};
const api = "/winner";
winnerService.getWinners = async function (query) {
  try {
    const lotteryId = query?.lotteryId;
    const lotteryTypeId = query?.lotteryTypeId;
    const date = query?.date;

    let url = `${api}/all/admin?api=winner`;
    if (lotteryId) url = `${url}&lotteryId=${lotteryId}`;
    if (lotteryTypeId) url = `${url}&lotteryTypeId=${lotteryTypeId}`;
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

export default winnerService;
