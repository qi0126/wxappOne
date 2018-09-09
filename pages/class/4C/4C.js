const app = getApp()

Page({
  data: {
    $simg: app.$simg,
    siziBg: `${app.$simg}/class/img-size.png`,
    colorBg: [
      `${app.$simg}/class/color/D@2x.png`,
      `${app.$simg}/class/color/E@2x.png`,
      `${app.$simg}/class/color/F@2x.png`,
      `${app.$simg}/class/color/G@2x.png`,
      `${app.$simg}/class/color/H@2x.png`,
      `${app.$simg}/class/color/I@2x.png`,
      `${app.$simg}/class/color/J@2x.png`
    ],
    clarBg: [
      `${app.$simg}/class/clarity/VVSI@2x.png`,
      `${app.$simg}/class/clarity/VVS2@2x.png`,
      `${app.$simg}/class/clarity/VS1@2x.png`,
      `${app.$simg}/class/clarity/VS2@2x.png`,
      `${app.$simg}/class/clarity/SI1@2x.png`,
      `${app.$simg}/class/clarity/SI2@2x.png`,
    ],
    cutBg: [
      `${app.$simg}/class/cut/EX.png]`,
      `${app.$simg}/class/cut/GD.png]`,
      `${app.$simg}/class/cut/VG.png]`
    ],

    // 克拉
    caratScaleStart: 20,
    caratScale: 20,
    caratScaleList: [20, 55, 82, 137, 178, 218, 268, 308, 316],

    // 颜色
    colorScaleStart: 20,
    colorScale: 20,
    colorScaleList: [20, 69, 122, 176, 231, 285, 316],

    // 净度
    clarityScaleStart: 20,
    clarityScale: 20,
    clarityScaleList: [20, 80, 145, 210, 225, 316],

    // 切工
    cutScaleStart: 20,
    cutScale: 20,
    cutScaleList: [20, 123, 231, 316],
    
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

  diChange(e) {
    console.log(e)
    const data = e.detail.value

    this.setData({
      size: 3
    })

    console.log(data)

  },

  colorChange(e) {
    const data = e.detail.value

    this.setData({
      colorBg: `${app.$simg}/class/color/J@2x.png`
    })
    console.log(e)
  },

  caChange(e) {
    const data = e.detail.value

    this.setData({
      clarBg: `${app.$simg}/class/color/J@2x.png`
    })
    console.log(e)
  },

  cutChange(e) {
    const data = e.detail.value

    this.setData({
      cutBg: `${app.$simg}/class/color/J@2x.png`
    })
    console.log(e)
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
        }),
      offset = this.offset({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        }, data)

    // this.setData({
    //   [rotate]: angle * 2
    // })
    // if (Math.abs(angle) > 30) { return }
    // if (touchMoveX > startX) {
    //   moveDire = 1
    // } else {
    //   moveDire = 2
    // }

  },

  touchend(e) {
    const data = e.currentTarget.dataset.data
    let dataStart = `${data}Start`
    this.setData({
      [dataStart]: this.data[data]
    })
    console.log(this.data[`${data}Start`])
  },

  offset(start, end, data) {
    let dataStart = `${data}Start`
    let dataList = `${data}List`
    this.setData({
      [data]: this.data[dataStart] + (end.X - start.X),
    })
    
    // 最大
    if (this.data[data] >= this.data[dataList][this.data[dataList].length -1]) {
      this.setData({
        [data]: this.data[dataList][this.data[dataList].length - 1]
      })
    }

    // 最小
    if (this.data[data] <= this.data[dataList][0]) {
      this.setData({
        [data]: this.data[dataList][0]
      })
    }
    
    this.count(start, end, data, this.data[dataList],(num, callData) => {
      console.log(num, callData)
    })

  },

  count(start, end, data, arr, callback) {
    let cont = this.data[data]
    if (end.X - start.X >= 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > cont) {
          callback(arr[i], data)
          return
        }
      }
    }
    if (end.X - start.X <= 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= cont && arr[i + 1] >= cont) {
          callback(arr[i], data)
          return
        }
      }
    }
  },

  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  onLoad(options) {
    let start = 375, end, self = this;
    wx.getSystemInfo({
      success(res) {
        end = res.screenWidth/375
        self.setData({
          baseNum: end
        })
      }
    })
    this.setData({
      caratScaleStart: parseInt((this.data.caratScaleStart * this.data.baseNum).toFixed(2)),
      caratScale: parseInt((this.data.caratScale * this.data.baseNum).toFixed(2)),
      caratScaleList: this.data.caratScaleList.map(item => parseInt((item * this.data.baseNum).toFixed(2))),
      colorScaleStart: parseInt((this.data.colorScaleStart * this.data.baseNum).toFixed(2)),
      colorScale: parseInt((this.data.colorScale * this.data.baseNum).toFixed(2)),
      colorScaleList: this.data.colorScaleList.map(item => parseInt((item * this.data.baseNum).toFixed(2))),
      clarityScaleStart: parseInt((this.data.clarityScaleStart * this.data.baseNum).toFixed(2)),
      clarityScale: parseInt((this.data.clarityScale * this.data.baseNum).toFixed(2)),
      clarityScaleList: this.data.clarityScaleList.map(item => parseInt((item * this.data.baseNum).toFixed(2))),
      cutScaleStart: parseInt((this.data.cutScaleStart * this.data.baseNum).toFixed(2)),
      cutScale: parseInt((this.data.cutScale * this.data.baseNum).toFixed(2)),
      cutScaleList: this.data.cutScaleList.map(item => parseInt((item * this.data.baseNum).toFixed(2))),
    })
  },

  onShow() {
  }

})
