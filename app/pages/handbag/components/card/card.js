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
    list: [{ 
        id: 0,
        img: 'https://edgefix-image.edgecom.top/ABD846F6672997A7F76CD38E8A57F954.jpg', 
      }, 
      { 
        id: 1,
      img: 'https://edgefix-image.edgecom.top/F6E5801C304CC76DA63C02C9FB38B8F4.jpg', 
      }, 
      { 
        id:2,
      img: 'https://edgefix-image.edgecom.top/D518952AD1DD61B2D32556E20CC527C4.jpg', 
      }, 
      { 
        id:3,
      img: 'https://edgefix-image.edgecom.top/1D187E28B349679908A44BBE81F3D3CA.jpg', 
      }, 
      { 
        id:4,
      img: 'https://edgefix-image.edgecom.top/1129A411AC9CF5F81187CBED181B6F57.jpg', 
      }, 
      {
        id:5,
        img: 'https://edgefix-image.edgecom.top/ABD846F6672997A7F76CD38E8A57F954.jpg', 
      }, 
      { 
        id:6,
      img: 'https://edgefix-image.edgecom.top/F6E5801C304CC76DA63C02C9FB38B8F4.jpg', 
      }, 
      { 
        id:7,
      img: 'https://edgefix-image.edgecom.top/D518952AD1DD61B2D32556E20CC527C4.jpg', 
      }, 
      { 
        id:8,
      img: 'https://edgefix-image.edgecom.top/1D187E28B349679908A44BBE81F3D3CA.jpg', 
      }, 
      { 
        id:9,
      img: 'https://edgefix-image.edgecom.top/1129A411AC9CF5F81187CBED181B6F57.jpg', 
      }, ],
      
      // 要存一份copy用于记录
      listCopy: [{ 
        id: 0,
        img: 'https://edgefix-image.edgecom.top/ABD846F6672997A7F76CD38E8A57F954.jpg', 
      }, 
      { 
        id: 1,
      img: 'https://edgefix-image.edgecom.top/F6E5801C304CC76DA63C02C9FB38B8F4.jpg', 
      }, 
      { 
        id:2,
      img: 'https://edgefix-image.edgecom.top/D518952AD1DD61B2D32556E20CC527C4.jpg', 
      }, 
      { 
        id:3,
      img: 'https://edgefix-image.edgecom.top/1D187E28B349679908A44BBE81F3D3CA.jpg', 
      }, 
      { 
        id:4,
      img: 'https://edgefix-image.edgecom.top/1129A411AC9CF5F81187CBED181B6F57.jpg', 
      }, 
      {
        id:5,
        img: 'https://edgefix-image.edgecom.top/ABD846F6672997A7F76CD38E8A57F954.jpg', 
      }, 
      { 
        id:6,
      img: 'https://edgefix-image.edgecom.top/F6E5801C304CC76DA63C02C9FB38B8F4.jpg', 
      }, 
      { 
        id:7,
      img: 'https://edgefix-image.edgecom.top/D518952AD1DD61B2D32556E20CC527C4.jpg', 
      }, 
      { 
        id:8,
      img: 'https://edgefix-image.edgecom.top/1D187E28B349679908A44BBE81F3D3CA.jpg', 
      }, 
      { 
        id:9,
      img: 'https://edgefix-image.edgecom.top/1129A411AC9CF5F81187CBED181B6F57.jpg', 
      }, ],
  },
  props: {},

  didMount() {
    // this.data.list.map
  },
  didUpdate() {},
  didUnmount() {},
  
  methods: {
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
      // if (this.data.like) {
      //   this.triggerEvent('like', { uid: this.data.user.uid }, {})
      // } else if (this.data.unlike) {
      //   this.triggerEvent('unlike', { uid: this.data.user.uid }, {})
      // }
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
      if (e.currentTarget.id == 0)
        console.log(this.isGetPrice(this.data.like));
        console.log(this.data.winTicket);
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

  },



  

});
