import fetch from 'auth/FetchInterceptor'

const constantsService = {}

constantsService.getConstantsRole = async function () {
  try {
    const res = await fetch({
      url: '/constants/role',
      method: 'get',
    })

    // For coverting array
    const reciviedData = Object.values(res.data).map((val) => val)

    return reciviedData
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default constantsService
