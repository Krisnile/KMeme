import pageApi from "./mockData/pageApi.js";
import http from "./http.js";

// 从 userInfo 中获取 ID
const storedUserInfo = JSON.parse(uni.getStorageSync('userInfo') || '{}');
const userId = storedUserInfo.id; 

// 小程序使用 mock 数据
const isMock = process.env.NODE_ENV === "development" && process.env.UNI_PLATFORM == "h5";

/* -------------------- index页面 --------------------*/

/**
 * 获取 Banner 列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Array>} Banner 数据。
 */
export const getBanner = () => {
  if (isMock) {
    return Promise.resolve(pageApi.getBanner().data);
  }
  return http({
    url: "/users/banners",
    method: "GET",
  });
};

/**
 * 获取首页列表数据。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} userId - 要获取数据的用户 ID。
 * @returns {Promise<Array>} 首页列表数据。
 */
export const getHomeList = (userId) => {
  if (!userId) {
	console.error("getHomeList: userId 是必需参数！");
	return Promise.reject(new Error("用户ID缺失，请先登录"));
  }
  if (isMock) {
    return Promise.resolve(pageApi.getHomeList(userId).data);
  }
  return http({
    url: "/user/${userId}/getHomeList",
    method: "GET",
  });
};

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
    return Promise.resolve(pageApi.searchImages(keyword).data);
  }
  return http({
    url: "/search/images",
    method: "POST",
    data: { keyword },
  });
};

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
    return Promise.resolve(pageApi.getAlbumImages(albumId).data);
  }
  return http({
    url: "/album/images",
    method: "POST",
    data: { albumId },
  });
};

/**
 * 删除指定 ID 的图片。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string|number} id - 要删除的图片 ID。
 * @returns {Promise<Object>} 删除操作结果
 */
export const deleteImage = (id) => {
  if (isMock) {
    return Promise.resolve(pageApi.deleteImage(id));
  }
  return http({
    url: "/image/delete",
    method: "POST",
    data: { id },
  });
};

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
    return Promise.resolve(pageApi.toggleCollect(id, status));
  }
  return http({
    url: "/image/toggleCollect",
    method: "POST",
    data: { id, status },
  });
};

/**
 * 按指定键排序图片列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} [key='title'] - 排序关键字，默认为 'title'。
 * @returns {Promise<Array>} 排序后的图片数组。
 */
export const sortImages = (key = "title") => {
  if (isMock) {
    return Promise.resolve(pageApi.sortImages(key).data);
  }
  return http({
    url: "/image/sort",
    method: "POST",
    data: { key },
  });
};

/* -------------------- mine页面 --------------------*/

/**
 * 微信登录接口
 * 通过微信登录凭证换取后端的用户token。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {string} code - 微信登录凭证。
 * @returns {Promise<Object>} 包含用户token的Promise。
 */
export const login = (code) => {
  if (isMock) {
    return Promise.resolve(pageApi.login(code).data);
  }
  return http({
    url: '/api/user/auth/wechat-login',
    method: 'POST',
    data: { code },
  });
};

/**
 * 保存用户资料接口
 * 将用户的信息保存到后端。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {Object} userInfo - 用户信息对象。
 * @param {number} userInfo.userId - 用户ID。
 * @param {string} userInfo.nickName - 用户昵称。
 * @param {string} userInfo.description - 用户描述。
 * @param {string} userInfo.avatarUrl - 用户头像URL。
 * @param {number} userInfo.uploadCount - 用户下载数。
 * @param {number} userInfo.collectCount - 用户收藏数。
 * @param {number} userInfo.likeCount - 用户喜欢数。
 * @returns {Promise<Object>} 后端返回的响应数据。
 */
export const saveUserInfo = (userInfo) => {
  if (isMock) {
    return Promise.resolve(pageApi.saveUserInfo(userInfo));
  }
  return http({
    url: '/user/save-profile', // 请替换为实际的保存用户资料接口路径
    method: 'POST',
    data: userInfo,
  });
};

/**
 * 获取月度统计数据。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @returns {Promise<Object>} 包含月度统计数据的Promise。
 */
export const getMonthStats = () => {
  if (isMock) {
    return Promise.resolve(pageApi.getMonthStats());
  }
  return http({
    url: '/stats/month', // 替换为实际的月度统计接口路径
    method: 'GET',
  });
};

/**
 * 获取我的上传列表。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {Object} [params={}] - 查询参数，例如 { page: 1, pageSize: 10 }。
 * @returns {Promise<Array>} 包含我的上传图片的列表。
 */
export const getMyUploads = (params = {}) => {
  if (isMock) {
    return Promise.resolve(pageApi.getMyUploads(params));
  }
  return http({
    url: '/user/uploads', // 替换为实际的我的上传接口路径
    method: 'GET',
    data: params,
  });
};

/**
 * 更新用户通知设置。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {Object} settings - 通知设置对象，例如 { notification: true }。
 * @returns {Promise<Object>} 后端返回的响应。
 */
export const updateNotificationSettings = (settings) => {
  if (isMock) {
    return Promise.resolve(pageApi.updateNotificationSettings(settings));
  }
  return http({
    url: '/user/settings/notification', // 替换为实际的更新通知设置接口路径
    method: 'POST',
    data: settings,
  });
};

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
    const collected = pageApi
      .searchImages("")
      .data.filter((item) => item.isCollected === "已收藏");
    return Promise.resolve(collected);
  }
  return http({
    url: "/collect/list",
    method: "GET",
  });
};

/* -------------------- add页面 --------------------*/

/**
 * 创建新相册。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {Object} albumData - 相册数据
 * @param {string} albumData.title - 相册标题
 * @param {string} albumData.description - 相册描述
 * @param {string} albumData.tag - 相册标签
 * @param {string} albumData.imgUrl - 相册封面图片URL
 * @returns {Promise<Object>} 创建结果
 */
export const createAlbum = (albumData) => {
  if (isMock) {
    return Promise.resolve(pageApi.createAlbum(albumData));
  }
  return http({
    url: "/album/create",
    method: "POST",
    data: albumData,
  });
};

/**
 * 上传图片到指定相册。
 * 在 H5 开发环境会自动被 mock.js 拦截，其他环境（H5 生产和小程序）会发送真实请求。
 *
 * @param {Object} imageData - 图片数据
 * @param {string} imageData.title - 图片标题
 * @param {string} imageData.description - 图片描述
 * @param {Array} imageData.tags - 图片标签数组
 * @param {string} imageData.category - 图片分类
 * @param {boolean} imageData.isPublic - 是否公开
 * @param {Array} imageData.images - 图片文件路径数组
 * @returns {Promise<Object>} 上传结果
 */
export const uploadImages = (imageData) => {
  if (isMock) {
    return Promise.resolve(pageApi.uploadImages(imageData));
  }
  return http({
    url: "/images/upload",
    method: "POST",
    data: imageData,
  });
};
