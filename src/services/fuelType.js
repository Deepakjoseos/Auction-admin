import fetch from 'auth/FetchInterceptor';

const fuelTypeService = {};
const apiRoute = '/fuelType';


fuelTypeService.getFuelTypes = async function () {
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

export default fuelTypeService;