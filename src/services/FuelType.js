import fetch from 'auth/FetchInterceptor'

const FuelTypeService = {}
const apiRoute = '/user'

FuelTypeService.addFuelType = async function () {
  try {
    const res = await fetch({
      url: `city/get/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default FuelTypeService;