import fetch from 'auth/FetchInterceptor'

const FuelTypeService = {}
const apiRoute = '/fuelType'

FuelTypeService.addFuelType = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/add`,
      method: 'post',
      data
    })
  return res.data;
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default FuelTypeService;