const app = getApp()

let list = [{ checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }, { checkbox: false }]

Page({
  data: {
    list: [{}, {}],
    imgStatus: {
      a: '/images/shop/icon-true.png',
      b: '/images/shop/icon-false.png'
    },
    checkboxList: [],
    checkboxAll: false,
    num: 0
  },

  // 标准款清空checkbox
  defclearCheckbox() {
    if (this.data.list) {
      this.data.list.forEach(item => {
        item.checkbox = false
      })
      this.setData({
        defCheckAll: false,
        list: this.data.list
      })
      this.getCheckbox()
    }
  },

  // 点击多选
  checkbox(e) {
    let data = e.currentTarget.dataset
    console.log(data)
    this.data.list[data.index].checkbox = !this.data.list[data.index].checkbox
    this.setData({
      list: this.data.list
    })
    this.getCheckbox()
  },

  // 全选
  checkboxAll(e) {
    this.data.checkboxAll = !this.data.checkboxAll
    this.data.list.forEach(item => {
      item.checkbox = this.data.checkboxAll
    })
    this.setData({
      checkboxAll: this.data.checkboxAll,
      list: this.data.list
    })
    this.getCheckbox()
  },

  getCheckbox() {
    this.data.checkboxList = []
    this.data.list.forEach(item => {
      if (item.checkbox) {
        this.data.checkboxList.push(item.id)
      }
    })
  },

  defDel(e) {
    if (this.data.checkboxList.length === 0) {
      return
    }
    const params = this.data.checkboxList.join(','),
      self = this
    app.$u.showModal('确定删掉选中产品吗').then(e => {
      // app.$api.deleteCarts({
      //   ids: params
      // }).then(res => {
      //   app.$u.showToast('删除成功')
      //   self.data.result.forEach((item, index) => {
      //     if (item.checkbox) {
      //       item.hide = true
      //     }
      //   })
      //   self.setData({
      //     defAllCount: {},
      //     defEdit: false,
      //     result: self.data.result
      //   })
      //   this.defGetCheckbox()
      //   this.getData()
      // })
    })
  },

  editShop() {
  },

  onLoad(options) {

  },

  onShow() {
    this.setData({
      list: list
    })

    console.log(this.data.list)
  }

})