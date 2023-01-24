import fetch from 'auth/FetchInterceptor';

const participantService = {};
const apiRoute = '/participant';
participantService.createParticipant = async (data) => {
  try {
    const res = await fetch({
      url: `${apiRoute}/create/admin`,
      method: 'post',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
participantService.getParticipantById = async function (id) {
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
participantService.editParticipant = async (id, data) => {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/update/admin`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
participantService.editParticipantDocument = async (data, id) => {
  console.log('data', data);
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/document/update/admin`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-error');
  }
};

participantService.getAllParticipants = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-error');
  }
};

participantService.uploadParticipant = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/document/update/admin`,
      method: 'put',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

participantService.updateParticipantPassword = async (id, newPassword) => {
  const data = {
    id: id,
    password: newPassword
  };
  
  try {
    const res = await fetch({
      url: `${apiRoute}/password/reset`,
      method: 'put',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-error');
  }
};

participantService.getExcelSheet = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/generate-excel/admin?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-error');
  }
};

export default participantService;
