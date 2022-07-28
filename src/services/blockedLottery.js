import fetch from 'auth/FetchInterceptor'
const blockedLotteryService = {}
const api = '/blocked_lottery'
blockedLotteryService.getBlockedLotteries = async function (query) {
  try {
    let url = `${api}/get/all/admin`
    // const lotteryNumber= query.lotteryNumber;
    const lotteryId = query?.lotteryId
    const lotteryTypeId = query?.lotteryTypeId
    // if (lotteryNumber) url = `${url}?lotteryNumber=${lotteryId}`;
    if (lotteryId) url = `${url}?lotteryId=${lotteryId}`
    if (lotteryTypeId)
      url = lotteryId
        ? `${url}&lotteryTypeId=${lotteryTypeId}`
        : `${url}?lotteryTypeId=${lotteryTypeId}`

    const res = await fetch({
      url,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

blockedLotteryService.getBlockedLottery = async function (id) {
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

export default blockedLotteryService
