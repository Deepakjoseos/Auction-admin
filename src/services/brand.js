import fetch from 'auth/FetchInterceptor'

const brandService = {}

brandService.getBrands = async function () {
  try {
    const res = await fetch({
      url: '/brands',
      method: 'get',
    })
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

brandService.deleteBrand = async function (id) {
  try {
    const res = await fetch({
      url: `/brands/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

brandService.getBrandById = async function (id) {
  try {
    const res = await fetch({
      url: `/brands/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

brandService.createBrand = async function (data) {
  try {
    const res = await fetch({
      url: `/brands`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

brandService.editBrand = async function (id, data) {
  try {
    const res = await fetch({
      url: `/brands/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// brandService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default brandService
