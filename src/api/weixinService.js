import $script from 'scriptjs';
import api from 'api/api';
import 'lodash';

export default {
    weixinService() {
        let jsApiList = [];
        return {
            isWeixin:function(){
                let ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return true;
                } else {
                    return false;
                }
            },
            register:function (List) {
                let _this = this;
                jsApiList = List;
                if(!_this.isWeixin()){
                    return Promise.resolve(false);
                }else{
                    return _this.loadScript()
                        .then(_this.getWxSign)
                        .then(_this.setConfig)
                        .then(_this.checkList)
                        .catch(function (res) {
                            return Promise.resolve(false);
                        });
                }
            },
            setConfig:function (Sign) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {

                        Sign.ret = _.set(Sign.ret,'debug',false);
                        Sign.ret = _.set(Sign.ret,'jsApiList',jsApiList);
                        wx.config(Sign.ret);
                        // resolve(true);
                        wx.ready(function(){
                            resolve(true);
                        });
                        wx.error(function(res){
                            reject(res);
                        });
                    },1000);
                    
                });
            },
            getWxSign:function () {
                // let url = _.replace($location.absUrl(),'#' + $location.path(),'');
                // return ApiService.postApi('getWxSign',{
                //     url:url
                // })
                //     .then(ApiService.error);
                return api.postData('/app/getWxSign.htm',{url: location.href.split('#')[0]})
            },
            checkList:function () {
                return new Promise(function (resolve, reject) {
                    wx.checkJsApi({
                        jsApiList: jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        success: function (res) {
                            console.log('checkJsApi', res);
                            resolve(res);
                        }
                    });
                });
            },
            loadScript:function () {
                return new Promise(function (resolve) {
                    let scripts = [
                        '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
                    ];
                    $script(scripts,'loadStatus');
                    $script.ready('loadStatus',function () {
                        resolve(true);
                    })

                })

            }
        }
    }
}