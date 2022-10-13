import fetch from "auth/FetchInterceptor";

const commentService = {};
const apiRoute = "/comments";





commentService.createComment = async function (data) {
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
commentService.deleteComment = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}




export default commentService;
