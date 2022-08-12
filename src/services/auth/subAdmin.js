import fetch from 'auth/FetchInterceptor'

const authSubAdminService = {}
const api = '/sub_admin'
authSubAdminService.getProfile = async function () {
  try {
    const res = await fetch({
      url: `${api}/profile/get`,
      method: 'get',
    })
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default authSubAdminService
