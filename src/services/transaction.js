import fetch from "auth/FetchInterceptor";
const transactionService = {};
const api = "/transaction";
transactionService.getTransaction = async function (query) {
  try {
    let url = `${api}/all/admin`;

    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }


};
transactionService.createTransaction = async function (data){
  try {
    const res = await fetch({
      url: `${api}/create?senderId=${data.senderId}&amount=${data.amount}&type=${data.type}`,
      method: 'post',
      // data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default transactionService;
