import fetch from 'auth/FetchInterceptor';

const brandService = {};
const api = 'brand';

brandService.getBrands = async function () {
  try {
    const res = await fetch({
      url: `${api}/all/admin`,
      method: 'get' 
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
// brandService.deleteBrand = async function (id) {
//     try {
//       const res = await fetch({
//         url: `${api}/${id}`,
//         method: 'delete',
//       })
//       return res
//     } catch (err) {
//       console.log(err, 'show-err')
//     }
//   }

brandService.getBrandById = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

brandService.createBrand = async function (data) {
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

brandService.editBrand = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/${id}?name=${data.name}&logo=${data.logo}&url=${data.url}&status=${data.status}`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
export default brandService;
