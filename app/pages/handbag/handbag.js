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
        title: '综合',
        sortable: true,   // 可排序
      },
      {
        id: TREND,
        title: '人气榜',
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
  onCloseCommodityDrawer() {
    this.setData({ showCommodityDrawer: false });
  },
  getCommodityDetailPagePath(id) {
    return `/pages/commodity/commodity?id=${id}`;
  },
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
    this.onCloseCommodityDrawer();
    my.showToast({
      type: 'success',
      content: '添加成功，在购物车等亲',
      duration: 3000,
    });
  },
});
