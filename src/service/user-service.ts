import {_common_util, errorFunction, successFunction} from "@/utils/util";
import {user_login_VO} from "@/VO/user-login-VO";


const _user_service = {
    getUserInfo: function (resolve: successFunction, reject: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/user'),
            success : resolve,
            error   : reject
        })
    },
    login: function (userInfo: user_login_VO, resolve: successFunction, reject: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/session'),
            method  : 'POST',
            data    : JSON.stringify(userInfo),
            success : resolve,
            error   : reject
        })
    }
}

export {_user_service}