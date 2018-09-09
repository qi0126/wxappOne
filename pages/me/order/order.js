const app = getApp()

let list = { "code": 200, "data": { "rowSize": 1, "data": [{ "orderNo": "SZP20180831015", "orderType": 8, "orderStatus": 1, "orderCreateTime": "2018-08-31 20:45:22", "orderTotalWeight": "4.00", "userName": "客户B", "userId": 15690644, "orderSource": 1, "customerName": "子公司客户B", "saleName": "子公司业务002", "orderComeTime": "- - -", "startOrderTotalMoney": "60.00", "startOrderTotailWeight": "4.00", "orderTotalSum": 4, "orderTotalMoney": 60.0, "marking": "" }], "pageIndex": 1, "pageSize": 20, "first": 0, "fenPage": true }, "msg": "查询成功" }

Page({
  data: {
    imgSlide: {
      a: '/images/order/icon-down.png',
      b: '/images/order/icon-up.png'
    },
    searOrder: false,
    searTime: false,
    orderStatus: '1',
    searValue: '',
    classId: '',
    viewReasonStatus: false,
    blankTit: '退回原因',
    blankInfo: '暂无',
    num: 1,
    list: [{}]
  },

  goOrderDetail(e) {
    wx.navigateTo({
      url: '/pages/me/orderDetail/orderDetail',
    })
    // let data = e.currentTarget.dataset
    // switch (this.data.classId) {
    //   case '1':
    //     if (this.data.orderStatus === '2') {
    //       wx.navigateTo({
    //         url: `/pages/orderDetail/orderDetail?orderNo=${data.item.orderNo}`,
    //       })
    //     } else {
    //       wx.navigateTo({
    //         url: `/pages/orderDetail/orderDetail?orderNo=${data.item.orderNo}`,
    //       })
    //     }
    //     break;
    //   case '2':
    //     wx.navigateTo({
    //       url: `/pages/orderDetailMake/orderDetailMake?orderNo=${data.item.orderNo}`,
    //     })
    //     break;
    //   case '3':
    //     wx.navigateTo({
    //       url: `/pages/orderDetailback/orderDetailback?orderId=${data.item.id}`,
    //     })
    //     break;
    // }
  },

  changeSearTime(time) {
    return time.split('-').join('')
  },

  deleSear() {
    this.setData({
      searValue: ''
    })
  },

  search() {
    switch (this.data.classId) {
      case '1':
        this.getDetailData(this.data.searValue)
        break;
      case '2':
        this.getMakeData(this.data.searValue)
        break;
      case '3':
        this.getBackData(this.data.searValue)
        break
    }
  },

  startDateEv(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  endDateEv(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  searTimeTrue() {
    if (this.data.startDate === '开始日期') {
      app.$u.showToast('请输入开始日期')
      return
    }
    if (this.data.endDate === '结束日期') {
      app.$u.showToast('请输入结束日期')
      return
    }

    switch (this.data.classId) {
      case '1':
        this.getDetailData('', this.data.startDate, this.data.endDate)
        break;
      case '2':
        this.getMakeData('', this.data.startDate, this.data.endDate)
        break;
      case '3':
        this.getBackData('', this.data.startDate, this.data.endDate)
        break
    }
  },

  change(e) {
    this.setData({
      searValue: e.detail.value
    })
  },

  // 取消订单
  // cancelOrderClick(e) {
  //   let data = e.currentTarget.dataset
  //   app.$u.showModal('确定取消订单吗').then(e => {
  //     app.$api.orderCancelOrderStatus({ orderNo: data.item.orderNo }).then(res => {
  //       this.data.result.splice(data.index, 1)
  //       this.setData({
  //         result: this.data.result
  //       })
  //     })      
  //   })
  // },

  // 确认订单
  // trueOrderClick(e) { 
  //   let data = e.currentTarget.dataset
  //   app.$u.showModal('是否确认订单').then(e => {
  //     app.$api.operateOrderMake({ orderNo: data.item.orderNo }).then(res => {
  //       this.data.result[data.index].ud = 2
  //       this.setData({
  //         result: this.data.result
  //       })
  //     })
  //   })
  // },

  // 申请退货
  // backOrderClick(e) {
  //   let data = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: `/pages/orderDetail/orderDetail?orderNo=${data.item.orderNo}&backAndRef=1`
  //   })
  // },

  // 再来一单
  // againOrderClick(e) {
  //   let data = e.currentTarget.dataset
  //   wx.navigateTo({
  //     url: `/pages/orderDetail/orderDetail?orderNo=${data.item.orderNo}&backAndRef=1`
  //   })
  // },

  // 重新采购
  // repeatOrderClick(e) {
  // let data = e.currentTarget.dataset
  // wx.navigateTo({
  //   url: '/pages/shopOrderDetail/shopOrderDetail',
  // })
  // app.$api.orderCancelOrderStatus({ orderNo: data.item.orderNo }).then(res => {
  //   this.data.result.splice(data.index, 1)
  //   this.setData({
  //     result: this.data.result
  //   })
  // })
  // },

  // 查看原因
  // viewReasonClick(e) {
  // let data = e.currentTarget.dataset
  // wx.navigateTo({
  //   url: `/pages/orderDetail/orderDetail`,
  // })
  // app.$u.showModal('是否查看原因').then(e => {
  //   app.$api.orderCancelOrderStatus({ orderNo: data.item.orderNo }).then(res => {
  //     this.data.result.splice(data.index, 1)
  //     this.setData({
  //       result: this.data.result
  //     })
  //   })
  // })
  // },

  changeStatusClick(e) {
    let status = e.currentTarget.dataset.status
    this.setData({
      orderStatus: status,
      searTime: false,
      searOrder: false
    })
    this.getData()
  },

  searOrderSlide() {
    this.setData({
      searOrder: !this.data.searOrder,
      searTime: false
    })
  },

  searTimeSlide() {
    this.setData({
      searTime: !this.data.searTime,
      searOrder: false
    })
  },

  getDetailData(orderNo, startTime, endTime, num) {
    wx.setNavigationBarTitle({
      title: '采购订单',
    })
    if (!num) {
      num = 1
    }
    let params = {
      page: num,
      rows: 20,
      orderStatus: this.data.orderStatus,
    }
    if (orderNo) {
      Object.assign(params, { orderNo })
    }
    if (startTime && endTime) {
      Object.assign(params, { startTime, endTime })
    }
    Object.assign(params, { orderType: 8 })
    app.$u.showLoading()
    app.$api.orderFindOrderDetailByUserId(params).then(res => {
      if (res.data) {
        res.data.data.forEach(item => {
          item.type = '采购订单'
          // item.type = this.changeType(item.orderType)
        })
      }
      // 分页
      this.setData({
        result: res.data,
        list: num === 1 ? res.data.data : this.data.list.concat(res.data.data),
      })
      if (this.data.list && this.data.list.length >= res.data.rowSize) {
        this.setData({
          loadMore: true
        })
      } else {
        this.setData({
          loadMore: false
        })
      }
      // console.log(this.data.list, res.data.rowSize, this.data.loadMore)
    })
  },

  getMakeData(orderNo, startTime, endTime) {
    wx.setNavigationBarTitle({
      title: '客制订单',
    })
    let params = {
      orderStatus: this.data.orderStatus,
    }
    if (orderNo) {
      Object.assign(params, { orderNo })
    }
    if (startTime && endTime) {
      Object.assign(params, { startTime, endTime })
    }
    app.$u.showLoading()
    app.$api.orderFindOrderMakeDetailByMap(params).then(res => {
      if (res.data) {
        res.data.forEach(item => {
          item.type = '客制订单'
          // item.type = this.changeType(item.orderType)
        })
      }
      this.setData({
        result: res.data ? res.data : []
      })
    })
  },

  getBackData(orderNo, startTime, endTime) {
    wx.setNavigationBarTitle({
      title: '退货订单',
    })
    let orderStatus
    if (this.data.orderStatus === '3') {
      orderStatus = '4'
    } else if (this.data.orderStatus === '4') {
      orderStatus = '3'
    } else {
      orderStatus = this.data.orderStatus
    }
    let params = {
      orderStatus
    }
    if (orderNo) {
      Object.assign(params, { orderNo })
    }
    if (startTime && endTime) {
      Object.assign(params, { startTime, endTime })
    }
    app.$u.showLoading()
    app.$api.returnOrdersList(params).then(res => {
      if (res.data) {
        res.data.forEach(item => {
          item.orderTotalWeight = item.ordertotalweight
          item.orderCreateTime = app.$d(item.date).format('YYYY-MM-DD HH:mm:ss')
          // item.type = this.changeType(2)
          item.type = '退货订单'
        })
      }
      this.setData({
        result: res.data ? res.data : []
      })
    })
  },

  getData(num) {
    switch (this.data.classId) {
      case '1':
        this.getDetailData('', '', '', num)
        break;
      case '2':
        this.getMakeData()
        break;
      case '3':
        this.getBackData()
        break
      case '4':
        this.getSaleData()
        break
    }
  },

  onReachBottom(e) {
    this.loadMore()
  },

  loadMore() {
    this.setData({
      num: this.data.num + 1
    })
    this.getData(this.data.num)
  },

  onLoad(options) {
    console.log(options)
    // const classId = options.classId.toString(),
    //   orderStatus = options.status ? options.status.toString() : `1`
    // this.setData({
    //   classId,
    //   orderStatus
    // })
    // this.getData()
    this.setData({
      // list: list.data
    })
  },

  onShow() {
    this.getData()
  }

})
