import fetch from 'auth/FetchInterceptor';

const fileManagerService = {};
const apiRoute = '/filemanager';

fileManagerService.validURL = (str) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

const uploadImages = async (data) => {
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

fileManagerService.uploadImages = uploadImages;

fileManagerService.getImageUrl = async (file) => {
  console.log(file, 'fileeeee');
  const formData = new FormData();
  formData.append('files', file);
  formData.append('imageFor', 'general');
  const urls = await uploadImages(formData);

  if (urls) {
    return urls[0];
  }

  return '';
};

fileManagerService.getImagesUrl = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('imageFor', 'general');

  const urls = await uploadImages(formData);

  if (urls) {
    return urls;
  }

  return [];
};

export default fileManagerService;
