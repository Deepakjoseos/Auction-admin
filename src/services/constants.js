import fetch from 'auth/FetchInterceptor';

const constantsService = {};

constantsService.getConstantsRole = async function () {
  try {
    const res = await fetch({
      url: '/constants/role',
      method: 'get'
    });

    // For coverting array
    const reciviedData = Object.values(res.data).map((val) => val);

    return reciviedData;
  } catch (err) {
    console.log(err, 'show-err');
  }
};

constantsService.getRegistrationConstant = async function () {
  try {
    const res = await fetch({
      url: '/constants/registration',
      method: 'get'
    });
    const paymentModes = Object.values(res.data.PaymentMode).map((val) => val);
    const FeeType = Object.values(res.data.FeeType).map((val) => val);
    
    const paymentStatus = Object.values(res.data.PaymentStatus).map(
      (val) => val
    );
    return { paymentModes, paymentStatus,FeeType };
  } catch (err) {
    console.log(err, 'show-err');
  }
};
constantsService.getTemplates = async function () {
  try {
    const res = await fetch({
      url: '/constants/template',
      method: 'get'
    });

    // For coverting array
    const listingTypes = Object.values(res.data.ListingType).map((val) => val);

    // return res.data.ListingType;
    return listingTypes;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
constantsService.getParticipant = async function () {
  try {
    const res = await fetch({
      url: '/constants/participant',
      method: 'get'
    });

    // For coverting array
    const ParticipantType = Object.values(res.data.ParticipantType).map(
      (val) => val
    );
    const BuyerType = Object.values(res.data.BuyerType).map((val) => val);
    const UserType = Object.values(res.data.UserType).map((val) => val);
    const BuyerEligibleBuisness = Object.values(
      res.data.BuyerEligibleBuisness
    ).map((val) => val);

    // return res.data.ListingType;
    return { ParticipantType, BuyerType, UserType, BuyerEligibleBuisness };
  } catch (err) {
    console.log(err, 'show-err');
  }
};

constantsService.getAuction = async function () {
  try {
    const res = await fetch({
      url: '/constants/auction',
      method: 'get'
    });

    // For coverting array
    const InsuranceType = Object.values(res.data.InsuranceType).map(
      (val) => val
    );
    return {InsuranceType};
  } catch (err) {
    console.log(err, 'show-err');
  }
};







constantsService.getFeeTypes = async function () {
  try {
    const res = await fetch({
      url: `/constants/registration`,
      method: 'get'
    });
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res.data.FeeType;
  } catch (err) {
    console.log(err, 'show-err');
  }
};
export default constantsService;
