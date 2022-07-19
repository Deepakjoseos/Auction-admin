import fetch from 'auth/FetchInterceptor'

const authAdminService = {}

authAdminService.getProfile = async function () {
  try {
    const res = await fetch({
      url: '/admin/profile',
      method: 'get',
    })

    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

authAdminService.login = async function (data) {
  try {
    const res = await fetch({
      url: '/auth/login',
      method: 'post',
      data,
    })

    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default authAdminService
