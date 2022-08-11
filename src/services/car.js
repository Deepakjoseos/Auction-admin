import fetch from 'auth/FetchInterceptor'

const carService = {}
const apiRoute = '/car'

carService.getCars = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

carService.deleteCar = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

carService.getCarById = async function (id) {
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

carService.createCar = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
//edit car
// carService.editCar = async function (id, data) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'put',
//       data: data,
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// carService.createCarVariant = async function (carId, data) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/variant/${carId}`,
//       method: 'post',
//       data: data,
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// carService.updateCarVariant = async function (carId, carVariantId, data) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/variant/${carId}/${carVariantId}`,
//       method: 'put',
//       data: data,
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// carService.deleteCarVariant = async function (carId, carVariantId) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/variant/${carId}/${carVariantId}`,
//       method: 'delete',
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

export default carService
