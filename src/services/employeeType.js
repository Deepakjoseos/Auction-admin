import fetch from 'auth/FetchInterceptor';

const employeeTypeService = {};
const apiRoute = '/employee_type';

employeeTypeService.getEmployeeTypes = async function () {
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

employeeTypeService.getEmployeeType = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

employeeTypeService.addEmployeeType = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create`,
      method: 'post',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

employeeTypeService.editEmployeeType = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

employeeTypeService.delete = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete'
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default employeeTypeService;
