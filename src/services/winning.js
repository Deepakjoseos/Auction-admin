import fetch from 'auth/FetchInterceptor';

const winningService = {};
const apiRoute = '/winning';

winningService.getWinnings = async function (query = '') {
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

winningService.getSellerWinnings = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/seller?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

winningService.getWinning = async function (id) {
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

winningService.addWinning = async function (data) {
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

export default winningService;
