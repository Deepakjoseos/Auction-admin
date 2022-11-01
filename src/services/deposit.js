import fetch from 'auth/FetchInterceptor';

const depositService = {};
const apiRoute = '/deposit';

depositService.getDeposits = async function (query) {
  try {
    let url = `${apiRoute}/get/all/admin?api=deposit`;
    if (query?.participantId)
      url = `${url}&participantId=${query.participantId}`;
    const res = await fetch({
      url,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

depositService.makeDeposit = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/make`,
      method: 'post',
      data: data
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

depositService.getDeposit = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

depositService.updateDeposit = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/update/${id}`,
      method: 'put',
      data: data
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default depositService;
