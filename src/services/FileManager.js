import fetch from 'auth/FetchInterceptor';

const fileManagerService = {};
const apiRoute = '/filemanager';

fileManagerService.uploadImages = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/images/upload`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default fileManagerService;
