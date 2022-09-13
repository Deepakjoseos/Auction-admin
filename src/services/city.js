import fetch from "auth/FetchInterceptor";

const cityService = {};
const apiRoute = "/city";

cityService.getCities = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

cityService.createCity = async function (data) {
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

cityService.getCity = async function (id) {
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

cityService.updateCity = async function (id, data) {
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
export default cityService;
