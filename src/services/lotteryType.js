import fetch from "auth/FetchInterceptor";
const lotteryTypeService = {};
const api = "/lottery_type";
lotteryTypeService.getLotteryTypes = async function (query) {
  try {
    let url = `${api}/get/all/admin`;
    const lotteryGroupId = query?.lotteryGroupId;
    const lotteryId = query?.lotteryId;
    const status = query?.status;
    if (lotteryGroupId) url = `${url}?lotteryGroupId=${lotteryGroupId}`;
    if (lotteryId)
      url =
        lotteryGroupId && lotteryGroupId !== null
          ? `${url}&lottteryId=${lotteryId}`
          : `${url}?lottteryId=${lotteryId}`;
    if (status)
      url =
        (lotteryGroupId && lotteryGroupId !== null) ||
        (lotteryId && lotteryId !== null)
          ? `${url}&status=${status}`
          : `${url}?status=${status}`;

    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};
lotteryTypeService.getLotteryTypeById = async function (id) {
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
lotteryTypeService.createLotteryType = async function (data) {
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
lotteryTypeService.editLotteryType = async function (id, data) {
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

lotteryTypeService.deleteLotteryType = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}`,
      method: "delete",
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default lotteryTypeService;
