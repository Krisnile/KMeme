// 调式模拟数据
const state = {
	// banner数据对象
	bannerList:[{
			bannerId: 1,
			image: 'https://www.helloimg.com/i/2025/06/29/6860c8cee7b59.png',
			title: '精选图片1',
		},
		{
			bannerId: 2,
			image: 'https://www.helloimg.com/i/2025/06/29/6860c8ca665d2.png',
			title: '精选图片2',
		},
	    {
			bannerId: 3,
			image: 'https://www.helloimg.com/i/2025/06/29/6860c8c88734d.jpg',
			title: '精选图片3',
		},
	],
	// 相册数据对象
	albumData: [
		{
			albumId: 101,
			title: '探索自然风光',
			imgUrl: 'https://picsum.photos/id/1018/400/300',
			tag: '旅行',
			description: '沉浸在令人惊叹的自然美景中',
			userId: 1
		},
		{
			albumId: 102,
			title: '城市探索指南',
			imgUrl: 'https://picsum.photos/id/1015/400/300',
			tag: '城市',
			description: '发现城市中不为人知的角落',
			userId: 1
		},
		{
			albumId: 103,
			title: '美食之旅',
			imgUrl: 'https://picsum.photos/id/1084/400/300',
			tag: '美食',
			description: '品尝世界各地的美味',
			userId: 1
		},
		{
			albumId: 104,
			title: '科技前沿洞察',
			imgUrl: 'https://picsum.photos/id/1069/400/300',
			tag: '科技',
			description: '追踪未来科技的脚步',
			userId: 1
		},
		{
			albumId: 105,
			title: '艺术与设计',
			imgUrl: 'https://picsum.photos/id/1025/400/300',
			tag: '艺术',
			description: '感受视觉艺术的魅力',
			userId: 1
		},
		{
			albumId: 106,
			title: '野生动物探秘',
			imgUrl: 'https://picsum.photos/id/1024/400/300',
			tag: '自然',
			description: '近距离观察野生动物的生活',
			userId: 1
		},
		{
			albumId: 107,
			title: '历史遗迹之旅',
			imgUrl: 'https://picsum.photos/id/1031/400/300',
			tag: '历史',
			description: '走访古老文明的遗迹',
			userId: 1
		},
		{
			albumId: 108,
			title: '极限运动挑战',
			imgUrl: 'https://picsum.photos/id/1050/400/300',
			tag: '运动',
			description: '感受极限运动带来的激情',
			userId: 1
		}
	],
	// 图数据对象
	imgData: [
		{
			imgId: 1,
			imgUrl: 'https://picsum.photos/id/1018/400/300',
			title: '清晨的森林',
			tag: ['自然', '旅行'],
			isCollected: '已收藏',
			userId: 1
		},
		{
			imgId: 2,
			imgUrl: 'https://picsum.photos/id/1015/400/300',
			title: '城市夜景',
			tag: ['城市', '灯光'],
			isCollected: '',
			userId: 1
		},
		{
			imgId: 3,
			imgUrl: 'https://picsum.photos/id/1084/400/300',
			title: '美食诱惑',
			tag: ['美食', '餐厅'],
			isCollected: '已收藏',
			userId: 1
		},
		{
			imgId: 4,
			imgUrl: 'https://picsum.photos/id/1069/400/300',
			title: '科技创新',
			tag: ['科技', '未来'],
			isCollected: '',
			userId: 1
		},
		{
			imgId: 5,
			imgUrl: 'https://picsum.photos/id/1025/400/300',
			title: '现代艺术',
			tag: ['艺术', '设计'],
			isCollected: '已收藏',
			userId: 1
		},
		{
			imgId: 6,
			imgUrl: 'https://picsum.photos/id/1024/400/300',
			title: '野生动物',
			tag: ['自然', '动物'],
			isCollected: '',
			userId: 1
		},
		{
			imgId: 7,
			imgUrl: 'https://picsum.photos/id/1031/400/300',
			title: '古老遗迹',
			tag: ['历史', '探险'],
			isCollected: '',
			userId: 1
		},
		{
			imgId: 8,
			imgUrl: 'https://picsum.photos/id/1050/400/300',
			title: '极限运动',
			tag: ['运动', '挑战'],
			isCollected: '已收藏',
			userId: 1
		}
	]
};

export default {
	getBanner: () => {
		return {
			code: 1,
			data: state.bannerList,
			msg: 'Banner获取成功'
		}
	},
	getHomeList: (userId) => {
		return {
			code: 1,
			data: state.albumData,
			msg: '首页列表获取成功'
		}
	},
	getAlbumImages: (albumId) => {		
		// 简单根据albumId过滤图片，演示用，可以按tag关联
		const filtered = state.imgData.filter(item => {
			switch(albumId) {
				case 101: return item.tag.includes('自然');
				case 102: return item.tag.includes('城市');
				case 103: return item.tag.includes('美食');
				case 104: return item.tag.includes('科技');
				case 105: return item.tag.includes('艺术');
				case 106: return item.tag.includes('历史');
				case 107: return item.tag.includes('运动');
				default: return true; // 默认返回全部
			}
		});		
		return {
			code: 1,
			data: filtered,
			msg: '相册列表获取成功'
		};
	},
	searchImages: (keyword) => {
		// 处理空关键词：直接返回空
		if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
			return {
				code: 1,
				data: state.imgData,
				msg: '关键词为空，未返回任何数据'
			};
		}
		// 忽略大小写，模糊匹配 title 或 tag
		const lowerKeyword = (keyword || '').toLowerCase();
		const filtered = state.imgData.filter(item => {
			const inTitle = item.title.toLowerCase().includes(lowerKeyword);
			const inTags = item.tag.some(t => t.toLowerCase().includes(lowerKeyword));
			return inTitle || inTags;
		});
		return {
			code: 1,
			data: filtered,
			msg: '搜索成功'
		};
	},
	deleteImage: (id) => {
			const index = state.imgData.findIndex(item => item.id === id);
			if (index !== -1) {
				state.imgData.splice(index, 1);
				return { code: 1, msg: '删除成功' };
			}
			return { code: 0, msg: '未找到图片' };
		},
	
		// ✅ 新增：收藏/取消收藏
		toggleCollect: (id, newStatus) => {
			const item = state.imgData.find(i => i.id === id);
			if (item) {
				item.isCollected = newStatus ? '已收藏' : '';
				return { code: 1, msg: '收藏状态已更新' };
			}
			return { code: 0, msg: '未找到图片' };
		},
	
		// ✅ 新增：排序（按字段 ASC）
		sortImages: (key = 'title') => {
			return {
				code: 1,
				data: [...state.imgData].sort((a, b) => {
					const valA = (a[key] || '').toString();
					const valB = (b[key] || '').toString();
					return valA.localeCompare(valB);
				}),
				msg: '排序成功'
			};
		}
}