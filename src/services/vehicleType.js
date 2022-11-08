import fetch from 'auth/FetchInterceptor';

const vehicletypeService = {};
const api = '/vehicletype';

vehicletypeService.getVehicleTypes = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin  `,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

vehicletypeService.getVehicleTypeById = async function (vehicleTypeId) {
  try {
    const res = await fetch({
      url: `${api}/${vehicleTypeId}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
vehicletypeService.deleteVehicleType = async function (vehicleTypeId) {
  try {
    const res = await fetch({
      url: `${api}/${vehicleTypeId}`,
      method: 'delete'
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
vehicletypeService.createVehicleType = async function (data) {
  try {
    const res = await fetch({
      url: `${api}/create`,
      method: 'post',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
vehicletypeService.editVehicleType = async function (vehicleTypeId, data) {
  try {
    const res = await fetch({
      url: `${api}/${vehicleTypeId}`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

vehicletypeService.getPublicVehicleTypes = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/  `,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
export default vehicletypeService;
