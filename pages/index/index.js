//index.js
//获取应用实例
Page({
  data: {
    notesList: [{
      id: 1,
      time: Date.now(),
      content: '还没有笔记，去添加一个吧'
    }],
    addImage: 'url(../../assets/img/add.png)',
    addTop: '',
    addLeft: ''
  },
  onLoad(options){
    initData(this);
  },
  onShow () {
    initData(this);
  },
  move (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    this.setData({
      addTop: y,
      addLeft: x
    })
  },
  notesAdd () {
    wx.navigateTo({
      url: '../notesAdd/notesAdd',
    })
  },
  edit (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../notesAdd/notesAdd?id=' + id
    })
  }
});

function initData(page){
  var arr = wx.getStorageSync('list')
  if(arr.length){
    arr.forEach((item,i)=>{
      item.time = formatTime(item.time);
    });
    page.setData({
      notesList: arr
    })
  }else {
    console.log('没有数据');
  }
}


const formatTime = (date) => {
  date = new Date(Number(date));
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-')+' '+ [hours, minutes, seconds].map(formatNumber).join(':');
}

const formatNumber = (n) => {
  n = n.toString();
  return n >= 10 ? n : '0' + n
}

export { formatTime, formatNumber }
