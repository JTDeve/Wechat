const TxvContext = requirePlugin("tencentvideo");
import movieList1 from './PJData.js'
import movieList2 from './PHData.js'
import movieList3 from './combData.js'
import movieList4 from './PshowData.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: null,
    index:0,
    SpeedName:'1.0倍速',
    speed:1,
    title:'平花视频',
    condition:false,
    
  },
  videoPlay: function () {
    let txvContext = TxvContext.getTxvContext('txv1')
    txvContext.play();
  },

  videoPause: function () {
    let txvContext = TxvContext.getTxvContext('txv1')
    txvContext.pause();
  },

  videoSpeed: function () {
    let txvContext = TxvContext.getTxvContext('txv1')

    if(this.data.speed == 3)
    {
      this.data.speed = 1
    }
    else
    {
      this.data.speed = this.data.speed + 1
    }
    switch (this.data.speed)
    {
      case 1:
        txvContext.playbackRate(1.0); 
        this.setData({ SpeedName: "1.0倍速" })
        console.log("1.0倍速")
        break;
      case 2:
        txvContext.playbackRate(0.8);
        this.setData({ SpeedName:"0.8倍速"})
        console.log("0.8倍速")
        break;
      case 3:
        txvContext.playbackRate(0.5); 
        this.setData({ SpeedName: "0.5倍速" })
        console.log("0.5倍速")
        break;
      default:
        break;
    }

     0.5/0.8/1.0/1.25/1.5
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("################################")
    console.log(options.item)
    var that = this
    //根据传入的item去服务器获取相应播放列表
    wx.request({
      method: "POST",
      url: 'https://66skating.com' + '/first2/getMovieList',
      data: {
        item:options.item
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("###########获取到服务器的播放列表成功")
        switch (options.item) {
          case "1":
            that.setData({ movieList: res.data, title: '平花基础' } );
            break;
          case "2":
            that.setData({ movieList: res.data, title: '平花进阶' });
            break;
          case "3":
            that.setData({ movieList: res.data, title: '精选comb' });
            break;
          case "4":
            that.setData({ movieList: res.data, title: '比赛赏析'});
            break;
          case "5":
            that.setData({ movieList: res.data, title: '刹车等级'});
            break;
          case "6":
            that.setData({ movieList: res.data, title: '刹车赏析'});
            break;
          case "7":
            that.setData({ movieList: res.data, title: '轮舞'});
            break;
          case "8":
            that.setData({ movieList: res.data, title: '极限'});
            break;
          default:
            break;
        }
        that.setData({ condition:true})
      }
    })
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
    
  },

  bindTapChoose:function(e){
    console.log(e)
    this.setData({
      index: parseInt(e.currentTarget.id, 10),
    })
    console.log(this.data.index)
  }
})

//#################################################
