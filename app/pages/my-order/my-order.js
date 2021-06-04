// 此处未来是收藏栏的内容
import { getCommodity } from '../../services/commodity';
import * as log from '../../utils/log';
import { ALL, TREND, LIKE } from '../../asserts/CommodityType';
Page({
  data: {
    selectedCommodityId: '',
    showCommodityDrawer: false,
    loveList: [
      {
        time: '2021.6.1',
        bakeIdeas: [
          {
            title: '柠檬卷',
            image: 'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*DenfRpLr6NEAAAAAAAAAAABkARQnAQ',
            tag: ['外观创意', '主题创意'],
            voteCount: 129,
            likeState: true,
            id: 1,
          },
          {
            title: '流心挞',
            image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/5756a82b35d34439b7f0ca878744167d.jpeg',
            tag: ['原料创意'],
            voteCount: 333,
            likeState: true,
            id: 2,
          },
        ],
      },
      {
        time: '2021.5.29',
        bakeIdeas: [
          {
            title: '柠檬卷',
            image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/1f6d21de438245fdbad9e0843012c003.jpeg',
            tag: ['外观创意', '主题创意', '原料创意'],
            voteCount: 555,
            likeState: true,
            id: 3,
          },
          {
            title: '流心挞',
            image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/1f6d21de438245fdbad9e0843012c003.jpeg',
            tag: ['外观创意', '主题创意'],
            voteCount: 888,
            likeState: true,
            id: 4,
          },
        ],
      },
      {
        time: '2021.5.1',
        bakeIdeas: [
          {
            title: '柠檬卷',
            image: 'https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*DenfRpLr6NEAAAAAAAAAAABkARQnAQ',
            tag: ['外观创意', '主题创意'],
            voteCount: 129,
            likeState: true,
            id: 5,
          },
          {
            title: '流心挞',
            image: 'https://5b0988e595225.cdn.sohucs.com/images/20170925/5756a82b35d34439b7f0ca878744167d.jpeg',
            tag: ['原料创意'],
            voteCount: 333,
            likeState: true,
            id: 6,
          },
        ],
      },
    ],
  },
  onLoad() { },
  onClickMe(e) {
    // my.navigateTo({
    //   url: '/pages/commodity/commodity?id=${id}',
    // })
    var attr=e.currentTarget.dataset.attr;
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
