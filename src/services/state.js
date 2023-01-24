import fetch from "auth/FetchInterceptor";

const stateService = {};
const apiRoute = "/state";

stateService.getStates = async function (query='') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all?${query}`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

stateService.createState = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create`,
      method: "post",
      data: data,
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

stateService.getState = async function (id) {
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

stateService.updateState = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/update/admin`,
      method: "PUT",
      data: data,
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};
export default stateService;
