import fetch from 'auth/FetchInterceptor'

const clientService = {}
const api = '/client'

clientService.getClients = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
clientService.getClientById = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}/admin`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

clientService.createClient = async function (data) {
  try {
    const res = await fetch({
      url: `${api}/create`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

clientService.editClient = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/${id}/update/admin`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
export default clientService
