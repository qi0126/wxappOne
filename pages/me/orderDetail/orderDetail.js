const app = getApp()

Page({
  data: {
    list: [{}, {}],
    num: 0
  },

  goWishList() {
    wx.navigateTo({
      url: '/pages/me/wishList/wishList',
    })
  },

  goOrder() {
    wx.navigateTo({
      url: '/pages/me/order/order',
    })
  },

  goAddr() {
    wx.navigateTo({
      url: '/pages/me/address/address',
    })
  },

  goContact() {
    wx.navigateTo({
      url: '/pages/me/contact/contact',
    })
  },

  onLoad(options) {

  },

  onShow() {
  }

})
