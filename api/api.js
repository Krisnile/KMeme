import pageApi from './mockData/pageApi.js'
import http from './http.js'

// 小程序使用 mock 数据
const isMock = process.env.NODE_ENV === 'development' && process.env.UNI_PLATFORM !== 'h5'

/* -------------------- index页面 --------------------*/

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
		url: '/users/banners',
		method: 'GET'
	})
}

/**
 * 获取首页列表数据。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} 首页列表数据。
 */
export const getHomeList = (userId) => {
	if (isMock) {
		return Promise.resolve(pageApi.getHomeList(userId).data)
	}
	return http({
		url: '/user/getHomeList',
		method: 'GET'
	})
}

/* -------------------- search页面 --------------------*/

/**
 * 获取搜索图片列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} keyword - 关键词。
 * @returns {Promise<Array>} 搜索图片数据。
 */
export const searchImages = (keyword) => {
	if (isMock) {
		return Promise.resolve(pageApi.searchImages(keyword).data)
	}
	return http({
		url: '/search/images',
		method: 'POST',
		data: { keyword }
	})
}

/* -------------------- ablum页面 --------------------*/

/**
 * 获取相册图片列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} albumId - 相册 ID。
 * @returns {Promise<Array>} 相册图片数据。
 */
export const getAlbumImages = (albumId) => {
	if (isMock) {
		return Promise.resolve(pageApi.getAlbumImages(albumId).data)
	}
	return http({
		url: '/album/images',
		method: 'POST',
		data: { albumId }
	})
}

/**
 * 删除指定 ID 的图片。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string|number} id - 要删除的图片 ID。
 * @returns {Promise<Object>} 删除操作结果
 */
export const deleteImage = (id) => {
	if (isMock) {
		return Promise.resolve(pageApi.deleteImage(id))
	}
	return http({
		url: '/image/delete',
		method: 'POST',
		data: { id }
	})
}

/**
 * 收藏或取消收藏指定图片。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string|number} id - 图片 ID。
 * @param {boolean} status - 收藏状态，true 为收藏，false 为取消收藏。
 * @returns {Promise<Object>} 收藏状态更新结果
 */
export const toggleCollect = (id, status) => {
	if (isMock) {
		return Promise.resolve(pageApi.toggleCollect(id, status))
	}
	return http({
		url: '/image/toggleCollect',
		method: 'POST',
		data: { id, status }
	})
}

/**
 * 按指定键排序图片列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} [key='title'] - 排序关键字，默认为 'title'。
 * @returns {Promise<Array>} 排序后的图片数组。
 */
export const sortImages = (key = 'title') => {
	if (isMock) {
		return Promise.resolve(pageApi.sortImages(key).data)
	}
	return http({
		url: '/image/sort',
		method: 'POST',
		data: { key }
	})
}

/* -------------------- mine页面 --------------------*/

/**
 * 用户登录。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} code - 登录凭证。
 * @returns {Promise<Object>} 登录结果，包含 token。
 */
export const login = (code) => {
	if (isMock) {
		return Promise.resolve(pageApi.login?.().data ?? {})
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
		return Promise.resolve(pageApi.getUserInfo?.().data ?? {})
	}
	return http({
		url: '/getUserInfo',
		method: 'GET'
	})
}

/* -------------------- collect页面 --------------------*/

/**
 * 获取我的收藏列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} 收藏列表数据。
 */
export const collectList = () => {
	if (isMock) {
		// 筛选已收藏的图片
		const collected = pageApi.searchImages('').data.filter(item => item.isCollected === '已收藏')
		return Promise.resolve(collected)
	}
	return http({
		url: '/collect/list',
		method: 'GET'
	})
}

