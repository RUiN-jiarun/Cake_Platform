// 此处未来是收藏栏的内容
import { getLoveList } from '../../services/commodity';
import * as log from '../../utils/log';
import { ALL, TREND, LIKE } from '../../asserts/CommodityType';
import { loveList } from '/services/__mock__/commodity';
Page({
  data: {
    selectedCommodityId: '',
    showCommodityDrawer: false,
    // 这里要修改！
    // 根据id对应allCommodity里的item
    // TODO: 如何动态创建
    lovelist: [],
  },
  onLoad() {
    getLoveList().then(({ data }) =>
          this.setData({
              loveList: data
          })
        );
    // this.setData({loveList : getLoveList()});
  },
  // 点击···显示详情
  onClickMe(e) {
    // my.navigateTo({
    //   url: '/pages/commodity/commodity?id=${id}',
    // })
    var attr=e.currentTarget.dataset.attr;
    console.log(attr);
    this.setData({ selectedCommodityId: attr, showCommodityDrawer: true });
  },
  // onTapCommodity(id) {
  //   this.setData({ selectedCommodityId: id, showCommodityDrawer: true });
  // },
  onCloseCommodityDrawer() {
    this.setData({ showCommodityDrawer: false });
  },
  onConfirm() {
    // this.onCloseCommodityDrawer();
    my.showToast({
      type: 'success',
      content: '收藏成功',
      duration: 3000,
    });
  },
  getCommodityDetailPagePath(id) {
    return `/pages/commodity/commodity?id=${id}`;
  },
});
