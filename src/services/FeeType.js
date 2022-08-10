import fetch from 'auth/FetchInterceptor'

const feeTypeService = {}
const apiRoute = '/fee_type'

feeTypeService.getFeeTypes = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
      method: 'get',
    })
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
//Delete
// feeTypeService.deleteInformation = async function (id) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'delete',
//     })
//     //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

feeTypeService.getFeeTypeById= async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

feeTypeService.createFeeType = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create/admin`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

feeTypeService.editFeeType = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default feeTypeService
