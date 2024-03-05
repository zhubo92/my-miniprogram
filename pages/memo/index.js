// pages/memo/index.js
const util = require("../../utils/memo.js");

function editArr(arr,i,editCnt){
  let newArr = arr, editingObj = newArr[i];   
    for (var x in editCnt){
      editingObj[x]= editCnt[x];
    }
  return newArr;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    curIpt:'',
    showAll:true,
    lists:[],
    curRange:[],
    curBegin:0,
    curFinish:1,
    remind:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  iptChange(e){ 
    let timeArr = util.setTimeHalf();   
    this.setData({
      curIpt:e.detail.value,
      curRange:timeArr
    })
  },
  formReset(){
    this.setData({
      curIpt:'',
      curRange:[]
    })
  },
  formSubmit(){
    let cnt = this.data.curIpt,newLists = this.data.lists,i = newLists.length,begin=this.data.curRange[this.data.curBegin],finish = this.data.curRange[this.data.curFinish];
    if (cnt){
       newLists.push({id:i,content:cnt,done:false,beginTime:begin,finishTime:finish,editing:false});
       this.setData({
        lists:newLists,
        curIpt:''
      }) 
    }
  },
  beginChange(e){
     this.setData({
      curBegin: e.detail.value,
      curFinish: Number(e.detail.value)+1
    })
  },
  finishChange(e){
    this.setData({
      curFinish: e.detail.value
    })
  },
  //修改备忘录
  toChange(e){
    let i = e.target.dataset.id;
      this.setData({
        lists: editArr(this.data.lists,i,{editing:true})
      })
  },
  iptEdit(e){
    let i = e.target.dataset.id;
    this.setData({
      lists:editArr(this.data.lists,i,{curVal:e.detail.value})
    })
  },
  saveEdit(e){   
    let i = e.target.dataset.id;
    this.setData({
      lists:editArr(this.data.lists,i,{content:this.data.lists[i].curVal,editing:false})
    })
  },
  setDone(e){
    let i = e.target.dataset.id,originalDone = this.data.lists[i].done;
      this.setData({
        lists:editArr(this.data.lists,i,{done:!originalDone})
      })
  },
  toDelete(e){
    let i = e.target.dataset.id,newLists = this.data.lists;
    newLists.map(function(l,index){
      if (l.id == i){      
        newLists.splice(index,1);
      }
    })   
    this.setData({
        lists:newLists
      })
  },
  doneAll(){
    let newLists = this.data.lists;
    newLists.map(function(l){
      l.done = true;
    })   
    this.setData({
        lists:newLists
      })
  },
  deleteAll(){
    this.setData({
        lists:[],
        remind:[]
      })
  },
  showUnfinished (){
    this.setData({
      showAll:false
    })
  },
  showAll(){
    //显示全部事项
     this.setData({
      showAll:true   
    })
  },
  saveData(){
    let listsArr = this.data.lists;
    wx.setStorage({
      key: 'todolist',
      data: listsArr,
      success() {
        wx.showToast({
          title: '保存成功'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //获取之前保留在缓存里的数据
    wx.getStorage({
      key: 'todolist',
      success: function(res) {
        if(res.data){
           that.setData({
            lists:res.data
          })
        }
      }
    })
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