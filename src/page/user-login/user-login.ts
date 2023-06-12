import './user-login.css'
import '@/page/common/nav-top-simple/nav-top-simple'
import {common_result} from "@/utils/common-result";
import {_common_util} from "@/utils/util";
import {user_login_DTO} from "@/DTO/user-login-DTO";
import {_user_service} from "@/service/user-service";


const errorItem = {
    show: function (errorMsg: string) {
        $('.user-form-error').show().find('.error-message').text(errorMsg)
    },
    hide: function () {
        $('.user-form-error').hide().find('.error-message').text('')
    }
}

const _user_login = {
    init: function (this: any) {
        this.bindEvents()
        return this
    },
    bindEvents: function () {
        $('#submit').click( () => _user_login.submit())
        $('#password-div').keyup((event) => {
            if(event.keyCode === 13) this.submit()
        })
    },
    submit: function () {
        let formData: user_login_DTO = {
            username: $.trim(<string>$('#username').val()),
            password: $.trim(<string>$('#password').val())
        }
        const result: common_result = this.formDataValidate(formData)

        if (result.status) {
            _user_service.login(
                formData,
                (data) => {
                    console.log(data)
                    window.location.href = _common_util.getURLParam('redirect') || './index.html'
                },
                (message, code) => errorItem.show(message)
            )
        } else {
            errorItem.show(result.msg)
        }
    },
    formDataValidate: function (formData: user_login_DTO) {
        let result: common_result = {msg: "", status: false}
        result.status = false
        if (!_common_util.validate(formData.username, 'require')){
            result.msg = '用户名不能为空'
            return result
        }
        if (!_common_util.validate(formData.password, 'require')){
            result.msg = '密码不能为空'
            return result
        }
        result.status = true
        result.msg = "验证通过"
        return result
    }

}.init()

export {_user_login}
