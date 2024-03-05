const calc = require("../../utils/calc");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calc: {},
    tapped: {}
  },
  showAbout: function(e){
    wx.showModal({
      title: '关于',
      content: '这是一个十分简单的计算器',
      showCancel: false  
    })
  },
  btnClicked: function(e){
    var code = e.target.dataset.op
    calc.addOp(code)
    console.log(calc.getVars())
    this.setData({calc: calc.getVars()})
  },
  btnTouchStart: function(e){
    var code = e.target.dataset.op
    var tapped = {[code]: 'active'}
    this.setData({tapped: tapped})
  },
  btnTouchEnd: function(e){
    var tapped = {}
    this.setData({tapped: tapped})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad', options)
    calc.reset()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})