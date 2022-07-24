import fetch from "auth/FetchInterceptor";
const accountService = {};
const api = "/account";
accountService.getAccounts = async function (query) {
  try {
    const date = new Date();
    const startTimestamp = query?.startTimestamp || date.getTime().toString();
    const endTimestamp = query?.endTimestamp || date.getTime().toString();
    const agentId = query?.agentId;
    let url = `${api}/summaries/admin?startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`;
    if (agentId) url = `${url}&agentId=${agentId}`;
    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

export default accountService;
