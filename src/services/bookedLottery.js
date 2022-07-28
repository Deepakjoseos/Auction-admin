import fetch from 'auth/FetchInterceptor'
const bookedLotteryService = {}
const api = '/booked_lottery'
bookedLotteryService.getBookedLotteries = async function (query) {
  try {
    let url = `${api}/all/admin`
    const bookingNumber = query?.bookingNumber
    if (bookingNumber) url = `${url}?bookingNumber=${bookingNumber}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default bookedLotteryService
