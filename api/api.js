import pageApi from './mockData/pageApi.js'
import http from './http.js'

// 小程序使用 mock 数据
const isMock = process.env.NODE_ENV === 'development' && process.env.UNI_PLATFORM !== 'h5'

/**
 * 获取 Banner 列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} Banner 数据。
 */
export const getBanner = () => {
	if (isMock) {
		return Promise.resolve(pageApi.getBanner().data)
	}
	return http({
		url: '/user/getBanner',
		method: 'GET'
	})
}

/**
 * 获取首页列表数据。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} 首页列表数据。
 */
export const getHomeList = () => {
	if (isMock) {
		return Promise.resolve(pageApi.getHomeList().data)
	}
	return http({
		url: '/user/getHomeList',
		method: 'GET'
	})
}

/**
 * 获取相册图片列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} albumId - 相册 ID。
 * @returns {Promise<Array>} 相册图片数据。
 */
export const getAlbumImages = (albumId) => {
	if (isMock) {
		return Promise.resolve(pageApi.getAlbumImages().data)
	}
	return http({
		url: '/album/images',
		method: 'POST',
		data: { albumId }
	})
}

/**
 * 用户登录。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} code - 登录凭证。
 * @returns {Promise<Object>} 登录结果，包含 token。
 */
export const login = (code) => {
	if (isMock) {
		return Promise.resolve(pageApi.login().data)
	}
	return http({
		url: '/login',
		method: 'POST',
		data: { code }
	})
}

/**
 * 获取用户信息。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Object>} 用户信息。
 */
export const getUserInfo = () => {
	if (isMock) {
		return Promise.resolve(pageApi.getUserInfo().data)
	}
	return http({
		url: '/getUserInfo',
		method: 'GET'
	})
}

/**
 * 获取我的收藏列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} 收藏列表数据。
 */
export const collectList = () => {
	if (isMock) {
		return Promise.resolve(pageApi.collectList().data)
	}
	return http({
		url: '/collect/list',
		method: 'GET'
	})
}