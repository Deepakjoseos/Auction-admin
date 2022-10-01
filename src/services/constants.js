import fetch from "auth/FetchInterceptor";

const constantsService = {};

constantsService.getConstantsRole = async function () {
  try {
    const res = await fetch({
      url: "/constants/role",
      method: "get",
    });

    // For coverting array
    const reciviedData = Object.values(res.data).map((val) => val);

    return reciviedData;
  } catch (err) {
    console.log(err, "show-err");
  }
};

constantsService.getRegistrationConstant = async function () {
  try {
    const res = await fetch({
      url: "/constants/registration",
      method: "get",
    });
    const paymentModes = Object.values(res.data.PaymentMode).map((val) => val);
    const paymentStatus = Object.values(res.data.PaymentStatus).map(
      (val) => val
    );
    return { paymentModes, paymentStatus };
  } catch (err) {
    console.log(err, "show-err");
  }
};
constantsService.getTemplates = async function () {
  try {
    const res = await fetch({
      url: "/constants/template",
      method: "get",
    });

    // For coverting array
     const listingTypes = Object.values(res.data.ListingType).map((val) => val);
    

    // return res.data.ListingType;
    return listingTypes
  } catch (err) {
    console.log(err, "show-err");
  }
};
export default constantsService;
