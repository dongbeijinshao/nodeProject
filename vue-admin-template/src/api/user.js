import request from '@/utils/request'

// 用户注册
export function registered(data) {
  return request({
    url: '/user/reg',
    method: 'post',
    data
  })
}

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户详情
export function getInfo(params = null) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
