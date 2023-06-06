import './nav-top.css'
import {_common_util} from "@/utils/util"
import {_user_service} from "@/service/user-service";

const _nav_top = {
    init: function (this: any) {
        this.bindEvents()
        this.loadUserInfo()
        this.loadCartCount()
        return this
    },
    bindEvents: () => $('.js-login').on('click', () => _common_util.toLogin()),
    loadUserInfo: () =>
        _user_service.getUserInfo(
            (data) => {
                console.log(data)
                $('.not-login').hide()
                    .siblings('.login').show()
                    .find('.username').text((<any>data).username)
            },
            (message, code) => {
                console.log(message)
            }
        ),
    loadCartCount: () => {},
}.init()

export {_nav_top}