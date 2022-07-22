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

export default transactionService;
