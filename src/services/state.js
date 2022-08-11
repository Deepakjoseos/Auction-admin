import fetch from 'auth/FetchInterceptor'

const stateService = {}
const apiRoute = '/user'

stateService.getStates = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/states`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
export default stateService