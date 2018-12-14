const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ipaddr: 'https://66skating.com',
    activeList: null,
    distanceIndex:0,
    Latitude: null,
    Longitude: null,
    DetailShow:false,
    ActPersonList:null,
    DetailIndex:0,
    haseEnter:'点击报名',//该条活动自己暂未报名
    distanceList: ['不限制', '1km', '3km', '5km','10km','20km']
    // activeList: ['今晚刷街', '明天下午东厂约', '长江边平花', '玄武湖刷街', '111', '222', '111', '222', '111', '222']
  },

  detail:function(e){
    console.log('detail')
    console.log(e)
    this.setData({
      DetailIndex: parseInt(e.currentTarget.id, 10),
      DetailShow: true
    })


    this.GetUsrNumAndStatue()

  },

  publish:function(){
    wx.redirectTo({
      url: './publish',
    })
  },

  CommitEnter:function(){

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

    var that = this
    wx.request({
      url: that.data.ipaddr + '/first2/changeActPerson',
      data: {
        id: that.data.activeList[that.data.DetailIndex].id,
        ActivityName: that.data.activeList[that.data.DetailIndex].ActivityName,
        openid: app.globalData.openid,
        name: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender: app.globalData.userInfo.gender
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log("返回数据为：" + res.data.employees[0].firstName);
        console.log("success------------------");

        that.GetUsrNumAndStatue()
      }
    })



  },

  DistanceChange:function(e){
    console.log("111111111111111111111111111111111")
    this.setData({ distanceIndex: e.detail.value})

    var that = this
    wx.request({
      url: that.data.ipaddr + '/first2/showActivity',
      data: {
        DistanceIndex: that.data.distanceIndex,
        Latitude: that.data.Latitude,
        Longitude: that.data.Longitude
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log("返回数据为：" + res.data.employees[0].firstName);
        console.log("success------------------");
        console.log(res.data);
        console.log(res.data.length);
        that.setData({ activeList: res.data })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res);
        that.setData({ Latitude: res.latitude, Longitude:res.longitude})

        wx.request({
          url: that.data.ipaddr + '/first2/showActivity',
          data: {
            DistanceIndex: that.data.distanceIndex,
            Latitude: that.data.Latitude,
            Longitude: that.data.Longitude
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //console.log("返回数据为：" + res.data.employees[0].firstName);
            console.log("success------------------");
            console.log(res.data);
            console.log(res.data.length);
            that.setData({ activeList: res.data})
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
    
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
    
  },
  GetUsrNumAndStatue:function(){
    var that = this
    //去服务器查询一下该活动的用户数量，和自己有没有报过名
    wx.request({
      url: that.data.ipaddr + '/first2/findActPerson',
      data: {
        id: that.data.activeList[that.data.DetailIndex].id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log("返回数据为：" + res.data.employees[0].firstName);
        console.log("###################")
        console.log(res)
        that.setData({ ActPersonList: res.data })


        wx.request({
          url: that.data.ipaddr + '/first2/wetherEnter',
          data: {
            id: that.data.activeList[that.data.DetailIndex].id,
            openid: app.globalData.openid,
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({ hasEnter: res.data })
            console.log(that.data.hasEnter);
          }
        })
      }
    })
  }
})