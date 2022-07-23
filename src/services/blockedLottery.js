import fetch from "auth/FetchInterceptor";
const blockedLotteryService = {};
const api = "/blocked_lottery";
blockedLotteryService.getBlockedLotteries = async function () {
  try {
    let url = `${api}/get/all/admin`;

    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

blockedLotteryService.getBlockedLottery = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}/admin`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default blockedLotteryService;
