import fetch from "auth/FetchInterceptor";

const groupService = {};
const apiRoute = "/group";

groupService.getGroups = async function () {
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

groupService.getGroupById = async function (id) {
  console.log('groupiiiiiddd',id)
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

groupService.createGroup = async function (data) {
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

groupService.updateGroup = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/update`,
      method: "PUT",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

groupService.uploadMembers = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/upload`,
      method: "PUT",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default groupService;
