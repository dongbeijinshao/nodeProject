import request from '@/utils/request'

// 用户注册
export function registered(data) {
  return request({
    url: '/user/reg',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(params=null) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }