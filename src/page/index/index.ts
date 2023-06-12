// import * as $ from 'jquery';
import '@/utils/unslider/unslider'
import './index.css'
import {_common_util} from "@/utils/util";

const bannerTemplate = require('./banner.template')


$(function () {
    const bannerHTML = _common_util.renderHTML(bannerTemplate);
    $('.banner-content').html(bannerHTML);
    (<any>$('.banner')).unslider({
        dots: true
    })
})