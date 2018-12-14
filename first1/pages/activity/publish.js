var date = new Date()
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ipaddr: 'https://66skating.com',
    input1Value:null,
    input2Value:null,
    date1: date.toLocaleDateString(),
    hour: date.getHours(),
    Location:'请选择地点',
    userInfo:null,
    Latitude:null,
    Longitude:null,
    hourindex:0,
    array: ['上午6点', '上午7点', '上午8点', '上午9点', '上午10点', '上午11点', '中午12点', '下午1点', '下午2点', '下午3点', '下午4点', '下午5点', '晚上6点', '晚上7点', '晚上8点', '晚上9点', '晚上10点'],


  },


  chooseLocation:function(){
    // 地图选择
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        that.setData({ Location: res.name, Latitude: res.latitude, Longitude: res.longitude})
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  commitActivity:function(){

    var that = this

    // 判断用户有没有授权
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '温馨提示',
        content: '抱歉！请先在首页获取您的头像和昵称',
        showCancel: false,
        confirmText: "我知道了",
        success: function () {
          wx.navigateTo({
            url: '../index/index',
          })
        }
      })
      return;
    }

    //判断输入内容是否为空
    if ((!that.data.input1Value) || (!that.data.Latitude) || (!that.data.Longitude))
    {
      wx.showToast({
        title: "请完善发布信息",
        icon: "loading",
        duration: 2000
      })
      return;
    }


    
    wx.request({
      method: "POST",
      url: that.data.ipaddr + '/first2/AddActivity',
      data: {
        ActivityName: that.data.input1Value,
        openid: app.globalData.openid,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender: app.globalData.userInfo.gender,
        LocationName: that.data.Location,
        Latitude: that.data.Latitude,
        Longitude: that.data.Longitude,
        Date: that.data.date1,
        Time: that.data.array[that.data.hourindex],
        detail: that.data.input2Value

        


      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("###########添加自己的位置信息到服务器成功")
        wx.redirectTo({
          url: './activity',
        })
      }
    })
  },
  bindKeyInput1:function(e){
    var len = parseInt(e.detail.value);
    console.log(e.detail.value.length)

     
    this.setData({
      input1Value: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindKeyInput2: function (e) {
    this.setData({
      input2Value: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindStartDateChange: function (e) {
    this.setData({
      date1: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindHourChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hourindex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({userInfo: app.globalData.userInfo})
      }

    // //日期转换容错
    // let tmp = date.toLocaleDateString().split('\/')
    // if (tmp.length === 1) {
    //   this.setData({date1:tmp})
    // }
    // else
    // {
    //   if (tmp[1].length !== 2) {
    //     tmp[1] = '0' + tmp[1];
    //   }
    //   if (tmp[2].length !== 2) {
    //     tmp[2] = '0' + tmp[2];
    //   }
    //   this.setData({ date1: tmp.join('-') })
      
    // }

    // return tmp.join('-');
    
    this.setData({ date1: util.formatTime(date) })
      

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})