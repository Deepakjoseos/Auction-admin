import fetch from 'auth/FetchInterceptor';

const approveBidService = {};
const apiRoute = '/approve_bid';

approveBidService.getApproveBids = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

approveBidService.getApproveBid = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

approveBidService.addApproveBid = async function (data) {
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

approveBidService.delete = async function (id) {
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


export default approveBidService;
