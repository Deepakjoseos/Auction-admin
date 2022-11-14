import fetch from 'auth/FetchInterceptor';

const walletTransactionService = {};
const apiRoute = '/wallet_transaction';

walletTransactionService.getTransactions = async function (query) {
  try {
    let url = `${apiRoute}/get/all/admin?${query}`;

    const res = await fetch({
      url,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default walletTransactionService;
