// pages/notesAdd/notesAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled: false,
    content: '',
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增笔记',
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#CCE6FF',
      animation: {
        duration: 1000,
        timingFunc: 'linear'
      }
    });
    let id = options.id;
    if (id){
      getData(id,this);
    }else {
      this.setData({
        id: Date.now()
      })
    }
  },
  change (e) {
    this.setData({
      content: e.detail.value
    });
  },
  uploadImg () {
    let imgArr = [];
    let _self = this;
    wx.chooseImage({
      success: function(res) {
        res.tempFilePaths.forEach((item) => {
          imgArr.push(item)
        })
        _self.setData({
          imgList: imgArr
        })
      },
    })
  },
  previewImage () {
    let _self = this;
    wx.previewImage({
      urls: _self.data.imgList,
    })
  },
  cancel () {
    wx.navigateBack();
  },
  sure () {
    var reg = /^\s*$/g;
    if (!this.data.content || reg.test(this.data.content)) {
      return;
    }else{
      console.log(111)
    };
    this.setData({
      time: Date.now()
    });
    setValue(this);
    wx.navigateBack();
  }
})

const getData = (id,page) => {
  let arr = wx.getStorageSync('list');
  arr.forEach((item) => {
    if(item.id == id){
      page.setData({
        id: item.id,
        content: item.content
      })
    }
  })
}

const setValue = (page) => {
  var arr = wx.getStorageSync('list') || [];
  let flag = true;
  if (arr.length) {
    arr.forEach((item)=>{
      if (item.id == page.data.id) {
        item.time = Date.now();
        item.content = page.data.content;
        flag = false;
      }
    })
  }
  if(flag){
    arr.unshift(page.data);
  }
  wx.setStorageSync('list', arr)
}