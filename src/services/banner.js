import fetch from 'auth/FetchInterceptor'

const bannerService = {}
const api = '/banner'

bannerService.getBanners = async function (query ='') {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin?${query}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
bannerService.getBannerById = async function (id) {
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
bannerService.deleteBanner = async function (id) {
    try {
      const res = await fetch({
        url: `${api}/${id}`,
        method: 'delete',
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  bannerService.createBanner = async function (data) {
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
  bannerService.editBanner = async function (id, data) {
    try {
      const res = await fetch({
        url: `${api}/${id}?title=${data.title}&imageURL=${data.imageURL}&url=${data.url}&priority=${data.priority}&status=${data.status}`,
        method: 'put',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  export default bannerService