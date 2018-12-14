//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      
      success: function (res) {
        that.globalData.code = res.code
        wx.request({
          method: "POST",
          url: 'https://66skating.com/first2/getopenidServlet',
          data: {
            code: that.globalData.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log("获取微信登录数据成功：" + that.globalData.code)
            //var openid = res.data.openid //返回openid
            console.log(res.data.openid)
            that.globalData.openid = res.data.openid
          }
        })
      }
      
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:null,
    code:null,
    appid: 'wx9bf8c4f09a43f370',
    secret: '92b7558ad9c03d6fdf547898c1678bcc',
  }
})