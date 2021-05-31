// 个人中心
Page({
  data: {
    currentUser: {
      name: '什么鬼',
      credit: 10,
      member: '高级会员',
    },
    // entries: [
    //   {
    //     title: '新人礼遇',

    //     cover:
    //       'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*HTNURLN0hv8AAAAAAAAAAABkARQnAQ',
    //   },
    //   {
    //     title: '积分享好礼',
    //     cover:
    //       'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*8mUFQZnkpX4AAAAAAAAAAABkARQnAQ',
    //   },

    //   {
    //     title: '积分兑好礼',
    //     cover:
    //       'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*CwXrR4hRcGAAAAAAAAAAAABkARQnAQ',
    //   },

    //   {
    //     title: '会员特惠',
    //     cover:
    //       'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*dyvrR6BIbYgAAAAAAAAAAABkARQnAQ',
    //   },

    //   {
    //     title: '新人礼遇',
    //     cover:
    //       'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*7G9XQLcv6tYAAAAAAAAAAABkARQnAQ',
    //   },
    // ],
    navList: [
      {
        name: '我的收藏',
        thumb:
          'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*Y8BATYqMN78AAAAAAAAAAABkARQnAQ',
        onClick: () =>
          my.navigateTo({
            url: '/pages/my-order/my-order',
          }),
      },
      {
        name: '我的创意',
        thumb:
          'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*9RqXQaxLeCEAAAAAAAAAAABkARQnAQ',
        onClick: () => 
          my.navigateTo({
            // 未来这里是跳转到一个查看自己发起的投票的页面
            url: '/pages/my-vote/my-vote',
          }),
      },
      {
        name: '我的奖券',
        thumb:
          'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*9RqXQaxLeCEAAAAAAAAAAABkARQnAQ',
        onClick: () =>
          my.navigateTo({
            url: '/pages/my-ticket/my-ticket',
          }),
      },
      {
        name: '关于',
        thumb:
          'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*-Lp1TZDggnoAAAAAAAAAAABkARQnAQ',
        onClick: () => {},
      },
    ],
  },
  onLoad() {},
  onListClick({ target: { dataset } }) {
    const { onClick } = this.data.navList[dataset.index];
    if (onClick) {
      onClick();
    }
  },
});
