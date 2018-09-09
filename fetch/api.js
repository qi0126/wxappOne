let CryptoJS = require('../utils/aes.js').CryptoJS 

//  加密aes
function Encrypt(word) { 
  var key = CryptoJS.enc.Utf8.parse("acdwessdbatar123");
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString(); 
} 
  
function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse("acdwessdbatar123");
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
 
// api设置
// let baseUrl = 'http://192.168.21.185/batar-sjy-front/' //xwh
// let baseUrl = 'https://front.batar.cn/' // cs 
let baseUrl = 'https://f.szsjysy.com/' // product
// let baseUrl = 'http://192.168.21.242:8080/' //yhs
// let baseUrl = 'http://192.168.21.38:8080/' // gzg
// let baseUrl = 'http://192.168.21.122:9091/batar-sjy-front/' // gy
// let baseUrl = 'http://192.168.21.46:8080/' //byb
 
class Api { 
  buildURL(url, needToken) { 
    let accessToken = false
    if (needToken === false) {
      return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'clientType=WXXCX'
    }
    if (wx.getStorageSync('accessToken')) {
      accessToken = wx.getStorageSync('accessToken')
    }
    if (!accessToken) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return false
    }
    return url
  }
 
  /**
   * 请求设置
   * params { string } url 请求地址
   * parmas { object } params  请求参数
   */
  get(url, params, needToken) {
    url = api.buildURL(url, needToken)
    if (!url) {
      return
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: params,
        header: {
          'accessToken': Encrypt(`${new Date().getTime()},${wx.getStorageSync('accessToken')}`),
          'clientType': 'WXXCX'
        },
        success(res) {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          if (res.data.code === 200) {
            resolve(res.data)
          } else if (res.data.code === 203) {
            reject(res)
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }, 800)
          } else if(res.data.code === 205) {
            resolve(res.data)
          } else {
            reject(res)
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
          }
        } 
      }) 
    })
  }

  // 循环获取消息
  getLoop(url, params, needToken) {
    url = api.buildURL(url, needToken)
    if (!url) {
      return
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: params,
        header: {
          'accessToken': Encrypt(`${new Date().getTime()},${wx.getStorageSync('accessToken')}`),
          'clientType': 'WXXCX'
        },
        success(res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            resolve(res.data)
          }
        }
      })
    })
  }

  post(url, params, needToken) {
    url = api.buildURL(url, needToken)
    if (!url) {
      return
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: 'POST',
        data: params,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'accessToken': Encrypt(`${new Date().getTime()},${wx.getStorageSync('accessToken')}`),
          'clientType': 'WXXCX'
        },
        success(res) {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          if (res.data.code === 200) {
            resolve(res.data)
          } else if (res.data.code === 203) {
            reject(res)
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }, 800)
          } else if (res.data.code === 205) {
            resolve(res.data)
          } else {
            reject(res)
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
          }
        }
      })
    })
  }

  // 上传
  updataAvatar(url, params) {
    url = api.buildURL(url, true)
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        success(res) {
          let tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: baseUrl + url,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: params,
            header: {
              'accessToken': Encrypt(`${new Date().getTime()},${wx.getStorageSync('accessToken')}`),
              'clientType': 'WXXCX'
            },
            success(res) {
              res = JSON.parse(res.data)
              resolve(res)
            },
            fail () {
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            }
          })
        }
      })
    })
  }

  /**
   * Api列表
   */

  // 上传图片
  commonUploadImg(params) {
    return api.updataAvatar('uploadImg', params)
  }
  
  // 海生
  // 添加购物车
  addCarts(params) {
    return api.post('cart/addCarts', params)
  }
  
  // 尚臻品单款加入购物车
  addSingleCart(params) {
    return api.post('cart/addSingleCart', params)
  }
 
  // 尚臻品套装加入购物车
  addSuitCart(params) {
    return api.post('cart/addSuitCart', params)
  }

  // 尚臻品查询购物车
  findAppletCarts(params) {
    return api.get('cart/findAppletCarts', params)
  }  

  // 尚臻品查询单品
  findSuitCartById(params) {
    return api.get('cart/findSuitCartById', params)
  }

  // 尚臻品确认下单页面
  sureSuitOrders(params) {
    return api.get('order/sureSuitOrders', params)
  }

  // 尚臻品购物车下单
  overAppletOrders(params) {
    return api.get('order/overAppletOrders', params)
  }

  // 尚臻品删除购物车
  deleteSuitCarts(params) {
    return api.get('cart/deleteSuitCarts', params)
  }

  // 尚臻品重新采购
  onceAgainBuySuitOrders(params) {
    return api.post('order/onceAgainBuySuitOrders', params)
  }

  // 查询购物车
  findCarts(params) {
    return api.get('cart/findCarts', params)
  }

  // 修改
  cartUpdataMakeCarts(params) {
    return api.post('cart/updataMakeCarts', params)
  }
 
  // 删除购物车
  deleteCarts(params) {
    return api.get('cart/deleteCarts', params)
  }

  // 删除购物车产品属性
  deleteCartProperty(params) {
    return api.post('cart/deleteCartProperty', params)
  }
 
  // 客制单购物车添加
  addMakeCarts(params) {
    return api.post('cart/addMakeCarts', params)
  }

  // 客制单购物车查询
  findMakeCarts(params) {
    return api.get('cart/findMakeCarts', params)
  }

  // 删除购物车客制单数据
  deleteMakeCartByIds(params) {
    return api.post('cart/deleteMakeCartByIds', params)
  }

  // 删除购物车客制单的产品属性数据
  deleteMakeProducPerById(params) {
    return api.post('cart/deleteMakeProducPerById', params)
  }

  // 标准单快速单
  cartSureOrdersSpeed(params) {
    return api.post('order/sureOrdersSpeed', params)
  }
 
  // 标准单购物车进入确认下单
  orderSureOrders(params) {
    return api.post('order/sureOrders', params)
  }

  // 克制单购物车进入确认下单
  orderSureKZOrders(params) {
    return api.post('order/sureKZOrders', params)
  }

  // 查询购物车单条数据
  cartFindCartById(params) {
    return api.get('cart/findCartById', params)
  }

  // 查询克制单购物车单条数据
  cartFindCartMakeById(params) {
    return api.get('cart/findCartMakeById', params)
  }

  // 标准购物车创建订单
  orderOverOrders(params) {
    return api.post('/order/overOrders', params)
  }

  // 客制单购物车创建订单
  orderOverKZOrders(params) {
    return api.post('order/overKZOrders', params)
  }
 
  // 快速下单创建订单
  orderSpeedOrderStand(params) {
    return api.post('order/speedOrderStand', params)
  }

  // 采购单查询
  orderFindOrderDetailByUserId(params) {
    return api.post('order/findOrderDetailByUserId', params)
  }

  // 克制单查询
  orderFindOrderMakeDetailByMap(params) {
    return api.post('order/findOrderMakeDetailByMap', params)
  }
 
  // 标准单订单详情
  selectOrderDetailByOrderNo(params) {
    return api.post('order/selectOrderDetailByOrderNo', params, false)
  }

  // 克制单订单详情（新单）
  selectOrderMakeDetailByOrderNo(params) {
    return api.post('order/selectOrderMakeDetailByOrderNo', params, false)
  }

  // 克制单订单详情(原单)
  selectOrderMakeDetail(params) {
    return api.post('order/selectOrderMakeDetail', params)
  }

  // 采购单删除订单
  deleteOrders(params) {
    return api.post('order/deleteOrders', params)
  }  

  // 定值单删除订单 
  deleteOrdersMake(params) {
    return api.post('order/deleteOrdersMake', params)
  } 

  // 取消订单
  orderCancelOrderStatus(params) {
    return api.post('order/cancelOrderStatus', params)
  }

  // 克制单取消订单
  cancelOrdersMake(params) {
    return api.post('order/cancelOrdersMake', params)
  }

  // 克制单确认订单
  operateOrderMake(params) {
    return api.post('order/operateOrderMake', params)
  }

  // 再来一单 标准单
  oneAgaentOrders(params) {
    return api.post('order/oneAgaentOrders', params)
  } 

  // 再来一单 克制单
  oneAgaentOrderMake(params) {
    return api.post('order/oneAgaentOrderMake', params)
  }

  // 重新采购 标准单
  onceAgainBuyOrders(params) {
    return api.post('order/onceAgainBuyOrders', params)
  }

  // 重新采购 克制单
  onceAgainBuyOrdersMake(params) {
    return api.post('order/onceAgainBuyOrdersMake', params)
  }

  // 重新采购下单 克制单
  orderMakeStand(params) {
    return api.post('order/orderMakeStand', params)
  }

  // 白怡波
  // 申请退货
  addOReturnOrders(params) {
    return api.post('returnOrder/addOReturnOrders', params)
  }

  // 退货列表
  returnOrdersList(params) {
    return api.post('returnOrder/findReorderByStaAndComId', params)
  }

  // 退货详情
  returnOrdersFrom(params) {
    return api.get('returnOrder/ReturnOrdersFrom', params)
  }

  // 取消退货
  cancelReturnOrders(params) {
    return api.get('returnOrder/cancelReturnOrders', params)
  }

  // 重新退货
  newReturnOrder(params) {
    return api.get('returnOrder/newReturnOrder', params)
  }

  // 夏文浩
  // 尚臻品首页
  prosIndex(params) {
    return api.post('pro/s/index', params)
  }

  // 尚臻品首页系列列表
  proSeriesList(params) {
    return api.get('pro/seriesList', params)
  }

  // 首页产品
  proIndex(params) {
    return api.post('pro/index', params)
  }

  // 产品详情
  proInfo(params) {
    return api.get('pro/info', params)
  }

  // 首页分类
  proCode(params) {
    return api.get('code/index', params)
  }

  // banner
  proBanner(params) {
    return api.get('pro/banner', params)
  }

  // 添加标签
  proAddDesc(params) {
    return api.post('pro/addDesc', params)
  }

  // 点击收藏
  collClick(params) {
    return api.get('coll/click', params)
  }

  // 我的收藏
  collList(params) {
    return api.get('coll/list', params)
  }

  // 标准单
  codeStandard(params) {
    return api.get('code/standard', params)
  }

  // 标准单搜索
  proStandard(params) {
    return api.post('pro/standard', params)
  }
 
  // 客制单
  codeGuest(params) {
    return api.get('code/guest', params)
  }

  // 郭志刚
  // 用户登录
  accountLogin(params) {
    return api.post('account/login', params, false)
  }

  // 用户退出
  accountLogout(params) {
    return api.get('account/logout', params)
  }

  // 查看用户信息
  accountMyinfo(params) {
    return api.get('account/getinfo', params)
  }

  // 修改当前用户信息
  accountUpdateInfo(params) {
    return api.post('account/updateInfo', params)
  }

  // 修改头像
  companyUpdateLogo(params) {
    return api.get('company/updateLogo',params)
  }
 
  // 修改密码
  accountChangePassword(params) {
    return api.post('account/changePassword', params)
  }

  // 收货地址 
  deliveryDeliveryInfo(params) {
    return api.get('delivery/deliveryInfo', params)
  }

  // 查询默认收获地址
  deliveryDefaultDelivery(params) {
    return api.get('delivery/defaultDelivery', params)
  } 

  // 根据id查询地址
  deliveryQueryDelivery(params) {
    return api.get('delivery/queryDelivery', params)
  }

  // 创建收获地址
  deliveryCreateDelivery(params) {
    return api.post('delivery/createDelivery', params)
  }

  // 修改收货地址
  deliveryUpdateDelivery(params) {
    return api.post('delivery/updateDelivery', params)
  }

  // 删除地址
  deliveryDeleteDelivery(params) {
    return api.get('delivery/deleteDelivery', params)
  }

  // 查看自己公司信息
  companySimpleinfo(params) {
    return api.get('company/simpleinfo', params)
  }

  // 修改公司信息
  companyUpdateMyCompany(params) {
    return api.post('company/updateMyCompany', params)
  }

  // 查看公司职员帐号
  accountSub(params) {
    return api.post('account/sub', params)
  }

  // 编辑公司职员帐号信息
  accountUpdateSub(params) {
    return api.post('account/updateSub', params)
  }

  // 创建职员帐号(子帐号)
  accountCreateSub(params) {
    return api.post('account/createSub', params)
  }

  // 查看公司角色列表
  companyQueryRoles(params) {
    return api.post('company/queryRoles', params)
  }

  // 创建订单获取id
  companyQuerySubsidiaryId(params) {
    return api.get('company/querySubsidiaryId', params)
  }

  // 查看未读消息数
  msgUnreadCount(params) {
    return api.getLoop('msg/unreadCount', params, false)
  }

  // 查看消息
  msgQueryMsg(params) {
    return api.post('msg/queryMsg', params)
  }

  // 查看消息的筛选条件
  msgFiltrate(params) {
    return api.post('msg/filtrate', params)
  }

  // 点击消息改变状态
  msgSetRead(params) {
    return api.get('msg/setRead', params)
  }

  // 删除消息
  msgDelMsg(params) {
    return api.get('msg/delMsg', params)
  }

  // 批量删除消息
  msgDelMsgBatch(params) {
    return api.get('msg/delMsgBatch', params)
  }

  // 微信小程序自动登录
  wxAppLogin(params) {
    return api.get('wx/appLogin', params, false)
  }

  // 微信小程序绑定用户
  wxWxBinding(params) {
    return api.get('wx/wxBinding', params, false)
  }

  // 微信小程序切换账号
  wxWxSwitch(params) {
    return api.get('wx/switch', params, false)
  }

  // 郭煜
  // 确认下单页面存欠
  stockAccountOrder(params) {
    return api.get('stock/account/order/currentaccount', params)
  } 
}

let api = new Api()

export default api