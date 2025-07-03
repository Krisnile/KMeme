let baseUrl = ''

/**
 * 根据不同环境设置 API 基础路径。
 * 在开发环境下，所有平台（H5 和小程序）都指向本地开发服务器地址。
 * 在生产环境下，所有平台都指向真实的线上 API 地址。
 * H5 开发环境的请求会被 mock.js 拦截。
 * 小程序开发环境的请求会尝试发送到此本地地址。
 */
if (process.env.NODE_ENV === 'development') {
	// baseUrl = 'https://localhost:5173/api'
	baseUrl = 'http://192.168.31.246:8080/api'
} else {
	baseUrl = 'http://192.168.71.112:8080/api'
}

/**
 * 封装 uni.request 请求。
 *
 * @param {Object} options - 请求选项。
 * @param {string} options.url - 请求的接口路径，会拼接在 baseUrl 之后。
 * @param {Object} [options.data={}] - 请求参数，默认为空对象。
 * @param {string} [options.method='GET'] - 请求方法，默认为 'GET'。
 * @returns {Promise<any>} Promise 对象，成功时 resolve 返回业务数据，失败时 reject 返回错误信息。
 */
export default function http (options) {
    const { url, data = {}, method = 'GET' } = options;

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header: {
				'token': uni.getStorageSync('token') || '' // 从本地存储获取 token
			},
			success: res => {
        console.log("res", res)
				// 检查 HTTP 状态码
				if (res.statusCode === 200) {
					// 检查业务状态码
					if (res.data.code >= 1 || res.data.msg === "success") {
						resolve(res.data.data) // 业务成功，返回数据
					} else if (res.data.code === 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						reject(res.data.msg) // 业务失败，返回错误信息
					}
				} else {
                    // HTTP 状态码非 200 的处理
                    uni.showToast({
                        title: `请求失败: ${res.statusCode}`,
                        icon: 'none'
                    });
                    reject(`请求失败: HTTP 状态码 ${res.statusCode}`);
                }
			},
			fail: (err) => {
				uni.showToast({
					title: '服务器请求异常',
					icon: 'none'
				})
				reject('服务器请求异常: ' + (err.errMsg || '未知错误')) // 包含更多错误信息
			}
		})
	})
}
