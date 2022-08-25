import fetch from 'auth/FetchInterceptor'

const stateService = {}
const apiRoute = '/user'

stateService.getStates = async function () {
  try {
    const res = await fetch({
      url: `state/get/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

stateService.postState=async function(data){
  console.log(data);
  try {
    const res = await fetch({
      url: `state/create`,
      method: 'post',
      data:data
    })
    console.log(res);
   
    return res.data;
  } catch (err) {
    console.log(err, 'show-err')
  }
}
export default stateService