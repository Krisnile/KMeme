import Mock from 'mockjs'
import pageApi from './mockData/pageApi'

Mock.mock(/api\/user\/getBanner/, 'get', pageApi.getBanner)
Mock.mock(/\/api\/user\/getHomeList/, 'get', pageApi.getHomeList)

console.log('[mock] mock服务已启用')