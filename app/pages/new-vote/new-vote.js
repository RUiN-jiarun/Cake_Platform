Page({

  data: {
    height: 20,
    focus: false,
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

});