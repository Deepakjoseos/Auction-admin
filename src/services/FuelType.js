import fetch from 'auth/FetchInterceptor'

const FuelTypeService = {}
const apiRoute = '/fuelType'

FuelTypeService.addFuelType = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/add`,
      method: 'post',
      data
    })
  return res.data;
  } catch (err) {
    console.log(err, 'show-err')
  }
}
FuelTypeService.getFuelTypes=async function(){
  try {
    const res=await fetch({
      url:`${apiRoute}/get/all/admin`,
      method:'get'
    })
    const activeData=res.data.filter((cur) => cur.status !== 'Deleted');
    return activeData;
  } catch (error) {
    console.log(error,"err");
  }
}
FuelTypeService.getFuelTypeById=async function(id){
  try {
    const res=await fetch({
      url:`${apiRoute}/${id}/admin`,
      method:'get'
    })

    return res.data;
  } catch (error) {
    console.log(error,"err");
  }
}
FuelTypeService.editFuelType=async function({id,data}){
  try {
    const res=await fetch({
      url:`${apiRoute}/${id}`,
      method:'put',
      data
    })
    return res.data;
  } catch (error) {
    console.log(error,'err');
  }
}
FuelTypeService.removeFuelType=async function(id){
  try {
    const res=await fetch({
      url:`${apiRoute}/${id}`,
      method:'delete'
    });
    return res.data;
  } catch (error) {
    console.log(error,'err');
  }
}
export default FuelTypeService;