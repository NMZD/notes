//index.js
//获取应用实例
Page({
  data: {
    notesList: [{
      id: 1,
      content: '第一个笔记'
    },{
      id: 1,
      content: '第二个笔记'
    }],
    nodes: [{
      name: 'ul',
      attrs: {
        class: "notes-list",
      },
      children: [{
        name: 'li',
        children: [{
          name: 'div',
          type: 'text',
          text: '第一个笔记'
        },{
          name: 'span',
          type: 'text',
          text: '2018-03-03'
        }]
      }, {
        name: 'li',
        children: [{
          name: 'div',
          type: 'text',
          text: '第二个笔记'
        }, {
          name: 'span',
          type: 'text',
          text: '2018-03-03'
        }]
      }]
    }]
  }
})
