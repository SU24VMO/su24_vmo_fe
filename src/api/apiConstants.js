// Desc: Constants for API calls
// Example:
//authentication
export const LOGIN = "/api/authentication/login";
export const REGISTER = "/api/authentication/register";

//
export const UPDATEISACTIVED = "/api/account/update-status";
export const UPDATEAPPROVEOMREQUEST = "/api/create-organization-manager-request/checking";
export const UPDATEAPPROVECAMPAIGNREQUEST = "/api/create-campaign-request/checking";
export const UPDATEAPPROVEVOLUNTEERREQUEST = "/api/create-volunteer-request/checking";
export const UPDATEAPPROVEORGANIZATIONREQUEST = "/api/create-organization-request/checking";
export const UPDATEAPPROVENEWSREQUEST = "/api/create-post-request/checking";
export const UPDATEAPPROVEACTIVITYREQUEST = "/api/create-activity-request/checking";


export const CREATEORGANIZATION = "/api/create-organization-request/create-new";
export const CREATECAMPAIGN = "/api/create-campaign-request/create-new";
export const CREATENEWS = "/api/create-post-request/create-new";
export const CREATEACTIVITYOFOM = '/api/create-activity-request/create-new'

//
export const VERIFYORGANIZATIONMANAGER = "/api/create-organization-manager-request/create-new";



//Om

export const GETALLORGANIZATIONBYID = "/api/organization/all/filter/organization-manager/";
export const GETALLCAMPAIGNBYOMID = "/api/campaign/create-by/organization-manager/";
export const GETALLNEWSBYOMID = "/api/post/all/organization-manager/";

export const GETOPTIONPROCESSINGPHASEOM = '/api/processing-phase/create-by/organization-manager'
export const GETALLACTIVITIESOM = '/api/activity/create-by/organization-manager/'
export const GETALLPHASE123BYOM = "/api/campaign/create-by/organization-manager/"


//volunteer
export const GETALLACTIVITIESVOLUNTEER = "/api/activity/create-by/volunteer/";
export const GETALLCAMPAIGNBYVOLUNTEERID = "/api/campaign/create-by/volunteer/";
export const GETALLNEWSBYVOLUNTEERID = "/api/post/all/volunteer/";   
export const GETOPTIONPROCESSINGPHASEVOLUNTEER = '/api/processing-phase/create-by/volunteer'

export const GETALLPHASE123BYVOLUNTEER = "/api/campaign/create-by/volunteer/"

export const VERIFYVOLUNTEER = "/api/create-volunteer-request/create-new";



export const PUTPROCESSINGPHASE = "/api/processing-phase/status/update";
export const PUTSTATEMENTPHASE = "/api/statement-phase/status/update";








export const GETALLTYPECAMPAIGN = "/api/campaign-type/all";
export const GETALLREQUESTCAMPAIGN = "/api/create-campaign-request/all/filter/campaign-name";
export const GETALLREQUESTORGANIZATION = "/api/create-organization-request/all/filter/organization-name";
export const GETALLREQUESTOM = "/api/create-organization-manager-request/all/filter/organization-manager-name";
export const GETALLREQUESTVOLUNTEERS = "/api/create-volunteer-request/all/filter/volunteer-name";
export const GETALLREQUESTACTIVITIES = "/api/create-activity-request/all/filter/activity-name";
export const GETALLREQUESTNEWS = "/api/create-post-request/all/filter/post-title";

export const GETALLACCOUNTSMEMBER = "/api/account/all/role/member"
export const GETALLACCOUNTSVOLUNTEER = "/api/account/all/role/volunteer"
export const GETALLACCOUNTSOM = "/api/account/all/role/organization-manager"
export const GETALLACCOUNTSMODERATOR = "/api/account/all/role/moderator"













//user
export const GET_ACCOUNT_BY_ID = "https://vmo.azurewebsites.net/api/account/";
export const UPDATE_AVATAR ="https://vmo.azurewebsites.net/api/account/update-information/avatar";
export const UPDATE_INFORMATION = "https://vmo.azurewebsites.net/api/account/update-information";
export const CHECK_CURRENT_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/check-password";
export const RESET_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/reset-password";
export const FORGOT_PASSWORD_GET_OTP = "https://vmo.azurewebsites.net/api/authentication/forgot-password";
export const FORGOT_PASSWORD_RESET_PASSWORD = "https://vmo.azurewebsites.net/api/authentication/forgot-password/reset-password";


//notification
export const GET_NOTIFICATIONS = "https://vmo.azurewebsites.net/api/notification/all/account/";
export const UPDATE_NOTIFICATION_SEEN = "https://vmo.azurewebsites.net/api/notification/checking";

//campaign
export const GET_ALL_CAMPAIGN = "https://vmo.azurewebsites.net/api/campaign/all";
export const GET_CAMPAIGN_ACTIVE_STATUS = "https://vmo.azurewebsites.net/api/campaign/all/filter/active-status";
export const GET_CAMPAIGN_FILTER = "https://vmo.azurewebsites.net/api/campaign/all/filter/campaign-type/active-status";
export const GET_CAMPAIGN_BY_ID = "https://vmo.azurewebsites.net/api/campaign/";

//campaign-type
export const GET_CAMPAIGN_TYPE = "https://vmo.azurewebsites.net/api/campaign-type/all";

//post 
export const GET_ALL_POST = "https://vmo.azurewebsites.net/api/post/all";
export const GET_POST_BY_ID = "https://vmo.azurewebsites.net/api/post/";

//transaction
export const GET_TRANSACTION_BY_ACCOUNT_ID = "https://vmo.azurewebsites.net/api/transaction/history-transaction/account/";
export const CREATE_TRANSACTION = "https://vmo.azurewebsites.net/api/transaction/create-transaction";
export const CHECK_TRANSACTION_BY_ORDER_ID = "https://vmo.azurewebsites.net/api/transaction/check-transaction/send-email";
export const GET_ALL_RECENTLY_TRANSACTION = "https://vmo.azurewebsites.net/api/transaction/all/recently-transaction";

//organization 
export const GET_ORGANIZATION_BY_ID = "https://vmo.azurewebsites.net/api/organization/";