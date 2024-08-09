// Desc: Constants for API calls
// Example:
//authentication
export const LOGIN = "/api/authentication/login";
export const REGISTER = "https://vmo.azurewebsites.net/api/authentication/register";
export const REGISTER_SEND_OTP = "https://vmo.azurewebsites.net/api/authentication/register/send-otp";

//moderator
export const UPDATEISACTIVED = "/api/account/update-status";
export const UPDATEAPPROVEOMREQUEST = "/api/create-organization-manager-request/checking";
export const UPDATEAPPROVECAMPAIGNREQUEST = "/api/create-campaign-request/checking";
export const UPDATEAPPROVEVOLUNTEERREQUEST = "/api/create-volunteer-request/checking";
export const UPDATEAPPROVEORGANIZATIONREQUEST = "/api/create-organization-request/checking";
export const UPDATEAPPROVENEWSREQUEST = "/api/create-post-request/checking";
export const UPDATEAPPROVEACTIVITYREQUEST = "/api/create-activity-request/checking";
export const UPDATEAPPROVESTAGEACTIVITYREQUEST = "/api/create-activity-request/tier-ii/checking";


export const UPDATESTATUSREPORTCAMPAIGN = "/api/campaign/update/report-campaign";
export const CREATEEMAILREPORTCAMPAIGN = "/api/campaign/report-campaign/send-email";



export const UPDATEIMAGEBANKING = "/api/transaction/upload-transaction";


export const CREATEORGANIZATION = "/api/create-organization-request/create-new";
export const CREATECAMPAIGN = "/api/create-campaign-request/create-new";
export const CREATENEWS = "/api/create-post-request/create-new";
export const CREATEACTIVITYOFOM = '/api/create-activity-request/create-new'

export const CREATESTAGEACTIVITYOFOM = '/api/create-activity-request/tier-ii/create-new'
export const CREATESTAGEACTIVITYOFVOLUNTEER = '/api/create-activity-request/tier-ii/create-new'


//
export const VERIFYORGANIZATIONMANAGER = "/api/create-organization-manager-request/tier-ii/create-new";



//Om

export const GETALLORGANIZATIONBYID = "/api/organization/all/filter/organization-manager/";
export const GETALLCAMPAIGNBYOMID = "/api/campaign/create-by/organization-manager/";
export const GETALLNEWSBYOMID = "/api/post/all/organization-manager/";

export const GETOPTIONPROCESSINGPHASEOM = '/api/processing-phase/create-by/organization-manager'
export const GETALLACTIVITIESOM = '/api/activity/create-by/organization-manager/'
export const GETALLPHASE123BYOM = "/api/campaign/create-by/organization-manager/"

export const GETPROCESSINGOMTIERIIACTIVE = '/api/processing-phase/tier-ii/active-status/create-by/organization-manager'
export const GETPROCESSINGVOLUNTEERTIERIIACTIVE = '/api/processing-phase/tier-ii/active-status/create-by/volunteer'
// -----------------

export const GETREQUESTNEWSTOUPDATE = '/api/create-post-request/'
export const GETREQUESTCAMPAIGNTOUPDATE = '/api/create-campaign-request/'
export const GETREQUESTACTIVITYTOUPDATE = '/api/create-activity-request/'
export const GETREQUESTORGANIZATIONTOUPDATE = '/api/create-organization-request/'


export const UPDATECAMPAIGNOM = '/api/create-campaign-request/update/campaign-information'
export const UPDATENEWS = '/api/create-post-request/update/post-information'
export const UPDATEACTIVITY = '/api/create-activity-request/update/activity-information'
export const UPDATEORGANIZATION = '/api/create-organization-request/update/organization-information'

export const UPDATECAMPAIGNVOLUNTEER = '/api/create-campaign-request/update/campaign-information'



// ------------------

//volunteer
export const GETALLACTIVITIESVOLUNTEER = "/api/activity/create-by/volunteer/";
export const GETALLCAMPAIGNBYVOLUNTEERID = "/api/campaign/create-by/volunteer/";
export const GETALLNEWSBYVOLUNTEERID = "/api/post/all/volunteer/";   
export const GETOPTIONPROCESSINGPHASEVOLUNTEER = '/api/processing-phase/create-by/volunteer'

export const GETALLPHASE123BYVOLUNTEER = "/api/campaign/create-by/volunteer/"

export const VERIFYVOLUNTEER = "/api/create-volunteer-request/create-new";



export const PUTPROCESSINGPHASE = "/api/processing-phase/status/update";
export const PUTSTATEMENTPHASE = "/api/statement-phase/status/update";
export const POSTSTATEMENTFILE = "/api/statement-file/upload"

