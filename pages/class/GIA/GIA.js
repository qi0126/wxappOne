const app = getApp()

Page({
  data: {
    searInfo: ``
  },

  click(e) {
    const data = e.currentTarget.dataset.data
    if(data === 'CE') {
      this.setData({
        searInfo: ``
      })
      return
    }

    if (data === 'del') {
      this.setData({
        searInfo: this.data.searInfo.slice(0, this.data.searInfo.length - 1)
      })
      return
    }
    this.setData({
      searInfo: `${this.data.searInfo}${data}`
    })
  },

  goQuery() {
    wx.navigateTo({
      url: '/pages/class/queryResult/queryResult',
    })
  },

  onLoad(options) {

  },

  onShow() {
  }

})
