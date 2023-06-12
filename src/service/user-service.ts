import {_common_util, errorFunction, successFunction} from "@/utils/util";
import {user_login_DTO} from "@/DTO/user-login-DTO";


const _user_service = {
    getUserInfo: function (resolve: successFunction, reject?: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/user'),
            success : resolve,
            error   : reject
        })
    },
    login: function (userInfo: user_login_DTO, resolve: successFunction, reject?: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/session'),
            method  : 'POST',
            data    : JSON.stringify(userInfo),
            success : resolve,
            error   : reject
        })
    },
    logout: function (resolve: successFunction, reject?: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/session'),
            method  : 'DELETE',
            success : resolve,
            error   : reject
        })
    },
    getCartCount: function (resolve: successFunction, reject?: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/cart/number'),
            success : resolve,
            error   : reject
        })
    }
}

export {_user_service}