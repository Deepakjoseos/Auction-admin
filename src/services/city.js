import fetch from "auth/FetchInterceptor";

const cityService = {};
const api = "/city";

cityService.getcity = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default cityService;
