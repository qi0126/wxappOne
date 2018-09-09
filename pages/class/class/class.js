// pages/class/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    flag: true,
    inputValue: '',
    imgDispList: [{ //图片数组
      'id': '001',
      'value': '#戒指',
      'endValue': 'RING',
      'imgBig': '/images/class/class01big.jpg',
      'imgSmall': '/images/class/class01small.jpg',
      'routerURL':'/pages/class/subClassDisp/subClassDisp',
      'checked': true
    }, {
      'id': '002',
      'value': '#项链',
      'endValue': 'NECKLACE',
      'imgBig': '/images/class/class02big.jpg',
      'imgSmall': '/images/class/class02small.jpg',
        'routerURL': '/pages/class/subClassDisp/subClassDisp',
      'checked': false
    }, {
      'id': '003',
      'value': '#耳饰',
      'endValue': 'EARRINGS',
      'imgBig': '/images/class/class03big.jpg',
      'imgSmall': '/images/class/class03small.jpg',
        'routerURL': '/pages/class/subClassDisp/subClassDisp',
      'checked': false
    }, {
      'id': '004',
      'value': '#手环',
      'endValue': 'BRACELET',
      'imgBig': '/images/class/class04big.jpg',
      'imgSmall': '/images/class/class04small.jpg',
        'routerURL': '/pages/class/subClassDisp/subClassDisp',
      'checked': false
    }, {
      'id': '005',
      'value': '#吊坠',
      'endValue': 'PENDANT',
      'imgBig': '/images/class/class05big.jpg',
      'imgSmall': '/images/class/class05small.jpg',
      'routerURL': '/pages/class/subClassDisp/subClassDisp',
      'checked': false
    }],
  },
  // 点击图片放大事件
  ImgCheckbox: function(e) {
    var self = this;
    // console.log(e);
    // console.log(this.data)

    for (let i = 0; i < self.data.imgDispList.length; i++) {
      if (self.data.imgDispList[i].id == e.currentTarget.dataset.item.id) {
        self.data.imgDispList[i].checked = true
      } else {
        self.data.imgDispList[i].checked = false
      }
    }
    this.setData({
      imgDispList: self.data.imgDispList
    })
  },

  goQuery() {
    wx.navigateTo({
      url: '/pages/class/diamondQuery/diamondQuery',
    })
  },

  //路由跳转
  RouterCheck:function(e){
    this.ImgCheckbox(e)
    if (e.currentTarget.dataset.item.routerURL){
      wx.navigateTo({
        url: e.currentTarget.dataset.item.routerURL,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 弹出层函数
   */
  //出现
  show: function() {

    this.setData({
      flag: false
    })

  },
  //消失

  hide: function() {

    this.setData({
      flag: true
    })

  },

})