import fetch from 'auth/FetchInterceptor';

const regionService = {};
const api = '/region';

regionService.getRegions = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

regionService.createRegion = async function (data) {
  try {
    const res = await fetch({
      url: `${api}/create`,
      method: 'POST',
      data: data
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

regionService.getRegionsByID = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

regionService.updateRegion = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/${id}/update/admin`,
      method: 'PUT',
      data: data
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

regionService.getPublicRegions = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default regionService;
