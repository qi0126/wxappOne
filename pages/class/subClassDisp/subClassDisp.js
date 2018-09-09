// pages/class/subClassDisp/subClassDisp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    imgStatus: {
      a: '/images/class/checkedTrue.png',
      b: '/images/class/checkedFalse.png',
    },//选择（单选和多选按钮图片地址）
    manList: [{//适合人群
      'id': '001',
      'value': '女士',
      'checked': false
    }, {
      'id': '002',
      'value': '男士',
      'checked': false
    }, {
      'id': '003',
      'value': '中性',
      'checked': false
    }, {
      'id': '004',
      'value': '情侣组合',
      'checked': false
    }],
    priceList: [{//适合人群
      'id': '001',
      'value': '价格升序',
      'checked': true
    }, {
      'id': '002',
      'value': '价格降序',
      'checked': false
    }],
    materList: [{//材质
      'id': '001',
      'value': 'K金',
      'checked': false
    }, {
      'id': '002',
      'value': 'PT950',
      'checked': false
    }, {
      'id': '003',
      'value': '纯银',
      'checked': false
    }, {
      'id': '004',
      'value': '镶嵌',
      'checked': false
    }],

  },

  //筛选弹出层出现
  show: function() {
    this.setData({
      flag: false
    })
  },

  //筛选弹出层消失
  hide: function() {
    console.log(this.data)
    this.setData({
      flag: true
    })
  },
  //适合人群选择
  PriceCheckbox:function(e){
    var self = this;
    for (let i = 0; i < self.data.priceList.length;i++){
      if (self.data.priceList[i].id == e.target.dataset.item.id){
        self.data.priceList[i].checked = true
      }else{
        self.data.priceList[i].checked = false
      }
    }
    this.setData({
      priceList: self.data.priceList
    })
  },
  //适合人群选择
  MaterCheckbox: function (e) {
    var self = this;
    for (let i = 0; i < self.data.materList.length; i++) {
      if (self.data.materList[i].id == e.target.dataset.item.id) {
        self.data.materList[i].checked = !self.data.materList[i].checked
        this.setData({
          materList: self.data.materList
        })
        return
      }
    }
  },
  //适合人群选择
  ManCheckbox: function (e) {
    var self = this;
    for (let i = 0; i < self.data.manList.length; i++) {
      if (self.data.manList[i].id == e.target.dataset.item.id) {
        self.data.manList[i].checked = !self.data.manList[i].checked
        this.setData({
          manList: self.data.manList
        })
        return
      }
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

  }
})