import { getCommodity, getLoveList } from '../../services/commodity';
import * as log from '../../utils/log';
import { ALL, TREND, LIKE} from '../../asserts/CommodityType';

Page({
  data: {
    ALL,
    TREND,
    LIKE,
    searchValue: '',
    search: '',
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

    // console.log(this.search);

    this.setData({ searchValue });
    // console.log(this.data.searchValue);
    // 是这里！！！！是这里每次要更改搜索结果！！！
    this.fetchCurrentCommodities(this.data.activeTabId, this.data.searchValue);
  },




  onActiveTabChange(id) {
    this.setData({ activeTabId: id });
    this.fetchCurrentCommodities(id);
  },
  onTapCommodity(id) {
    this.setData({ selectedCommodityId: id, showCommodityDrawer: true });
  },
  onTapPic(id) {
    // console.log("点击了图片详情");
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
  // 改
  mapCommodityItemToViewList(commodities = []) {
    return commodities.map(item => ({
      ...item,
      url: this.getCommodityDetailPagePath(item.id),
    }));
  },
  fetchCurrentCommodities(commodityType, searchValue) {
    this.setData({ currentCommodities: [] });
    console.log(commodityType);
    if (commodityType < 3) {
       getCommodity({ type: commodityType })
      .then(({ data = [] }) => {
        console.log(searchValue);
        // console.log(data);
        var searchData = [];
        for (var item of data) {
          // console.log(item);
          if (item.title.indexOf(searchValue) != -1) {
            searchData.push(item);
          }
        }
        if (typeof(searchValue)=="undefined") {
          this.setData({
            currentCommodities: this.mapCommodityItemToViewList(data),
            // currentCommodities: this.mapCommodityItemToViewList(searchData),
          })
        }
        else {
          this.setData({
            // currentCommodities: this.mapCommodityItemToViewList(data),
            currentCommodities: this.mapCommodityItemToViewList(searchData),
          })
        }
        
      })
      .catch(err =>
        log.error('handbag.fetchCurrentCommodities.getAllCommodity', err)
      );
    }
    else {
      getCommodity({ type: 1 }).then(({data = []}) => {
        
      })
    }
   
  },
  // 这里要加上收藏的代码
  onConfirm() {
    // this.onCloseCommodityDrawer();
    this.addToCollection(this.data.currentCommodities[this.data.selectedCommodityId], this.getToday());   // 这里要显示当前drawer里的信息
    my.showToast({
      type: 'success',
      content: '收藏成功',
      duration: 3000,
    });
  },
  onConfirmVote() {
    // this.onCloseCommodityDrawer();
    my.showToast({
      type: 'success',
      content: '投票成功',
      duration: 3000,
    });
  },

  // 格式化日期：yyyy.MM.dd
  formatDate(date) {
      var myyear = date.getFullYear();
      var mymonth = date.getMonth() + 1;
      var myweekday = date.getDate();
  
      // if (mymonth < 10) {
      //     mymonth = "0" + mymonth;
      // }
      // if (myweekday < 10) {
      //     myweekday = "0" + myweekday;
      // }
      return (myyear + "." + mymonth + "." + myweekday);
  },

  // 获取今天的日期
  getToday() {
    var date = new Date();
    return this.formatDate(date);
  },

  // 加入收藏夹
  addToCollection(item, date) {
    console.log(item);
    console.log(date);
    // 6.5 确定可以搞到对应的信息了
    getLoveList().then(function (data){
      var info = data.data;
      var changeInfo;
      for (var i in info) {
        if (i.time === date) {
          changeInfo = i;
        }
      }
      if (!changeInfo)
        info.unshift({time: date, 
          bakeIdeas: [{id: item.id,
            title: item.title,
            image: item.cover,
            likeState: true,
            tag: item.tags,
            voteCount: item.voteCount,}]})
      else 
        changeInfo.bakeIdeas.push({
          id: item.id,
          title: item.title,
          image: item.cover,
          likeState: true,
          tag: item.tags,
          voteCount: item.voteCount,
        })
    })
    getLoveList().then(function (data){
      console.log(data);
    })
  },
});
