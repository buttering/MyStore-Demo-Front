import {_common_util, errorFunction, successFunction} from "@/utils/util";
import {product_list_DTO} from "@/DTO/product-list-DTO";

const _product_service = {
    getProductInfo: function (productId: number, resolve: successFunction, reject?: errorFunction) {
        _common_util.request({
            url     : _common_util.getServerURL('api/products/' + productId),
            success : resolve,
            error   : reject
        });
    },
    getProductList: function (requestParam: product_list_DTO, resolve: successFunction,   reject?: errorFunction,){
        _common_util.request({
            url     : _common_util.getServerURL('api/products'),
            param   : requestParam,
            success : resolve,
            error   : reject,
        })
    }
};

export {_product_service}