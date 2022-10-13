import fetch from "auth/FetchInterceptor";

const brandVariantService = {};
const api = "brand_variant";

brandVariantService.getAll = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

brandVariantService.create = async function (data) {
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

brandVariantService.delete = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/delete/${id}`,
      method: "delete",
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

brandVariantService.getById = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

brandVariantService.edit = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/update/${id}`,
      method: "put",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};
export default brandVariantService;
