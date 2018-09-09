import api from 'fetch/api'
import util from 'utils/util'
import date from 'utils/date'
import validate from 'utils/validate'
import { city } from 'utils/citydata'


// let $img = 'https://img.batar.cn/';
const $img = 'https://image.szsjysy.com',
  $simg = 'https://img.batar.cn'



App({
  onLaunch() {

  },

  onShow() {

  },

  globalData: {
    useInfo: null
  },

  $api: api,

  $img,

  $simg,

  $u: util,

  $city: city,

  $d: date,

  $v: validate
})
