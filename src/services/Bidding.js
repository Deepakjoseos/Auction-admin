import fetch from 'auth/FetchInterceptor';

const biddingService = {};
const api = '/bidding';

biddingService.getBiddings = async function (query = '') {
  try {
    let url = `${api}/get/all/admin?${query}`;
    // const auctionId = query?.auctionId;
    // const auctionInventoryId = query?.auctionInventoryId;
    // const bidderId = query?.bidderId;
    // if (auctionId) url = `${url}&auctionId=${auctionId}`;
    // if (auctionInventoryId)
    //   url = `${url}&auctionInventoryId=${auctionInventoryId}`;
    // if (bidderId) url = `${url}&bidderId=${bidderId}`;

    const res = await fetch({
      url,
      method: 'get'
    });
    //   try {
    //     const res = await fetch({
    //       url: `${api}/get/all/admin`,
    //       method: 'get',
    //     })
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
biddingService.getBiddingById = async function (id) {
  try {
    const res = await fetch({
      url: `${api}/${id}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

biddingService.getSellerBidding = async function (query = '') {
  try {
    const res = await fetch({
      url: `${api}/get/all/seller?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default biddingService;
