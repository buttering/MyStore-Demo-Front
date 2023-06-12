import './pagination.css';
import {_common_util} from "@/utils/util";

const paginationTemplate = require('./pagination.template')

interface Option {
    container: any; // 父容器
    current: number;
    pages: number;    // 总页数
    hasPreviousPage: boolean;
    previousPage: number;
    hasNextPage: boolean;
    nextPage: number;
    pageRange: number;    // 向前或先后显示的最大页数
    onClickItem: (value: number) => {};  // 点击的回调函数
}

interface pageArrayItem {
    name: string;
    value: number;
    disabled?: boolean;
    active?: boolean;
}

class Pagination {
    private defaultOption: Option = {
        container       : null,
        current         : 1,
        pages           : 1,
        hasPreviousPage : false,
        previousPage    : -1,
        hasNextPage     : false,
        nextPage        : -1,
        pageRange       : 3,
        onClickItem     : null
    };

    private option: Option;

    constructor() {
        const _this = this;
        $(document).on('click', '.page-item', function () {
            const $this = $(this);  // 使js对象能够使用jquery方法
            if ($this.hasClass('active') || $this.hasClass('disabled')) {
                return;
            }
            typeof _this.option.onClickItem === 'function'
                ? _this.option.onClickItem($this.data('value')) : null;
        });
    }

    render = function (this: Pagination, userOption: {}) {
        this.option = {...this.defaultOption, ...userOption}

        if (!(this.option.container instanceof jQuery)) return;
        if (this.option.pages <= 1) return;

        let option = this.option;
        option.hasPreviousPage = option.current > 1;
        option.previousPage = option.current - 1;
        option.hasNextPage = option.current < option.pages;
        option.nextPage = option.current + 1;

        let pageArray: pageArrayItem[] = [];
        pageArray.push({
            name        : ' 上一页',
            value       : this.option.previousPage,
            disabled    : !this.option.hasPreviousPage
        });

        let start = (option.current - option.pageRange) > 0 ? (option.current - option.pageRange) : (1);
        let end = (option.current + option.pageRange) > option.pages ? (option.pages) : (option.current + option.pageRange);

        for (let i = start; i <= end; i++) {
            pageArray.push({
                name    : i.toString(),
                value   : i,
                active  : (i === option.current)
            });
        }

        pageArray.push({
            name        : '下一页',
            value       : this.option.nextPage,
            disabled    : !this.option.hasNextPage
        });

        const paginationHTML = _common_util.renderHTML(paginationTemplate, {
            pageArray   : pageArray,
            current     : option.current,
            pages       : option.pages
        });

        option.container.html(paginationHTML);
    }
}

export {Pagination};