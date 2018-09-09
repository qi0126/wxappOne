const app = getApp()

const list = { "code": 200, "data": [{ "addrId": 14, "receiver": "刘德华", "address": "神马地址啊", "telephone": "15877885566", "province": "河北省", "city": "唐山市", "district": "开平区", "isDefault": "Y", "createTime": "Aug 28, 2018 6:31:05 PM", "updateTime": "Aug 28, 2018 6:31:05 PM" }], "msg": "查询成功" }

Page({
  data: {
    list: [],
    num: 0,
  },

  deleAddress(e) {
    let data = e.currentTarget.dataset, self = this
    app.$u.showModal('确定删除地址吗？').then(e => {
      app.$api.deliveryDeleteDelivery({ addrId: data.item.addrId }).then(res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        self.data.list.splice(data.index, 1)
        self.setData({
          list: this.data.list
        })
      })
    }).catch(err => {
      this.data.list.forEach(item => {
        item.isTouchMove = false
      })
    })
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

  EditAddr() {
    wx.navigateTo({
      url: `/pages/me/address/address?item=1`,
    })
  },

  goContact() {
    wx.navigateTo({
      url: '/pages/me/contact/contact',
    })
  },

  goAddress() {
    wx.navigateTo({
      url: '/pages/me/addAddr/addAddr',
    })
  },

  onLoad(options) {
    this.setData({
      list: list.data
    })
    console.log(this.data.list)
  },

  onShow() {
  }

})
