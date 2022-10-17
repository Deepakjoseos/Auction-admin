import fetch from 'auth/FetchInterceptor';

const winningService = {};
const apiRoute = '/winning';

winningService.getWinnings = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
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
