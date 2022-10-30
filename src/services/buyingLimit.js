import fetch from 'auth/FetchInterceptor';

const buyinglLimitService = {};
const apiRoute = '/buying_limit';

buyinglLimitService.update = async (data) => {
  try {
    const res = await fetch({
      url: `${apiRoute}/update`,
      method: 'post',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

buyinglLimitService.getAll = async (query = '') => {
  try {
    let url = `${apiRoute}/get/all/admin${query}`;

    const res = await fetch({
      url,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default buyinglLimitService;
