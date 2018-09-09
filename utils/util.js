
class util {
  constructor() { }

  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  // 对象数组去重
  unique(arr) {
    let unique = {};
    arr.forEach((item) => {
      unique[JSON.stringify(item)] = item;
    })
    arr = Object.keys(unique).map(function (u) {
      return JSON.parse(u);
    })
    return arr;
  }

  // 对象数组去重 根据name
  repetName(arr) {
    let unique = {}
    var hash = {};
    return arr.reduce((item, next) => {
      hash[next.name] ? '' : hash[next.name] = true && item.push(next);
      return item
    }, [])
  }

  min(arr) {
    let min = arr[0];
    let len = arr.length;
    for (let i = 1; i < len; i++) {
      if (arr[i] < min) {
        min = i;
      }
    }
    return min;
  }

  max(arr) {
    let max = arr[0];
    let len = arr.length;
    for (let i = 1; i < len; i++) {
      if (arr[i] > max) {
        max = i;
      }
    }
    return max;
  }

  // 数组对象排序
  compareArr(property) {
    return (obj1, obj2) => {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value2 - value1;
    }
  }

  // map转换对象
  strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  // 对象转换map
  objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }


  china(str) {
    if (/.*[\u4e00-\u9fa5]+.*/.test(str)) {
      return true
    } else {
      return false
    }
  }

  // arr2 属于 arr1
  compare(arr1, arr2) {
    let result = true;
    for (let i = arr2.length - 1; i >= 0; i--) {
      let index = arr1.indexOf(arr2[i]);
      if (index === -1) {
        result = false;
        break;
      }
    }
    return result;
  }

  // 确定取消弹窗
  showModal(cont) {
    return new Promise((reslove, reject) => {
      wx.showModal({
        title: '提示',
        content: cont,
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#333',
        confirmText: '确定',
        confirmColor: '#a71c20',
        success(res) {
          if (res.confirm) {
            reslove(res)
          } else if (res.cancel) {
            reject(res)
          }
        },
      })
    })
  }

  // toast
  showToast(cont) {
    return new Promise((reslove, reject) => {
      wx.showToast({
        title: cont,
        icon: 'none',
        mask: true,
        success(res) {
          reslove(res)
        }
      })
    })
  }

  // loading
  showLoading() {
    return new Promise((reslove, reject) => {
      wx.showLoading({
        title: '',
        mask: true,
        success (res) {
          reslove(res)
        },
      })
    })
  }

  // qs简化版
  fomartParams(obj) {
    let newKeys = Object.keys(obj).sort()
    let newObj = {}
    for (let i = 0; i < newKeys.length; i++) {
      newObj[newKeys[i]] = obj[newKeys[i]]
    }
    let result = ''
    for (let it in newObj) {
      if (Object.prototype.toString.call(newObj[it]) === '[object Array]') {
        newObj[it].forEach(val => {
          result += it + '=' + val + '&'
        });
      } else {
        result += it + '=' + newObj[it] + '&';
      }
    }
    result = result.substring(0, result.length - 1)
    return result;
  }


}



export default new util()
