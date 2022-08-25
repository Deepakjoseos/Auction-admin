import fetch from 'auth/FetchInterceptor'

const cityService = {}
const apiRoute = '/user'

cityService.getCities = async function () {
  try {
    const res = await fetch({
      url: `city/get/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

cityService.postCity=async function(data){
  console.log(data);
  try {
    const res = await fetch({
      url: `city/create`,
      method: 'post',
      data:data
    })
    console.log(res);
   
    return res.data;
  } catch (err) {
    console.log(err, 'show-err')
  }
}
cityService.getCityById=async function(id){
  try {
    const res=await fetch({
      url:`city/${id}`,
      method:'get'
    })
    return res.data;
  } catch (error) {
    console.log(error,'err')
  }
}

cityService.editCity=async function({id,data}){
try {
  const res=await fetch({
    url:`city/${id}/update/admin`,
    method:'put',
    data
  })
  return res.data;
} catch (error) {
  console.log(error,'err');
}
}
export default cityService