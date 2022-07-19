import fetch from 'auth/FetchInterceptor'

const lotteryService = {}
const api = '/lottery'

lotteryService.getLotteries = async function () {
  try {
    const res = await fetch({
      url: `${api}/get/all/admin`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

lotteryService.deleteLottery = async function (id) {
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

lotteryService.getLotteryById = async function (id) {
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

lotteryService.createLottery = async function (data) {
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

lotteryService.editLottery = async function (id, data) {
  try {
    const res = await fetch({
      url: `${api}/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default lotteryService