//admin

export const GETALLACCOUNT = "/api/account/all"
export const GETNUMBERACCOUNT = "/api/account/all/active-status"
export const GETALLCAMPAIGN = "/api/campaign/all"
export const GETALLORGANIZATION = "/api/organization/all"
export const GETALLVOLUNTEER = "/api/account/all/role/volunteer"
export const GETALLTRANSACTIONRECENTLY = "/api/transaction/all/recently-transaction"
export const GETALLAMOUNT = "/api/transaction/all/admin/total-amount"


export const CREATEACCOUNTMODERATOR = '/api/account/create-new'


//enable disable

export const ENABLEDISABLEACTIVITY = "/api/activity/update/status"
export const ENABLEDISABLECAMPAIGN = "/api/campaign/update/status"
export const ENABLEDISABLEORGANIZATION = "/api/organization/update/status"
export const ENABLEDISABLEPOST = "/api/post/update/status"



export const EXTENDONATEPHASE = "/api/donate-phase/update/end-date";






export const GETALLTYPECAMPAIGN = "/api/campaign-type/all";
export const GETALLREQUESTCAMPAIGN = "/api/create-campaign-request/all/filter/campaign-name";
export const GETALLREQUESTORGANIZATION = "/api/create-organization-request/all/filter/organization-name";
export const GETALLREQUESTOM = "/api/create-organization-manager-request/all/filter/organization-manager-name";
export const GETALLREQUESTVOLUNTEERS = "/api/create-volunteer-request/all/filter/volunteer-name";
export const GETALLREQUESTACTIVITIES = "/api/create-activity-request/tier-i/all";
export const GETALLREQUESTSTAGEACTIVITIES = "/api/create-activity-request/tier-ii/all";

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
export const GET_NUMBER_OF_ACCOUNT = "https://vmo.azurewebsites.net/api/account/all/number-of-accounts";
export const GET_NUMBER_OF_DONATED_ACCOUNT = "https://vmo.azurewebsites.net/api/account/all/donation/number-of-accounts"; 
export const GET_TOP_DONATOR = "https://vmo.azurewebsites.net/api/account/all/top-5-donations";

//notification
export const GET_NOTIFICATIONS = "https://vmo.azurewebsites.net/api/notification/all/account/";
export const UPDATE_NOTIFICATION_SEEN = "https://vmo.azurewebsites.net/api/notification/checking";

//campaign
export const GET_ALL_CAMPAIGN = "https://vmo.azurewebsites.net/api/campaign/all";
export const GET_CAMPAIGN_ACTIVE_STATUS = "https://vmo.azurewebsites.net/api/campaign/all/filter/active-status";
export const GET_CAMPAIGN_FILTER = "https://vmo.azurewebsites.net/api/campaign/all/filter/campaign-type/active-status";
export const GET_CAMPAIGN_BY_ID = "https://vmo.azurewebsites.net/api/campaign/";
export const GET_NUMBER_OF_ACTIVATED_CAMPAIGN = "https://vmo.azurewebsites.net/api/campaign/all/number-of-campaign";

//campaign-type
export const GET_CAMPAIGN_TYPE = "https://vmo.azurewebsites.net/api/campaign-type/all";

//donate-phase 
export const GET_ALL_AMOUNT_OF_DONATE_PHASE = "https://vmo.azurewebsites.net/api/donate-phase/all/amount";

//post 
export const GET_ALL_POST = "https://vmo.azurewebsites.net/api/post/all";
export const GET_POST_BY_ID = "https://vmo.azurewebsites.net/api/post/";

//transaction
export const GET_TRANSACTION_BY_ACCOUNT_ID = "https://vmo.azurewebsites.net/api/transaction/history-transaction/account/";
export const CREATE_TRANSACTION = "https://vmo.azurewebsites.net/api/transaction/create-transaction";
export const CHECK_TRANSACTION_BY_ORDER_ID = "https://vmo.azurewebsites.net/api/transaction/check-transaction/send-email";
export const GET_ALL_RECENTLY_TRANSACTION = "https://vmo.azurewebsites.net/api/transaction/all/recently-transaction";
export const GET_NUMBER_OF_TRANSACTION = "https://vmo.azurewebsites.net/api/transaction/all/number-of-transactions";

//organization 
export const GET_ORGANIZATION_BY_ID = "https://vmo.azurewebsites.net/api/organization/";
export const GET_NUMBER_OF_ORGANIZATION = "https://vmo.azurewebsites.net/api/organization/all/number-of-organization";