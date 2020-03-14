function getUserInfo() {
    return uni.getStorageSync('userinfo');
}
function storeUserInfo(userinfo) {
    uni.setStorageSync('userinfo', userinfo);
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
    isLogin
}
