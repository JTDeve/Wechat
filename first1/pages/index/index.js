//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: null,
    imgUrls: [
      '../img/logo5.png',
      '../img/logo1.png',
      '../img/logo3.png'
    ],
    contentItems: ['', '', '', ''],
    listItems: ['', '', '', '', '', '', '']
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({avatarUrl:tempFilePaths[0]})
      }
    })
  },

  invite66:function(){
    wx.navigateTo({
      url: '../first/first',
    })
  },
  movie:function(){
    wx.navigateTo({
      url: '../logs/movieMain',
    })
  },

  active: function () {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },

  moreInfo: function () {
    wx.navigateTo({
      url: '../owner/owner',
    })
  },

  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket: true
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    //用户第一次授权小程序，将用户信息存入数据库
    wx.request({
      method: "POST",
      url: 'https://66skating.com' + '/first2/addUser',
      data: {
        id: app.globalData.openid,
        gender: app.globalData.userInfo.gender,
        name: app.globalData.userInfo.nickName,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("###########添加自己的位置信息到服务器成功")

      }
    })
  },

    onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },


})
