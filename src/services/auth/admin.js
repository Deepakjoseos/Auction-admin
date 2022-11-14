import fetch from 'auth/FetchInterceptor';

const authAdminService = {};
const api = '/admin';
authAdminService.getProfile = async function () {
  try {
    const res = await fetch({
      url: `${api}/profile`,
      method: 'get'
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.login = async function (data) {
  try {
    const res = await fetch({
      url: `auth/login`,
      method: 'post',
      data
    });

    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.resetPassword = async function (password) {
  try {
    const res = await fetch({
      url: `${api}/password/reset`,
      method: 'put',
      data: {
        password
      }
    });

    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

// authAdminService.createUser = async function (info) {
//   try {
//     const middleName = info?.middleName;
//     const lastName = info?.lastName;
//     let data = {};
//     data.firstName = info?.firstName;
//     data.contact = info?.contact;
//     data.type = info?.type;
//     data.email = info?.email;
//     data.password = info?.password;
//     if (middleName) data.middleName = middleName;
//     if (lastName) data.lastName = lastName;

//     const res = await fetch({
//       url: `${api}/user/create`,
//       method: "post",
//       data,
//     });
//     console.log(res);
//     return res.data;
//   } catch (err) {
//     console.log(err, "show-err");
//   }
// };

authAdminService.createUser = async function (data) {
  try {
    const res = await fetch({
      url: `/sub_admin/create`,
      method: 'post',
      data
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.editUser = async function (data, id) {
  try {
    const res = await fetch({
      url: `/sub_admin/update/${id}/headadmin`,
      method: 'put',
      data
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.getSubAdminById = async function (userId) {
  try {
    const res = await fetch({
      url: `/sub_admin/${userId}`,
      method: 'get'
    });
    console.log(res.data, 'hbkhjkhuoij');
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.editSubAdminRole = async function (data) {
  try {
    const res = await fetch({
      url: `/sub_admin/role/update`,
      method: 'put',
      data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

authAdminService.getUser = async function (query) {
  try {
    const res = await fetch({
      url: `user/get/all/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
authAdminService.getAllSubAdmins = async function (query = '') {
  try {
    const res = await fetch({
      url: `https://auction.riolabz.com/v1/sub_admin/get/all?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-error');
  }
};
authAdminService.getAllParticipants = async function (query) {
  try {
    const res = await fetch({
      url: '/user/get/all/headadmin?authType=Participant',
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-error');
  }
};
export default authAdminService;
