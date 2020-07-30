import request from '@/utils/request'

export function getDashboardList() {
  return request({
    url: '/dashbosrd/list',
    method: 'get'
  })
}