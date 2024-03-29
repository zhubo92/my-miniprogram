// pages/pinyin/index.js
const pinyin = require('../../utils/pinyin.js');
Page({
  /**
   * 组件的初始数据
   */
  data: {
    pinyinText: '',
  },

  onLoad: function () {

  },
  // 事件处理函数
  onInput: function(e) {
    console.log(e)
    var char = e.detail.value;
    console.log('--', char);
    char = char && char.trim();
    if (char.length == 1) {
      if (pinyin.hasOwnProperty(char)) {
        console.log(pinyin[char].join(', '))
        this.setData({
          pinyinText: pinyin[char].join(', ')
        });
      }
      else {
        this.setData({
          pinyinText: '找不到，^_^'
        });
      }
    }
    else {
      this.setData({
        pinyinText: ''
      });
    }
  },
})