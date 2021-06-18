import { getCommodity, getLoveList, getTickets } from '../../../../services/commodity';
import { LIKE } from '/asserts/CommodityType';

Component({
  mixins: [],
  data: {
    index: '',
    startX: '', // 开始位置
    placeX: '', // 开始位置-最终位置距离
    winTicket: [], // 抽到的奖券
    tiltAngle: ['0','0','0','0','0','0','0','0','0','0'],
    x: ['16','16','16','16','16','16','16','16','16','16'],
    y: ['16','16','16','16','16','16','16','16','16','16'],
    like: [false,false,false,false,false,false,false,false,false,false],
    unlike: [false,false,false,false,false,false,false,false,false,false],
    list: [],
    listCopy: [],
    isWin: false,
    // 模拟定位数据
    loc_name: "浙江大学玉泉校区",
    loc_address:  "杭州市西湖区浙大路38号",
  },
  props: {},

  didMount() {
    // this.data.list.map
    getCommodity({type: LIKE}).then(({data}) => {
      this.setData({list : data, listCopy: data});
    });
    // console.log(this.data.list);
  },
  didUpdate() {},
  didUnmount() {},
  
  methods: {
    // 模拟定位API
    chooseLocation() {
    var that = this
    my.chooseLocation({
         success:(res)=>{
          console.log(JSON.stringify(res))
          that.setData({
            loc_name:res.name,
            loc_addr:res.address
          })
        },
        fail:(error)=>{
          my.alert({content: '调用失败：'+JSON.stringify(error), });
        },
    });
    },


    // 触摸触发
    onTouchStart(e) {
      console.log('touch');
      var idx = e.currentTarget.id;     // 注意，这里的id是倒着的，最上层的是9，最里层的是0
      console.log(idx);
      var againX = [];
      var againY = [];
      for (var i = 0; i < this.data.list.length; i++) {
        if (i == idx) {
          againX[i] = e.touches[0].pageX;
          againY[i] = e.touches[0].pageY;
        }
        else {
          againX[i] = '16';
          againY[i] = '16';
        }
      }
      this.setData({ 
        startX : e.touches[0].pageX,
        x : againX,
        y : againY,
      });
    },

    // 触摸移动
    onTouchMove(e) {
      console.log('move');
      var idx = e.currentTarget.id;
      var tiltAngleT = [];
      var againX = this.data.like;
      var againY = this.data.unlike;
      // 拖动后相差距离
      let dxplace = e.touches[0].pageX - this.data.startX;
      // 拖动后相差距离进行换算角度
      let dxangle = (e.touches[0].pageX - this.data.startX) * 45 / 500;
      console.log(dxangle);
      // 遍历，判断拖动的该数组的位置
      for (var i=0; i<this.data.list.length; i++) {
        if (i == idx && dxplace > 50) {
          tiltAngleT[i] = dxangle,
          againX[i] = true;
          againY[i] = false;
        } else if (i == idx && dxplace <= -50) {
          tiltAngleT[i] = dxangle,
          againX[i] = false;
          againY[i] = true;
        } else if (i == idx && dxplace < 50 && dxplace > -50) {
          tiltAngleT[i] = dxangle,
          againX[i] = false;
          againY[i] = false;
          // 向右显示喜欢
          if (dxplace > 0) {
            my.showToast({
              type: 'success',
              content: '喜欢',
              duration: 500,
            });
          }
          // 向左显示换一个
          if (dxplace < 0) {
            my.showToast({
              type: 'exception',
              content: '换一个',
              duration: 500,
            });
          }
        } else {
          tiltAngleT[i] = '0',
          againX[i] = false;
          againY[i] = false;
        }
      }
      // 赋值
      this.setData({
        placeX: dxplace,
        tiltAngle: tiltAngleT,
        like: againX,
        unlike: againY,
      });
      // console.log(this.data.like);
    },

    // 取消
    onCancel(e) {
      console.log('cancel');

      this.setData({ 
        tiltAngle: ['0','0','0','0','0','0','0','0','0','0'],
        x: ['16','16','16','16','16','16','16','16','16','16'],
        y: ['16','16','16','16','16','16','16','16','16','16'],
        // like: [false,false,false,false,false,false,false,false,false,false],
        // unlike: [false,false,false,false,false,false,false,false,false,false],
      });
      // 如果偏移达到某个角度，则该卡片会被清掉
      if (this.data.placeX > 50 || this.data.placeX < -50) {
        // this.data.list.pop();
        this.setData({
          list: this.data.list.slice(0,e.currentTarget.id),
          // list: this.data.list.splice(-1,1),
        })
      }
      console.log(this.data.like);
      if (e.currentTarget.id == 0) {
        var win = this.isGetPrice(this.data.like);
        this.setData({isWin : win});
        // 如果中奖，把券加入list
        if (win) {
          for (var i in this.data.winTicket) {
            this.addToTickets(this.data.winTicket[i]);
          }
        }
      }
        
    },

    // 判断是否中奖
    isGetPrice(like) {
      var rand = Math.random()
      var cnt = 0;
      var ticket = []
      for (var i = 0; i < like.length; i++) {
        if (like[i] == true) {
          // console.log(this.data.list);
          ticket.push(this.data.listCopy[cnt]);   
          // 这里从拷贝的那一份列表里把可能中奖的商品加进去，到时候需要在商品里加入ticket属性（优惠券），可以直接push ticket属性
          cnt++;
        } 
      }
      console.log(ticket);
      // 不管中没中奖，都要把东西加到收藏夹
      for (var i in ticket) {
        this.addToCollection(ticket[i], this.getToday());
      }
      // 中奖概率算法
      if (cnt == 0)
        return false;
      else if (cnt == 1) {
        if (rand > 0.15)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 2) {
        if (rand > 0.25)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 3) {
        if (rand > 0.35)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 4) {
        if (rand > 0.5)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 5) {
        if (rand > 0.65)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 6) {
        if (rand > 0.75)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 7) {
        if (rand > 0.85)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 8) {
        if (rand > 0.9)  { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 9) {
        if (rand > 0.95)  { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
      else if (cnt == 10) {
        if (rand > 0.98)   { this.setData({winTicket: ticket}); return true;}
        else              return false;
      }
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
      // console.log(item);
      // console.log(date);
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

    addToTickets(item) {
      getTickets().then(function (data){
        var info = data.data;
        info.push({
          ticketType: item.ticketType,
          shop: item.shop,
          title: item.title,
          price: item.price,
          startAt: item.startAt,
          endAt: item.endAt,
        })
      })
    },

  },

});
