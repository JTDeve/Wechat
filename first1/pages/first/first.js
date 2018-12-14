const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moto: '当前正在玩的66位置,快来加入吧！',
    userCount:0,
    ipaddr:'https://66skating.com',
    //ipaddr: 'http://localhost:8080',
    // Longitude: 23.099994,
    // Latitude: 23.099994,
     Longitude: 0,
     Latitude: 0,
    color1: '#8E8E8E',
    array: ['1小时', '2小时', '3小时', '4小时'],
    index: 0,
    userinfo:null,
    appid: 'wx9bf8c4f09a43f370',
    secret: '92b7558ad9c03d6fdf547898c1678bcc',
    openid:null,
    code:null,
    markers: [
    ],
 



    Circles: [{
      latitude: 23.099994,
      longitude: 113.324520,
      radius: 2000,
    }],
  },
  //###########################################################
  //######################我在这里玩############################
  //###########################################################
  button1check: function () {
    // 判断有没有获取用户信息
    if (!app.globalData.userInfo)
    {
      wx.showModal({
        title: '温馨提示',
        content: '抱歉！请先在首页获取您的头像和昵称',
        showCancel: false,
        confirmText: "我知道了",
        success:function(){
          wx.navigateTo({
            url: '../index/index',
          })
        }
      })
      return;
    }
    this.setData({ moto: '全国小伙伴已知道您在此,正火速赶来！' });
    console.log(app.globalData.userInfo.gender)
    var that = this;

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res);
        //that.loadCity(latitude, longitude);
        // var Latitude = res.latitude
        // var Longitude = res.longitude

        wx.request({
          method: "POST",
          url: that.data.ipaddr +'/first2/updateLocation',
          data: {
            id: app.globalData.openid,
            Latitude: res.latitude,
            Longitude: res.longitude,
            leftTime:that.data.index,
            gender: app.globalData.userInfo.gender,
            name: app.globalData.userInfo.nickName,
  

          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function (res) {
            console.log("###########添加自己的位置信息到服务器成功")
            that.button2check()

            // 提示用户操作成功
            wx.showToast({
              title:"定位成功！",
              icon:"success",
              duration:2000
            })
          }
        })
      }

    })
    that.setData({ color1: "#EE0000" })
  },

  //###########################################################
  //#########################刷新##############################
  //###########################################################
  button2check: function () {
    //this.setData({ moto: "刷街展示页面!" });
    
    var that = this;
    that.setData({ markers: null });
    // this.setData({moto:"平花展示页面!"});
    var markAll = [];
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      // type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res);
        //that.loadCity(latitude, longitude);
        var Latitude = res.latitude
        var Longitude = res.longitude


        // markAll.push({
        //   iconPath: "../img/boy.png",
        //   id: 10,
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   callout: {
        //     content: 'JT',
        //     color: "#ffffff",//文字颜色
        //     fontSize: 14,
        //     borderRadius: 50,//callout边框圆角
        //     bgColor: "#000000",//背景色
        //     textAlign: "center",//文字对其方式
        //     padding: 6 //文本边缘留白
        //   },
        //   width: 50,
        //   height: 50
        // })
        //that.loadCity(res.latitude, res.longitude);
        // that.setData({ markers: markAll });
        that.setData({
          Latitude: Latitude, Longitude: Longitude,
          Circles: [{
            latitude: Latitude,
            longitude: Longitude,
            fillColor: "#418be211",
            //默认12km半径，5位geohash
            radius: 12000
          }]
        });
        
      }
    })
    //button2check：和自己的后台交互位置信息
    wx.request({
      url: this.data.ipaddr + '/first2/showLocation',
      data: {
        name: "111",
        password: "123"
      },
      method: 'get',
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: function (res) {
        //console.log("返回数据为：" + res.data.employees[0].firstName);
        console.log("success------------------");
        console.log(res.data);
        console.log(res.data.length);
        that.setData({ userCount: res.data.length})
        //console.log(res.data[1].longitude);
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].name);
          // 可以在界面上打印现在全国在线的人数
          markAll.push({
            iconPath: res.data[i].gender === '1' ? "../img/boy8.png" : "../img/girl8.png",
            id: i,
            latitude: res.data[i].latitude,
            longitude: res.data[i].longitude,
            callout: {
              content: res.data[i].name,
              color: "#ffffff",//文字颜色
              fontSize: 14,
              borderRadius: 50,//callout边框圆角
              bgColor: "#000000",//背景色
              textAlign: "center",//文字对其方式
              padding: 6 //文本边缘留白
            },
            width: 30,
            height: 30
          })
        }
        that.setData({ markers: markAll });
      }
    })

    // that.setData({markers:markAll});
    console.log("11111111111111")
  },

  musicplay:function(){
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      title: '',
      coverImgUrl: ''
    })
    console.log("nihaonihao")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    this.button2check()
    //判断是否分享进入
    if (options.share_query) {
      wx.showLoading({
        title: '我是从分享页面进入的',
      })

      setTimeout(function () {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/logs/logs',
        })
      }, 2000)
    }

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
      bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    this.button2check()
    wx.stopPullDownRefresh
  }   

})