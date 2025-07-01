import pageApi from './mockData/pageApi.js'
import http from './http.js'
import { ref } from 'vue'

// uniapp 提供的跨平台环境变量
const isH5 = process.env.UNI_PLATFORM === 'h5'
const isMp = process.env.UNI_PLATFORM !== 'h5'

export const getBanner = () => {
  if (isH5) {
    // H5环境走http请求，mockjs会自动拦截
    return http('/user/getBanner')
  } else {
    // 小程序环境，直接返回本地数据，包装成Promise
    return Promise.resolve(pageApi.getBanner().data)
  }
}

export const getHomeList = () => {
  if (isH5) {
    return http('/user/getHomeList')
  } else {
    return Promise.resolve(pageApi.getHomeList().data)
  }
}

export const getAlbumImages = (albumId) => {
  if (isH5) {
    return http({
      url: '/album/images',
      method: 'POST',
      data: { albumId }
    })
  } else {
    return Promise.resolve(pageApi.flowList(albumId))
  }
}

// // 登录
// export const login = (code) => {
// 	return http('/login', { code }, 'POST')
// }

// //获取用户信息
// export const getUserInfo = () => {
// 	return http('/getUserInfo')
// }
export const login = (code) => {
  if (isH5) {
    return http({
      url: '/login',
      method: 'POST',
      data: { code }
    })
  } else {
    return Promise.resolve({
      token: 'mocked_token_123456'
    })
  }
}

export const getUserInfo = () => {
  if (isH5) {
    return http('/getUserInfo')
  } else {
    return Promise.resolve({
      avatarUrl: '/static/catcats.jpg',
      nickName: '测试用户'
    })
  }
}

// 我的收藏
export const collectList = () => {
	return http('/collect/list')
}