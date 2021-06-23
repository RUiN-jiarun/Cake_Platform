import { allCommodity } from '../../services/__mock__/commodity';
import { getMyList } from '../../services/commodity';

Page({

  data: {
    allCommodity,
    focus: false,
    compressedSrc: '',
  },
  bindButtonTap() {
    this.onFocus();
  },
  onFocus() {
    this.setData({
      focus: true,
    });
  },
  onBlur() {
    this.setData({
      focus: false,
    });
  },

  bindTextAreaBlur(e) {
    console.log(e.detail.value);
  },
  bindFormSubmit(e) {
    my.alert({
      content: e.detail.value.textarea,
    });
  },
  
  selectImage() {
    my.chooseImage({
      count: 1,
      success: (res) => {
        my.compressImage({
          apFilePaths: res.apFilePaths,
          level: 1,
          success: data => {
            console.log(data);
            this.setData({
              compressedSrc: data.apFilePaths[0],
            })
          }
        })
      }
    })
  },

  // onConfirm(e) {
  //   // this.onCloseCommodityDrawer();
  //   console.log(e);
  //   my.showToast({
  //     type: 'success',
  //     content: '已发起',
  //     duration: 3000,
  //   });
  // },

  onSubmit(e) {
    // console.log(`${JSON.stringify(e.detail.value)}`);
    console.log(e.detail.value);
    console.log(this.data.compressedSrc);
    // my.alert({
    //   content: `数据：${JSON.stringify(e.detail.value)}`,
    // });
    my.showToast({
      type: 'success',
      content: '已发起',
      duration: 3000,
    });
    this.addToAll(e.detail.value, this.data.compressedSrc);
    this.addToMyVote(e.detail.value, this.data.compressedSrc)
    my.switchTab({ url: '/pages/handbag/handbag' });
  },

  addToAll(item, pic) {
    console.log(allCommodity);
    var num = allCommodity.data.length;
    console.log(item.name);
    allCommodity.data.push({
      id: num,
      title: item.name,
      cover: pic,

    })
  },

  addToMyVote(item, pic) {
    var num = allCommodity.data.length - 1;
    getMyList().then(function (data){
      var info = data.data;
     
      info.unshift(
        {id: num,
          title: item.name,
          image: pic,
          likeState: true,
          tag: item.tags,
          voteCount: 0,})
      
    })
  }

});