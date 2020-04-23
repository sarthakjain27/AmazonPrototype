import {
  GETPROFILE,
  UPDATEPROFILE,
  UPDATEPROFILEPIC,
  ADDADDRESS,
  DELETEADDRESS,
  GETADDRESS,
  GETPAYMENT,
  ADDORUPDATEPAYMENT,
  DELETEPAYMENT
} from "../action/customerprofileaction/actionType";

const initialState = {
  profiledata: {},
  paymentSelectModal: "none"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETPROFILE:
      return {
        ...state,
        profiledata: action.payload
      };
    case UPDATEPROFILE:
      console.log(state);
      return {
        ...state,
        profiledata: {
          ...state.profiledata,
          data: {
            ...state.profiledata.data,
            mainCustomer: {
              ...state.profiledata.data.mainCustomer,
              name: action.payload.data.name,
              city: action.payload.data.city,
              state: action.payload.data.state
            }
          }
        }
      };
    case UPDATEPROFILEPIC:
      return {
        ...state,
        profiledata: {
          ...state.profiledata,
          data: {
            ...state.profiledata.data,
            mainCustomer: {
              ...state.profiledata.data.mainCustomer,
              profilePictureUrl: action.payload.profilePictureUrl
            }
          }
        }
      };
    case GETADDRESS:
      return {
        ...state,
        addressArray: action.payload
      };
    case ADDADDRESS:
      return {
        ...state,
        addressArray: action.payload,
        msgSuccess: "Address added/edited successfully"
      };

    case DELETEADDRESS:
      return {
        ...state,
        addressArray: action.payload
      };
    case GETPAYMENT:
      return {
        ...state,
        paymentArr: action.payload
      };
    case ADDORUPDATEPAYMENT:
      return {
        ...state,
        paymentArr: action.payload,
        msgSuccess: "Card added/edited successfully"
      };
    case DELETEPAYMENT:
      return {
        ...state,
        paymentArr: action.payload
      };
    case "SENDMODALSTATUS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
