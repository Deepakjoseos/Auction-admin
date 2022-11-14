import fetch from 'auth/FetchInterceptor';

const watchlistService = {};
const apiRoute = '/watch_list';

watchlistService.getWatchlist = async function (query = '') {
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

export default watchlistService;
