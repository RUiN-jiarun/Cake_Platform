import { getCommodity } from '../../services/commodity';
import * as log from '../../utils/log';
import { ALL, TREND, LIKE} from '../../asserts/CommodityType';

Page({
  data: {
    ALL,
    TREND,
    LIKE,
    searchValue: '',
    tabs: [
      {
        id: ALL,
        title: '创意瀑布流',
        sortable: true,   // 可排序
      },
      {
        id: TREND,
        title: '新品人气榜',
      },
      // 删除了新品页面
      {
        id: LIKE,
        title: '猜你喜欢',
      },
    ],
    activeTabId: ALL,
    currentCommodities: [],
    selectedCommodityId: '',
    showCommodityDrawer: false,
    showPicDetail: false,
  },
  onShow() {
    const { searchValue = '' } = getApp();
    this.setData({ searchValue });
    this.fetchCurrentCommodities(this.data.activeTabId);
  },
  onActiveTabChange(id) {
    this.setData({ activeTabId: id });
    this.fetchCurrentCommodities(id);
  },
  onTapCommodity(id) {
    this.setData({ selectedCommodityId: id, showCommodityDrawer: true });
  },
  onTapPic(id) {
    console.log("点击了图片详情");
    this.setData({ selectedCommodityId: id, showPicDetail: true });
  },
  onCloseCommodityDrawer() {
    this.setData({ showCommodityDrawer: false });
  },
  onModalClick3(){
    // 关闭图片详情页-不要改函数名-这是自带组件
    this.setData({ showPicDetail: false });
  },
  getCommodityDetailPagePath(id) {
    return `/pages/commodity/commodity?id=${id}`;
  },
  // 在这里修改！
  mapCommodityItemToViewList(commodities = []) {
    return commodities.map(item => ({
      ...item,
      url: this.getCommodityDetailPagePath(item.id),
    }));
  },
  fetchCurrentCommodities(commodityType) {
    this.setData({ currentCommodities: [] });
    getCommodity({ type: commodityType })
      .then(({ data = [] }) =>
        this.setData({
          currentCommodities: this.mapCommodityItemToViewList(data),
        })
      )
      .catch(err =>
        log.error('handbag.fetchCurrentCommodities.getAllCommodity', err)
      );
  },
  onConfirm() {
    // this.onCloseCommodityDrawer();
    my.showToast({
      type: 'success',
      content: '收藏成功',
      duration: 3000,
    });
  },
});
