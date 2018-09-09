// pages/class/subClassDisp/subClassDisp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,//筛选弹出框
    designerFlag:true,//设计师弹出框
    designerDetailFlag:true,//设计师详情弹出框
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
    seriesList: [{//系列
      'id': '001',
      'value': '不限系列',
      'checked': false
    }],
    classList: [{//分类
      'id': '001',
      'value': '戒指',
      'checked': false
    }, {
      'id': '002',
      'value': '项链',
      'checked': false
    }, {
      'id': '003',
      'value': '耳饰',
      'checked': false
    }, {
      'id': '004',
      'value': '吊垫',
      'checked': false
      }, {
        'id': '005',
        'value': '手环',
        'checked': false
      }],
    priceList: [{//价格排序
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
    designerList: [{//设计师列表
      'id': '001',
      'name': 'Christy Brinkley',
      'sex': '女',
      'city':'意大利'
    }, {
        'id': '002',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      }, {
        'id': '003',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      }, {
        'id': '004',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      },{
        'id': '005',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      }, {
        'id': '006',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      }, {
        'id': '007',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
      }, {
        'id': '008',
        'name': 'Christy Brinkley',
        'sex': '女',
        'city': '意大利'
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
    this.setData({
      flag: true
    })
  },
  //设计师弹出层出现
  designerShow: function () {
    this.setData({
      designerFlag: false
    })
  },

  //设计师弹出层消失
  designerHide: function () {
    this.setData({
      designerFlag: true
    })
  },
  //设计师详情弹出层出现
  designerDetailShow: function () {
    this.setData({
      designerFlag: true,
      designerDetailFlag: false
    })
  },

  //设计师详情弹出层消失
  designerDetailHide: function () {
    this.setData({
      designerDetailFlag: true
    })
  },
  returnDesigner:function(){
    this.setData({
      designerFlag: false,
      designerDetailFlag: true
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