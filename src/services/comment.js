import fetch from 'auth/FetchInterceptor';

const commentService = {};
const apiRoute = '/inventory_comment';

commentService.getComments = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/all/admin?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

commentService.getSellerComments = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/all/seller?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

commentService.createComment = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create`,
      method: 'post',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

commentService.deleteComment = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'delete'
    });
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default commentService;
