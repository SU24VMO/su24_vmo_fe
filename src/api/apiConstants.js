// Desc: Constants for API calls
// Example:
//authentication
export const LOGIN = "/api/authentication/login";
export const REGISTER = "/api/authentication/register";

//
export const UPDATEISACTIVED = "/api/account/update-information";
export const UPDATEAPPROVEOMREQUEST = "/api/create-organization-manager-request/checking";
export const UPDATEAPPROVECAMPAIGNREQUEST = "/api/create-campaign-request/checking";
export const UPDATEAPPROVEMEMBERREQUEST = "/api/create-member-request/checking";
export const UPDATEAPPROVEORGANIZATIONREQUEST = "/api/create-organization-request/checking";
export const UPDATEAPPROVENEWSREQUEST = "/api/create-post-request/checking";

export const CREATEORGANIZATION = "/api/create-organization-request/create-new";
export const CREATECAMPAIGN = "/api/create-campaign-request/create-new";
export const CREATENEWS = "/api/create-post-request/create-new";
export const CREATEACTIVITYOFOM = '/api/create-activity-request/create-new'

//
export const VERIFYORGANIZATIONMANAGER = "/api/create-organization-manager-request/create-new";





export const GETALLORGANIZATIONBYID = "/api/organization/all/filter/organization-manager/";
export const GETALLCAMPAIGNBYOMID = "/api/campaign/create-by/organization-manager/";
export const GETALLNEWSBYOMID = "/api/post/all/organization-manager/";

export const GETOPTIONPROCESSINGPHASEOM = '/api/processing-phase/create-by/organization-manager'
export const GETALLACTIVITIESOM = '/api/activity/create-by/organization-manager/'


export const GETALLTYPECAMPAIGN = "/api/campaign-type/all";
export const GETALLREQUESTCAMPAIGN = "/api/create-campaign-request/all";
export const GETALLREQUESTORGANIZATION = "/api/create-organization-request/all";
export const GETALLREQUESTOM = "/api/create-organization-manager-request/all";
export const GETALLREQUESTMEMBER = "/api/create-member-request/all";
export const GETALLREQUESTACTIVITIES = "/api/create-activity-request/all";
export const GETALLREQUESTNEWS = "/api/create-post-request/all";











//user
export const GET_ACCOUNT_BY_ID = "https://vmo.azurewebsites.net/api/account/";
export const UPDATE_AVATAR ="https://vmo.azurewebsites.net/api/account/update-information/avatar";
export const UPDATE_INFORMATION = "https://vmo.azurewebsites.net/api/account/update-information";
export const CHECK_CURRENT_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/check-password";
export const RESET_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/reset-password";

//notification
export const GET_NOTIFICATIONS = "https://vmo.azurewebsites.net/api/notification/all/account/";
export const UPDATE_NOTIFICATION_SEEN = "https://vmo.azurewebsites.net/api/notification/checking";

//campaign
export const GET_ALL_CAMPAIGN = "https://vmo.azurewebsites.net/api/campaign/all";
export const GET_CAMPAIGN_ACTIVE_STATUS = "https://vmo.azurewebsites.net/api/campaign/all/filter/active-status";
export const GET_CAMPAIGN_FILTER = "https://vmo.azurewebsites.net/api/campaign/all/filter/campaign-type/active-status";

//campaign-type
export const GET_CAMPAIGN_TYPE = "https://vmo.azurewebsites.net/api/campaign-type/all";

//post 
export const GET_ALL_POST = "https://vmo.azurewebsites.net/api/post/all";