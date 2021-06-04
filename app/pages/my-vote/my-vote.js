// 此处未来是收藏栏的内容
import { getCommodity } from '../../services/commodity';
import * as log from '../../utils/log';
import { ALL, TREND, LIKE } from '../../asserts/CommodityType';
Page({
  data: {
    selectedCommodityId: '',
    showCommodityDrawer: false,
    myVoteList: [
      {
        title: '柠檬卷',
        time:'2021-06-02',
        image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/5756a82b35d34439b7f0ca878744167d.jpeg',
        tag: ['外观创意', '主题创意'],
        voteCount: 129,
        likeState: true,
        id: 1,
      },
      {
        title: '柠檬卷',
        time:'2021-06-02',
        image: 'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*DenfRpLr6NEAAAAAAAAAAABkARQnAQ',
        tag: ['外观创意'],
        voteCount: 89,
        likeState: true,
        id: 4,
      },
      {
        title: '柠檬卷',
        time:'2021-06-02',
        image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/5756a82b35d34439b7f0ca878744167d.jpeg',
        tag: ['外观创意', '主题创意'],
        voteCount: 223,
        likeState: true,
        id: 5,
      },
    ],
  },
  onLoad() { },
  onClickMe(e) {
    // my.navigateTo({
    //   url: '/pages/commodity/commodity?id=${id}',
    // })
    var attr = e.currentTarget.dataset.attr;
    console.log(attr);
    this.setData({ selectedCommodityId: attr, showCommodityDrawer: true });
  },
  onTapCommodity(id) {
    this.setData({ selectedCommodityId: id, showCommodityDrawer: true });
  },
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
