import fetch from 'auth/FetchInterceptor';

const auctionInventoryService = {};
const apiRoute = '/auction_inventory';

auctionInventoryService.uploadInventory = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/upload/${id}`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.getInventories = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/admin?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.getInventory = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.updateauction = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/image/asFile`,
      method: 'PUT',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.updateAuctionInventory = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'PUT',
      data: data
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.updateAuctionInventoryImages = async function (
  id,
  data
) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/images/asFile`,
      method: 'put',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.getInventoryImages = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/admin`,
      method: 'get'
    });
    return res.data?.images;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

auctionInventoryService.getSellerInventories = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/get/all/seller?${query}`,
      method: 'get'
    });
    return res.data;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

export default auctionInventoryService;
