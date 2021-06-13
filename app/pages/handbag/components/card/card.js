
Component({
  mixins: [],
  data: {
    index: '',
    startX: '', // 开始位置
    placeX: '', // 开始位置-最终位置距离
    tiltAngle: ['0','0','0','0','0','0','0','0','0','0'],
    x: ['16','16','16','16','16','16','16','16','16','16'],
    y: ['16','16','16','16','16','16','16','16','16','16'],
    like: [false,false,false,false,false,false,false,false,false,false],
    unlike: [false,false,false,false,false,false,false,false,false,false],
    list: [ { 
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
    onTouchStart(e, idx) {
      console.log('touch');
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
    onTouchMove(e, idx) {
      console.log('move');
      var tiltAngleT = [];
      var againX = [];
      var againY = [];
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
    },

    // 取消
    onCancel(e, idx) {
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
        like: [false,false,false,false,false,false,false,false,false,false],
        unlike: [false,false,false,false,false,false,false,false,false,false],
      });
    },
  },

  

  

});
