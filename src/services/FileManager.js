import fetch from 'auth/FetchInterceptor';

const fileManagerService = {};
const apiRoute = '/filemanager';

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
