// Desc: Constants for API calls
// Example:
//authentication
export const LOGIN = "/api/authentication/login";
export const REGISTER = "/api/authentication/register";

//
export const UPDATEISACTIVED = "/api/account/update-information";
export const CREATEORGANIZATION = "/api/create-organization-request/create-new";
export const CREATECAMPAIGN = "/api/create-campaign-request/create";
//
export const VERIFYORGANIZATIONMANAGER = "/api/create-organization-manager-request/create-new";
export const GETALLORGANIZATIONBYID = "/api/organization/all/filter/organization-manager/";
export const GETALLCAMPAIGNBYOMID = "/api/campaign/create-by/organization-manager/";
export const GETALLTYPECAMPAIGN = "/api/campaign-type/all";






//user
export const GET_ACCOUNT_BY_ID = "https://vmo.azurewebsites.net/api/account/";
export const UPDATE_AVATAR ="https://vmo.azurewebsites.net/api/account/update-information/avatar";
export const UPDATE_INFORMATION = "https://vmo.azurewebsites.net/api/account/update-information";
export const CHECK_CURRENT_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/check-password";
export const RESET_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/reset-password";

//notification
export const GET_NOTIFICATIONS = "https://vmo.azurewebsites.net/api/notification/all/account/";
export const UPDATE_NOTIFICATION_SEEN = "https://vmo.azurewebsites.net/api/notification/checking";