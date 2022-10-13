import fetch from 'auth/FetchInterceptor'

const watchlistService = {}
const apiRoute = '/watch_list'

watchlistService.getWatchlist = async function () {
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


export default watchlistService
