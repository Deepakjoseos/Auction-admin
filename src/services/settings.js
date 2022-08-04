import fetch from 'auth/FetchInterceptor'

const settingsService = {}
const apiRoute = '/settings'

settingsService.getSettings= async function () {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'get',
    })
    console.log('res-return',res)
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

settingsService.createSettings = async function (data) {
    try {
      const res = await fetch({
        url: `${apiRoute}`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
}
settingsService.editSettings = async function (id, data) {
    try {
      const res = await fetch({
        url: `${apiRoute}`,
        method: 'put',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  export default settingsService