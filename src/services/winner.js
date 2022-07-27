import fetch from "auth/FetchInterceptor";
const winnerService = {};
const api = "/winner";
winnerService.getWinners = async function (params) {
  try {
    const lotteryId = params?.lotteryId;
    const lotteryTypeId = params?.lotteryTypeId;
    let url = `${api}/all/admin`;
    if (lotteryId) url = `${url}/${lotteryId}`;
    if (lotteryTypeId && lotteryId) url = `${url}/${lotteryTypeId}`;
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
