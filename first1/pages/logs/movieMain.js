Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   * 页面相关事件
   * 处理函数--监听用户下拉动作
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
  PJ:function(){
    wx.navigateTo({
      url: './logs?item=' + 1,
    })
  },
  PH: function () {
    wx.navigateTo({
      url: './logs?item=' + 2,
    })
  },
  comb: function () {
    wx.navigateTo({
      url: './logs?item=' + 3,
    })
  },
  Pshow: function () {
    wx.navigateTo({
      url: './logs?item=' + 4,
    })
  },
  ShaGrade: function () {
    wx.navigateTo({
      url: './logs?item=' + 5,
    })
  },
  ShaShow: function () {
    wx.navigateTo({
      url: './logs?item=' + 6,
    })
  },
  Dance: function () {
    wx.navigateTo({
      url: './logs?item=' + 7,
    })
  },
  limit: function () {
    wx.navigateTo({
      url: './logs?item=' + 8,
    })
  },
})