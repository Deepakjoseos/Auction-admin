import fetch from 'auth/FetchInterceptor';

const registrationService = {};
const apiRoute = '/registration';

registrationService.getRegistrations = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
      method: 'get'
    });
    console.log('res-return', res);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

registrationService.createRegistration = async function (data) {
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
registrationService.getRegistrationById = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};


registrationService.getParticipantRegistrations = async function (participantId) {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin?participantId=${participantId}`,
      method: 'get'
    });
    console.log('res-return', res);
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};


export default registrationService;
