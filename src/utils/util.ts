import axios, {ResponseType} from "axios";
import * as Hogan from "hogan.js";


const config = {
    serverHost: 'http://localhost:8099/'
};

type successFunction = (data: object | string) => void
type errorFunction = (message: string, code?: number) => void

interface requestParam {
    method?: string;
    url?: string;
    type?: ResponseType;
    data?: string;
    param?: object;
    success: successFunction;
    error?: errorFunction;
}

type VALIDATE_TYPE =
    | 'require'
    | 'email'
    | 'phone'

const _common_util = {
    /*发送http请求常用方法：
    * 1. Ajax：即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML）.用于浏览器与服务器之间使用异步数据传输(HTTP 请求),做到局部请求以实现局部刷新
    * 2. XMLHttpRequest：是ajax的一种传统实现，兼容性好，且支持进度控制
    * 3. JQuery Ajax：对原生XHR(XmlHttpRequest)的封装
    * 4. fetch：基于promise设计，出现就是为了解决 XHR 的问题，老版本浏览器不支持，现代浏览器提供原生支持
    * 5. Axios：在服务端它使用原生 node.js http 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests，只不过它是Promise的实现版本。基本优于fetch，需要第三方库
    * */
    request: function (this: any, param: requestParam) {
        console.log(param.data);
        axios({
            method: param.method || 'GET',
            url: param.url || '',
            responseType: param.type || 'json',
            data: param.data || '',
            params: param.param || {},
            withCredentials: true,
            timeout: 3000,
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            validateStatus: (status) => status === 200  // 只有状态码为200进行resolved，否则rejected
        }).then((response) => {
            if (0 === response.data.code)
                param.success(response.data.data);
            else if (11 === response.data.code)
                this.toLogin();
            else
                typeof param.error === 'function' && param.error(response.data.message, response.data.code);
        }).catch((err) => {
            typeof param.error === 'function' && param.error(err.statusText);
        });
    },
    // 跳转统一登录页面
    toLogin: () =>
        // href被赋值后马上会进行跳转;为了避免服务器收到不可预知的请求.
        // 对任何用户输入的作为 URI 部分的内容都需要用 encodeURIComponent 进行转义。
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href),
    // 获取服务器地址
    toIndex: () => window.location.href = './index.html',
    getServerURL: (path: string) => {
        return config.serverHost + path;
    },
    // 获取URL param
    getURLParam: (name: string) => {
        // Location 对象包含有关当前 URL 的信息, window 对象的一部分。
        // search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分
        // substring(1)从第二个字符开始提取
        const paramString: string = window.location.search.substring(1);
        const regExp: RegExp = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');  // 第二个匹配捕获 开头、&、结尾 之间的字符
        const result: RegExpMatchArray = paramString.match(regExp);
        return result ? decodeURIComponent(result[2]) : null;  // 解码编码后的URI
    },
    replaceURLParam(url: string, name: string, value: any){
        const urlObj = new URL(url);
        urlObj.searchParams.set(name, value);
        return urlObj.href;
    },
    // 字段校验，支持字符串非空校验(require)、手机格式校验(phone)、邮箱格式校验(email)
    validate: (value: string, type: VALIDATE_TYPE) => {
        value = $.trim(value);
        if ('require' === type)
            return !!value;  // 转化为布尔值
        if ('phone' === type)
            return /^1\d{10}$/.test(value);
        if ('email' === type)
            return /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(value);
    },
    //使用hogan.js渲染数据到网页上
    renderHTML: function (htmlTemplate: string, data?: Hogan.Context): string {
        const template = Hogan.compile(htmlTemplate);
        return template.render(data);
    },
    errorTips: (msg: string) => {
        alert(msg || '出错啦～～～');
    },
    //成功提示
    successTips: (msg: string) => {
        alert(msg || '操作成功～～～');
    }
};

export {_common_util, successFunction, errorFunction};