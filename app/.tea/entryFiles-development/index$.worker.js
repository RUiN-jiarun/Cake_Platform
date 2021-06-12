/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../pages/handbag/components/location/location?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/handbag/components/Masonry/Masonry?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/Drawer/Drawer?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/select-button/select-button?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/purchase-number/purchase-number?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/avatar/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/handbag/components/commodity-drawer/commodity-drawer?hash=c82671776e2c5e663f508629b2f1e9c7e14bb781');
require('../../components/Search/Search?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/Empty/Empty?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/category-nav/category-nav?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/Tab/Tab?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/handbag/components/pic-detail/pic-detail?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/button/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../node_modules/mini-ali-ui/es/modal/index?hash=febd4c40992222524e0db12a74760a28f8f9b339');
require('../../node_modules/mini-antui/es/list/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/list/list-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/Title/Title?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/my-ticket/components/tab/tab?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/my-ticket/components/ticket/ticket?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/handbag/handbag?hash=1c1ac886f88247a967b69f671947ef9d0b83f8d9');
require('../../pages/my/my?hash=3e2e5e2d473d03821badb5452a72c12422f436f6');
require('../../pages/category/category?hash=132dec136945b3b0a66fc76febf44a6e21f01fee');
require('../../pages/search/search?hash=ef4fb84887010afe7b7bb71b7080a3b22dd7a410');
require('../../pages/my-order/my-order?hash=5fdde72af6b9a5988e372dbe537474e9a864797c');
require('../../pages/my-vote/my-vote?hash=5fdde72af6b9a5988e372dbe537474e9a864797c');
require('../../pages/new-vote/new-vote?hash=3e2e5e2d473d03821badb5452a72c12422f436f6');
require('../../pages/my-ticket/my-ticket?hash=5cbcbd88ecc7642955f3d3ee95e06e8eb58cac86');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}