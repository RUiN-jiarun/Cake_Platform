// import MPServerless from '@alicloud/mpserverless-node-sdk';
// import cloud from 'alipay-cloud-sdk';

// my.serverless = my.serverless || new MPServerless({
//   uploadFile: my.uploadFile,
//   request: my.request,
//   getAuthCode: my.getAuthCode,
// }, {
//   appId: '2021002142682158',
//   spaceId: '42399fd7-ad09-49af-98e3-787a1363b621',                  
//   endpoint: 'https://api.bspapp.com',                  
//   clientSecret: 'lLqtZ2tBQ+HDPDYgsdDtJw==',
// });

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info("App onLaunch");
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
