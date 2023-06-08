import './nav-top.css'
import {_common_util} from "@/utils/util"
import {_user_service} from "@/service/user-service";

const _nav_top = {
    init: function (this: any) {
        this.bindEvents()
        this.loadUserInfo()
        return this
    },
    bindEvents: () => {
        $('.js-login').on('click', () => _common_util.toLogin())
        $('.js-logout').click(() => _nav_top.userLogout())
    },
    loadUserInfo: () =>
        _user_service.getUserInfo(
            (data) => {
                console.log(data)
                _nav_top.loadCartCount()
                $('.not-login').hide()
                    .siblings('.login').show()
                    .find('.username').text((<any>data).username)

            },
            (message, code) => {
                console.log(message)
            }
        ),
    loadCartCount: () => {
        _user_service.getCartCount(
            (data) => {
                $('.cart-count').text(<string>data)
            }
        )
    },
    userLogout: () => {
        _user_service.logout(
            (data) => {
                _common_util.toIndex()
            }
        )
    }
}.init()

export {_nav_top}