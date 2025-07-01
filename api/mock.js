import Mock from 'mockjs'
import pageApi from './mockData/pageApi'

// 只有在 H5 平台且处于开发模式时，才启用 Mock 服务
if (process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'development') {
    // Mock for getBanner (GET)
    Mock.mock(/api\/user\/getBanner/, 'get', pageApi.getBanner)

    // Mock for getHomeList (GET)
    Mock.mock(/\/api\/user\/getHomeList/, 'get', pageApi.getHomeList)

    // Mock for getAlbumImages (POST)
    // 假设 pageApi.flowList 返回的数据结构与 /album/images 接口期望的相同
    Mock.mock(/\/api\/album\/images/, 'post', (options) => {
        const body = JSON.parse(options.body);
        const albumId = body.albumId;
        console.log(`[mock] Mocking /api/album/images for albumId: ${albumId}`);
        // 假设 pageApi.flowList 能够根据 albumId 返回对应数据
        return pageApi.flowList(albumId);
    });

    // Mock for login (POST)
    Mock.mock(/\/api\/login/, 'post', {
        code: 1,
        msg: '登录成功',
        data: {
            token: Mock.Random.string('lower', 32), // 生成一个随机的32位 token
            userId: Mock.Random.id(),
            // 可以根据需要添加其他登录返回的用户信息
        }
    });

    // Mock for getUserInfo (GET)
    Mock.mock(/\/api\/getUserInfo/, 'get', {
        code: 1,
        msg: '获取用户信息成功',
        data: {
            avatarUrl: '/static/mock_avatar.jpg', // 模拟头像 URL
            nickName: Mock.Random.cname(), // 模拟中文姓名
            gender: Mock.Random.integer(0, 1), // 0:未知, 1:男, 2:女
            city: Mock.Random.city(),
            province: Mock.Random.province(),
            country: Mock.Random.county(),
            // 可以根据需要添加其他用户信息
        }
    });

    // Mock for collectList (GET)
    Mock.mock(/\/api\/collect\/list/, 'get', {
        code: 1,
        msg: '获取收藏列表成功',
        data: Mock.mock({
            'list|5-10': [{ // 随机生成 5 到 10 条收藏记录
                'id|+1': 1,
                'title': '@ctitle(10, 20)', // 随机中文标题
                'imageUrl': Mock.Random.image('200x150', '#FF6600', '#FFF', 'Mock Image'), // 模拟图片 URL
                'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")' // 模拟创建时间
            }]
        }).list
    });

    console.log('[mock] H5 开发环境 mock 服务已启用，所有 API 已配置')
} else {
    console.log('[mock] 非 H5 开发环境，mock 服务未启用')
}
