import fetch from "auth/FetchInterceptor";

const depositService = {};
const apiRoute = "/deposit";

depositService.getDeposits = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

depositService.makeDeposit = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/make`,
      method: "post",
      data: data,
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

depositService.getDeposit = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default depositService;
