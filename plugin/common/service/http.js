import axios from 'axios'
import { isDefined, forEach, extend } from './common'
import { $dialog } from '../component/dialog'
import { remoteApi, apiBaseData } from '../constants/global'
import utility from './utility'

let apiBaseUrl = remoteApi.apiBaseUrl || remoteApi.psptApiRoot || '';

function getRequestUrl(url) {
    return /^(ftp:\/\/|http:\/\/|https:\/\/|\/\/)[^ "]+$/.test(url) ? url : apiBaseUrl + url;
}
function isHttpRespDataConverter(result) {
    return !(result && isDefined(result.code) && isDefined(result.message) && isDefined(result.data));
}
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (resp) {
    return isHttpRespDataConverter(resp.data) ?
        utility.httpRespDataConverter(resp.data, resp.status) :
        resp.data;
}, function (error) {
    return Promise.reject(error);
});
export default function httpRequest() {
    this.logKey = () => this.logAPIUniqueKey || "Not Defined Log Key!";
    function registerMethods(methods) {
        forEach(methods, function (val) {
            this[`${val}Request`] = function (url, data, config, cache) {
                return axios(extend({
                    withCredentials: true
                }, config || {}, {
                    method: val || 'get',
                    url   : getRequestUrl(url),
                    data  : extend(apiBaseData || {}, data)
                }))
            }
        }, this);
    }

    registerMethods.call(httpRequest.prototype, ['get', 'post']);
}

