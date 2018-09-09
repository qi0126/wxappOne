const app = getApp()

Page({
  data: {
    weightList: []
  }, 

  goGIA() {
    wx.navigateTo({
      url: '/pages/class/GIA/GIA',
    })
  },

  goDiamond() {
    wx.navigateTo({
      url: '/pages/class/diamondRotate/diamondRotate',
    })
  },


  // 滑动删除
  touchstart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })
  },

  touchmove(e) {
    let that = this,
      data = e.currentTarget.dataset.data,
      startX = this.data.startX,
      startY = this.data.startY,
      touchMoveX = e.changedTouches[0].clientX,
      touchMoveY = e.changedTouches[0].clientY,
      moveDire = `moveDire${data}`,
      rotate = `rotate${data}`,
      angle = this.angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        })
        
    this.setData({
      [rotate]: angle * 2
    })
    if (Math.abs(angle) > 30) { return }
    if (touchMoveX > startX) {
      moveDire = 1
    } else {
      moveDire = 2
    }
    
  },

  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  go4C() {
    wx.navigateTo({
      url: '/pages/class/4C/4C',
    })
  },

  onLoad(options) {

  },

  onShow() {
    let scale = 360/20
    for(let i = 0; i < 20; i ++) {
      this.data.weightList.push({ num: i, rotate: i * scale})
    }
    this.setData({
      weightList: this.data.weightList
    })
  }

})
