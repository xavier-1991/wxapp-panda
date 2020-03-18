function getUserInfo() {
    return uni.getStorageSync('userinfo');
}
function storeUserInfo(userinfo) {
    uni.setStorageSync('userinfo', userinfo);
}
function getLoginInfo() {
    return uni.getStorageSync('logininfo');
}
function storeLoginInfo(logininfo) {
    console.log(logininfo);
    uni.setStorageSync('logininfo', logininfo);
}
function isLogin() {
    let userInfo = getUserInfo();
    if (userInfo && userInfo.token) {
        return true;
    }
    return false;
}
module.exports={
    getUserInfo,
    storeUserInfo,
    getLoginInfo,
    storeLoginInfo,
    isLogin
}
