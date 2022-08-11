import fetch from 'auth/FetchInterceptor'

const roleService = {}
const apiRoute = '/role'

roleService.getRoles = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

roleService.deleteRole = async function (id) {
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



roleService.createRole = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/create?module=${data.module}`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}



export default roleService
