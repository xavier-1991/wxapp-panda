
//const HOST = "10.10.10.15:8082/";
const HOST = "parentmptest.chinayzyx.com/";
const HTTPS = "http://";
const URL_API_BASE = HTTPS.concat(HOST);
var urls = {
    TOKEN: 'api/parent/loginCheck',
    TOKEN_NEXT: 'api/parent/silentLogin',
    GET_SMS_CODE: 'api/parent/getLoginSmsCode',
    GET_COURSE_INFO: 'api/parent/getCourseInfo',
    GET_CLEAR_COURSE_INFO: 'api/parent/getClearCourseInfo',
    GET_TIME_TABLE: 'api/parent/getClassSchedule',
    GET_NOTICE: 'api/parent/getNotices',
    CHECK_MSG: 'api/parent/checkNotice',
    SAVE_FORMID: 'api/parent/collectFormIds',
};



urls.HTTPS = HTTPS;
urls.HOST = HOST;
urls.URL_API_BASE=URL_API_BASE;


module.exports = urls;
