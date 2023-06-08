// import * as $ from 'jquery';
import '@/utils/unslider/unslider'
import './index.css'
import {_common_util} from "@/utils/util";

const bannerTemplate = require('./banner.template')


$(function () {
    const bannerHTML = _common_util.renderHTML(bannerTemplate);
    (<any>$('.banner-content')).html(bannerHTML);
    (<any>$('.banner')).unslider({
        dots: true
    })
})