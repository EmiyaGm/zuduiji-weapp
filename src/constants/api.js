/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST;
export const hostM = HOST;
/* eslint-enable */

// pic
export const CDN = "https://yanxuan.nosdn.127.net";

// home
export const API_HOME = `${host}/xhr/index/index.json`;
export const API_HOME_SEARCH_COUNT = `${host}/xhr/search/displayBar.json`;
export const API_HOME_PIN = `${hostM}/pin/min/item/recommend.json`;
export const API_HOME_RECOMMEND = `${host}/xhr/rcmd/index.json`;

// cate
export const API_CATE = `${host}/xhr/list/category.json`;
export const API_CATE_SUB = `${host}/xhr/list/subCate.json`;
export const API_CATE_SUB_LIST = `${host}/xhr/list/l2Items2.json`;

// cart
export const API_CART = `${host}/xhr/promotionCart/getCarts.json`;
export const API_CART_NUM = `${host}/xhr/promotionCart/getMiniCartNum.json`;
export const API_CART_RECOMMEND = `${host}/xhr/rcmd/cart.json`;
export const API_CART_ADD = `${host}/xhr/promotionCart/add.json`;
export const API_CART_UPDATE = `${host}/xhr/promotionCart/update.json`;
export const API_CART_UPDATE_CHECK = `${host}/xhr/promotionCart/updateCheck.json`;

// user
export const API_USER = `${host}/xhr/user/getDetail.json`;
export const API_USER_LOGIN = `${host}/wx/login`;
export const API_USER_INFO = `${host}/wx/info`;
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`;

// item
export const API_ITEM = `${host}/xhr/item/detail.json`;
export const API_ITEM_RECOMMEND = `${host}/xhr/rcmd/itemDetail.json`;

// business
export const API_BUSINESS_APPLY = `${host}/business/apply`;
export const API_BUSINESS_LIST = `${host}/business/list`;
export const API_BUSINESS_REVIEW = `${host}/business/review`;
export const API_BUSINESS_STATUS = `${host}/business/status`;

// activity
export const API_ACTIVITY_UPLOAD = `${host}/activity/upload`;
export const API_ACTIVITY_ADD = `${host}/activity/add`;
export const API_MY_ACTIVITY = `${host}/activity/makeList`;
export const API_ACTIVITY_MAKELISTACTIVITY = `${host}/activity/makeListActivity`;
export const API_ACTIVITY_DETIL = `${host}/activity/details`;
export const API_ACTIVITY_ORDER = `${host}/activity/order`;
export const API_ACTIVITY_NOTICE = `${host}/activity/notice`;
export const API_ACTIVITY_ORDERLIST = `${host}/activity/orderList`;
export const API_ACTIVITY_ORDERDETAIL = `${host}/activity/orderDetails`;
export const API_ACTIVITY_ADMIMACTIVITYLIST = `${host}/activity/adminActivityList`;
export const API_ACTIVITY_ADMINREVIEWACTIVITY = `${host}/activity/adminReviewActivity`;
export const API_ACTIVITY_LUCKORDERLIST = `${host}/activity/luckOrderList`;
export const API_ACTIVITY_USERACTIVITYLIST = `${host}/activity/userActivityList`;
export const API_ACTIVITY_CANCELORDER = `${host}/activity/cancelOrder`;
export const API_ACTIVITY_SETLUCKNUMS = `${host}/activity/setLuckNums`;
export const API_ACTIVITY_LOGISTICS = `${host}/activity/logistics`;
// account
export const API_ACCOUNT_ACCOUNTS = `${host}/account/accounts`;
export const API_ACCOUNT_SETADMIN = `${host}/account/setAdmin`;
export const API_ACCOUNT_SETBUSINESS = `${host}/account/setBusiness`;
export const API_ACCOUNT_SYNC = `${host}/account/sync`;
export const API_ACCOUNT_PHONE = `${host}/account/phone`;
export const API_ACCOUNT_SYNCSESSION = `${host}/account/syncSession`

// address
export const API_ADDRESS_LIST = `${host}/address/list`;
export const API_ADDRESS_ADDRESS = `${host}/address/address`;
export const API_ADDRESS_DELETE = `${host}/address/delete`;

// wallet
export const API_WALLET_REVIEW = `${host}/wallet/review`;
export const API_WALLET_LIST = `${host}/wallet/list`;
export const API_WALLET_BALANCE = `${host}/wallet/balance`;
export const API_WALLET_APPLY = `${host}/wallet/apply`;
export const API_WALLET_BANK = `${host}/wallet/bank`;
export const API_WALLET_BANKBIND = `${host}/wallet/bankBind`;
export const API_WALLET_BANKBINDCONFIRM = `${host}/wallet/bankBindConfirm`;
export const API_WALLET_UNBANKBIND = `${host}/wallet/unBankBind`;
