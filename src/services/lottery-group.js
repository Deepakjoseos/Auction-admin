import fetch from 'auth/FetchInterceptor'
const lotteryGroupService = {}
const api = '/lottery_group'
lotteryGroupService.getLotteryGroups = async function () {
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
  lotteryGroupService.getLotteryGroupById = async function (id) {
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
  lotteryGroupService.createLotteryGroup = async function (data) {
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
  lotteryGroupService.editLotteryGroup = async function (id, data) {
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
    
export default lotteryGroupService