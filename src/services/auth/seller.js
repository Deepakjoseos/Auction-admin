import fetch from 'auth/FetchInterceptor';

const sellerService = {};
const api = '/participant';
sellerService.getProfile = async function () {
  try {
    const res = await fetch({
      url: `${api}/profile`,
      method: 'get'
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default sellerService;
