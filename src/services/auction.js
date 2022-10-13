import fetch from "auth/FetchInterceptor";

const auctionService = {};
const apiRoute = "/auction";

auctionService.getauctions = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
      method: "get",
    });
    const data = res.data.filter((cur) => cur.status !== "Deleted");
    return data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

auctionService.getauctionById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

auctionService.createauction = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create`,
      method: "post",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

auctionService.updateauction = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: "PUT",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default auctionService;