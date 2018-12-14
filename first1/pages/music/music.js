//index.js
//获取应用实例
import audioList from './data.js'
var app = getApp()
Page({
  data: {
    audioList: audioList,
    audioIndex: 0,
    pauseStatus: true,
    listShow: false,
    timer: '',
    shuffle:1,
    currentPosition: 0,
    // currentPositionint:0,
    duration: 0,
    // durationInt:0
  },
  onLoad: function () {
    console.log('#################music onLoad')
    console.log(this.data.audioList.length)
    //  获取本地存储存储audioIndex
    var audioIndexStorage = wx.getStorageSync('audioIndex')
    console.log(audioIndexStorage)
    if (audioIndexStorage) {
      this.setData({ audioIndex: audioIndexStorage })
    }
    var that=this
    //监听停止,自动下一首
    wx.onBackgroundAudioStop(function () {
      that.bindTapNext();
    })
    // //监听暂停
    // wx.onBackgroundAudioPause(function () {
    //   that.setData({ pauseStatus:true})
    // })
    // //监听播放
    // wx.onBackgroundAudioPlay(function () {
    //   that.setData({ pauseStatus: false })
    // })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('##############onShowmusic#########')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('##############onHidemusic#########')
  },

  onReady: function (e) {
    console.log('onReady')
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('audio')
  },
  bindSliderchange: function (e) {
    // clearInterval(this.data.timer)
    let value = e.detail.value
    let that = this
    console.log(e.detail.value)
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)//youwenti@@@@@@@@@@@
        let { status, duration } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
        }
      }
    })
  },
  bindTapPrev: function () {
    console.log('bindTapPrev')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev

    if (this.data.shuffle == 3) {
      //随机播放
      audioIndexNow = Math.floor(Math.random() * length)
    }
    else if (this.data.shuffle == 1) 
    {
      if (audioIndexPrev === 0) {
        audioIndexNow = length - 1
      } else {
        audioIndexNow = audioIndexPrev - 1
      }
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev

    if (this.data.shuffle == 3) {
      //随机播放
      audioIndexNow = Math.floor(Math.random() * length)
    } else if (this.data.shuffle == 1) {
      if (audioIndexPrev === length - 1) {
        audioIndexNow = 0
      } else {
        audioIndexNow = audioIndexPrev + 1
      }
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },
  bindTapList: function (e) {
    console.log('bindTapList')
    console.log(e)
    this.setData({
      listShow: true
    })
  },
  returnPlay:function(e){
    console.log('returnPlay')
    console.log(e)
    this.setData({
      listShow: false
    })
  },
  bindTapChoose: function (e) {
    console.log('bindTapChoose')
    console.log(e)
    this.setData({
      audioIndex: parseInt(e.currentTarget.id, 10),
      listShow: false
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
  },
  play() {
    let { audioList, audioIndex } = this.data
    wx.playBackgroundAudio({
      dataUrl: audioList[audioIndex].src,
      title: audioList[audioIndex].name,
      coverImgUrl: audioList[audioIndex].poster
    })
    let that = this
    let timer = setInterval(function () {
      that.setDuration(that)
    }, 1000)
    this.setData({ timer: timer })
  },
  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        //-jt-console.log(res)
        let { status, duration, currentPosition } = res
        
        if (status === 1 || status === 0) {
          currentPosition = currentPosition.toFixed(0)
          duration = duration.toFixed(0)
          that.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    console.log(t)
    return t;
  },
  //播放顺序选择
  playtype:function(){
    if (this.data.shuffle == 1) {
      this.setData({
        shuffle: 2
      })
      return
    }
    if (this.data.shuffle == 2) {
      this.setData({
        shuffle: 3
      })
      return
    }
    if (this.data.shuffle == 3) {
      this.setData({
        shuffle: 1
      })
    }
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: 'light轻音乐：' + that.data.audioList[that.data.audioIndex].name,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    }
  }
})
