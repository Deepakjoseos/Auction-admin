import fetch from 'auth/FetchInterceptor';

const sheetService = {};
const apiRoute = '/sample_sheet';

sheetService.getSheets = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/all?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default sheetService;
