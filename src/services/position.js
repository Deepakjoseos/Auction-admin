import fetch from "auth/FetchInterceptor";
const positionService = {};
const api = "/position";
positionService.getPositions = async function (query) {
  try {
    let url = `${api}/all/admin`;
    const lotteryId = query?.lotteryId;
    const lotteryTypeId = query?.lotteryTypeId;

    if (lotteryId) url = `${url}?lotteryId=${lotteryId}`;
    if (lotteryTypeId)
      url = lotteryId
        ? `${url}&lotteryTypeId=${lotteryTypeId}`
        : `${url}?lotteryTypeId=${lotteryTypeId}`;
    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};
positionService.getPositionById = async function (id) {
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
positionService.createPosition = async function (data) {
  try {
    const res = await fetch({
      url: `${api}/create`,
      method: "post",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};
positionService.editPosition = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/${id}`,
      method: "put",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default positionService;
