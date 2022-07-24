import fetch from "auth/FetchInterceptor";
const outcomeService = {};
const api = "/outcome";
// GET
// /v1/outcome/{lotteryId}
outcomeService.getOutcomes = async function (lotteryId) {
  try {
    let url = `${api}/${lotteryId}`;
    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

outcomeService.getPastOutcomes = async function (lotteryId, data) {
  try {
    let url = `${api}/past/${lotteryId}`;
    const res = await fetch({
      url,
      method: "post",
      data,
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

outcomeService.drawLottery = async function (data) {
  try {
    const res = await fetch({
      url: `${api}/draw_lottery`,
      method: "post",
      data,
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default outcomeService;
