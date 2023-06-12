import './product-list.css';
import {_common_util} from "@/utils/util";
import '@/service/product-service';
import {_product_service} from "@/service/product-service";
import {Pagination} from "@/utils/pagination/pagination";
import {product_list_DTO} from "@/DTO/product-list-DTO";

const productListTemplate = require('./product-item.template');

type OrderBy = 'default' | 'price'

const _product_list = {
    $productListContent: $('.product-list-content'),
    pagination: new Pagination(),
    requestData: {
        cid: Number(_common_util.getURLParam('categoryId') || ''),
        keyword: _common_util.getURLParam('keyword') || '',
        order: _common_util.getURLParam('orderBy') || '',
        asc: (_common_util.getURLParam('asc') || false) !== 'false',
        page: Number(_common_util.getURLParam('pageNum') || 1),
        size: Number(_common_util.getURLParam('pageSize') || 10)
    },
    init: function (this: any) {
        this.bindEvents();
        this.onload();
        return this;
    },
    bindEvents: function () {
        $('.sort-item').click((e) => this.changeOrder($(e.target).closest('.sort-item').data('type')));
        // $('.sort-item').click((e) => console.log($(e.target).closest('.sort-item')))
    },
    onload: function () {
        this.loadProductList();
        this.loadSort();
    },
    loadSort: function () {
        let urlOrderBy = <OrderBy>_common_util.getURLParam('orderBy') || 'default';
        let urlAsc = (_common_util.getURLParam('asc') || false) !== 'false';

        $('.sort-item.' + urlOrderBy).addClass('active');
        $('.sort-item:not(.' + urlOrderBy + ')').addClass('inactive');

        if (urlOrderBy === 'price') {
            if (urlAsc)
                $('.fa-sort-desc').addClass('inactive');
            else
                $('.fa-sort-asc').addClass('inactive');
        }
    },
    loadProductList: function () {
        let requestData = this.requestData;
        let productListHTML = '';
        requestData.cid ? (delete requestData.keyword) : (delete requestData.cid);
        _product_service.getProductList(
            requestData,
            (data) => {
                console.log((<any>data).records);
                let records: any[] = (<any>data).records;
                records.forEach((product) => {
                    product.image = product.imageList[0];
                });
                productListHTML = _common_util.renderHTML(productListTemplate, {records: records});
                this.$productListContent.html(productListHTML);
                this.loadPagination((<any>data).current, (<any>data).pages);
            },
            (message, code) => {
                _common_util.errorTips(message);
            }
        );
    },
    loadPagination: function (current: number, pages: number) {
        this.pagination.render({
            container: $('.pagination'),
            current: current,
            pages: pages,
            onClickItem: (current: number) => {
                this.requestData.page = current;
                this.loadProductList();
            }
        });
    },
    changeOrder: function (orderBy: OrderBy) {
        console.log(<OrderBy>_common_util.getURLParam('orderBy'));
        console.log(<OrderBy>_common_util.getURLParam('orderBy') || 'default');
        let urlOrderBy = _common_util.getURLParam('orderBy' || 'default');
        // let urlAsc: string | boolean = _common_util.getURLParam('asc')
        // urlAsc = urlAsc === null ? true : Boolean(urlAsc)
        let urlAsc = (_common_util.getURLParam('asc') || false) !== 'false'
        console.log(urlOrderBy);
        let url = _common_util.replaceURLParam(window.location.href, 'orderBy', orderBy);

        if (orderBy === 'price') {
            url = _common_util.replaceURLParam(url, 'asc', !urlAsc);
        }

        window.location.href = url;
    }
};

$(() => {
    _product_list.init();
});

