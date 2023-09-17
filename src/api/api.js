import request from '@/utils/request'
import Qs from 'qs'

const courseInfoApi = {
  // 获取商品列表
  getDouGoods: data => request({
    url: `goods/getDouGoods`,
    method: 'post',
    data
  }),
  // 支付宝验证
  checkname: data => request({
    url: `Checkname`,
    method: 'post',
    data
  }),
  // 获取每天下单数
  getconfig:  data => request({
    url: `orders/courseInfo`,
    method: 'post',
    data
  }),
  // 立即购买
  getDycode: data => request({
    url: `goods/getDycode`,
    method: 'post',
    data
  }),
  // 获取订单
  orderList: data => request({
    url: `orders/orderlistforuser`,
    method: 'post',
    data
  }), 
  // 验证码登录
  checklogin: data => request({
    url: `login/checklogin`,
    method: 'post',
    data
  }), 
  // 发送验证码
  sendPhoneSms: data => request({
    url: `login/postVercode`,
    method: 'post',
    data
  }),
  // 提现
  douwithdraw: data => request({
    url: `DouwithdrawMdSave`,
    method: 'post',
    data
  }),
  // 获取用户信息
  getUserInfo: data => request({
    url: `user/getUserInfo`,
    method: 'post',
    data
  }),

  // 领取补提
  receive: data => request({
    url: `orderStatus`,
    method: 'post',
    data
  }),
}

export default courseInfoApi
