import fetch from "auth/FetchInterceptor";
const outcomeService = {};
const api = "/outcome";

outcomeService.getOutcomes = async function () {
  try {
    let url = `${api}/all`;
    const res = await fetch({
      url,
      method: "get",
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
