import {_common_util, errorFunction, successFunction} from "@/utils/util";


const _user_service = {
    getUserInfo: function (resolve: successFunction, reject: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/user'),
            success : resolve,
            error   : reject
        })
    }
}

export {_user_service}