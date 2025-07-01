<template>
	<view class="search-container">
		<!-- 顶部导航 -->
		<up-status-bar></up-status-bar>
		<up-navbar
		  :border="false"
		  :bg-color="BarBg"
		  title="图片搜索"
		  :title-style="titleStyle"
		  :left-icon-color="leftIconColor"
		  @leftClick="goBack"
		>
		</up-navbar>
		
		<view class="content">
		<view class="search-header">
			<up-search
				placeholder="请输入关键词搜索..."
				v-model="keyword"
				:show-action="true"
				actionText="搜索"
				shape="square"
				height="40"
				:animation="true"
				@search="handleSearch"
				@custom="handleSearch"
				@clear="handleClear"
				@change="handleChange"
			></up-search>
		</view>

		<view class="search-results-container">
			<template v-if="searchResults.length > 0">
				<view class="album-list">
					<view
						v-for="(item, index) in searchResults"
						:key="item.id"
						class="album-item"
						@tap="goToAlbum(item)"
						:style="{ animationDelay: index * 0.05 + 's' }"
					>
						<view class="album-image-container">
							<up-lazy-load
								:image="item.img"
								:index="index"
								threshold="-450"
								border-radius="12"
								:fade-show="true"
							></up-lazy-load>
							<view class="album-overlay">
								<up-icon name="eye" size="20" color="#fff"></up-icon>
							</view>
						</view>
						<view class="album-info">
							<text class="album-title">{{ item.title }}</text>
							<view class="album-meta">
								<view class="album-tag">
									<up-icon name="tag" size="12" color="#8b5cf6"></up-icon>
									<text>{{ item.tag }}</text>
								</view>
								<view class="album-stats">
									<up-icon name="thumb-up" size="12" color="#6b7280"></up-icon>
									<text>{{ Math.floor(Math.random() * 100) + 10 }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<up-empty
					mode="search"
					icon="http://cdn.uviewui.com/uview/empty/search.png"
					text="没有找到相关内容"
				></up-empty>
			</template>
		</view>
	</view>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 样式配置
const BarBg = '#667eea'
// const navBarBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const titleStyle = { color: "#fff", fontWeight: "bold" };
const leftIconColor = "#fff";

// 搜索关键词
const keyword = ref('');
// 搜索结果列表
const searchResults = ref([]);
// 模拟的原始数据，实际项目中会通过API获取
const originalData = ref([
	{ id: 1, img: 'https://cdn.uviewui.com/uview/swiper/1.jpg', title: '风景如画', tag: '自然' },
	{ id: 2, img: 'https://cdn.uviewui.com/uview/swiper/2.jpg', title: '城市夜景', tag: '城市' },
	{ id: 3, img: 'https://cdn.uviewui.com/uview/swiper/3.jpg', title: '可爱宠物', tag: '动物' },
	{ id: 4, img: 'https://cdn.uviewui.com/uview/swiper/4.jpg', title: '动漫人物', tag: '动漫' },
	{ id: 5, img: 'https://cdn.uviewui.com/uview/swiper/5.jpg', title: '美食诱惑', tag: '美食' },
	{ id: 6, img: 'https://cdn.uviewui.com/uview/swiper/6.jpg', title: '极简设计', tag: '设计' },
	{ id: 7, img: 'https://cdn.uviewui.com/uview/swiper/7.jpg', title: '星空探索', tag: '宇宙' },
	{ id: 8, img: 'https://cdn.uviewui.com/uview/swiper/8.jpg', title: '复古潮流', tag: '时尚' },
	{ id: 9, img: 'https://cdn.uviewui.com/uview/swiper/9.jpg', title: '夏日海滩', tag: '自然' },
	{ id: 10, img: 'https://cdn.uviewui.com/uview/swiper/10.jpg', title: '动漫世界', tag: '动漫' },
]);

onLoad((options) => {
	// 如果从其他页面跳转过来时带了关键词，可以进行初始化搜索
	if (options.keyword) {
		keyword.value = options.keyword;
		handleSearch();
	} else {
		// 初始加载所有数据 (或者不显示任何结果，等待用户搜索)
		searchResults.value = originalData.value;
	}
});

// 监听关键词变化，实现实时搜索 (可选)
watch(keyword, (newValue) => {
	if (newValue === '') {
		handleClear();
	}
	// 如果需要实时搜索，可以在这里调用 handleSearch()，但可能消耗资源
	// handleSearch();
});

// 处理搜索逻辑
const handleSearch = () => {
	const trimmedKeyword = keyword.value.trim();
	if (trimmedKeyword) {
		uni.showLoading({ title: '搜索中...' });

		// --- 客户端过滤搜索 (简单示例) ---
		searchResults.value = originalData.value.filter(item =>
			item.title.includes(trimmedKeyword) || item.tag.includes(trimmedKeyword)
		);
		uni.hideLoading();
		uni.showToast({ title: `搜索到 ${searchResults.value.length} 条结果`, icon: 'none' });

		// --- 实际项目中，更推荐使用API搜索 ---
		/*
		// 假设你有一个搜索API: import { searchImagesApi } from '@/api/search';
		searchImagesApi(trimmedKeyword).then(res => {
			searchResults.value = res.data; // 假设API返回的数据在res.data
			uni.hideLoading();
			uni.showToast({ title: `搜索到 ${searchResults.value.length} 条结果`, icon: 'none' });
		}).catch(err => {
			console.error('搜索失败:', err);
			uni.hideLoading();
			uni.showToast({ title: '搜索失败', icon: 'error' });
		});
		*/

	} else {
		// 如果搜索词为空，显示所有原始数据
		handleClear();
	}
};

// 清空搜索框时的处理
const handleClear = () => {
	keyword.value = '';
	searchResults.value = originalData.value; // 清空搜索时显示所有原始数据
	uni.showToast({ title: '已清空搜索', icon: 'none' });
};

// 搜索框内容改变时 (可以用来实现输入即搜索或建议)
const handleChange = (e) => {
	// console.log('关键词改变:', e);
	// 如果需要输入即搜索，可以在这里调用 handleSearch()
};

// 点击相册跳转详情页 (与首页逻辑一致)
const goToAlbum = (album) => {
	uni.navigateTo({
		url: `/pages/album/album?id=${album.id}&title=${encodeURIComponent(album.title)}`
	});
};

// 返回上一页
const goBack = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.search-container {
	min-height: 100vh;
	background-color: #f5f5f5; // 页面背景色
	display: flex;
	flex-direction: column;
	.content {
		position: absolute;
		top: 150rpx; 
		left: 0;
		right: 0;
		bottom: 0;
	    padding: 20rpx;
	    padding-top: 50rpx; // 给顶部导航栏留出空间
	    padding-bottom: 100rpx;
		overflow-y: scroll;
		box-sizing: border-box;
	}
}

.search-header {
	background-color: #fff;
	padding: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	z-index: 10; // 确保搜索栏在顶部
}

.search-results-container {
	flex: 1; // 填充剩余空间
	padding: 20rpx;
	overflow-y: auto; // 允许内容滚动
}

// 相册列表样式 (与首页相册列表样式保持一致，或根据需要调整)
.album-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20rpx;
}

.album-item {
	width: calc(50% - 10rpx);
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
	animation: fadeInUp 0.6s ease forwards;
	opacity: 0;
	transform: translateY(30rpx);

	&:active {
		transform: scale(0.98) translateY(30rpx);
	}

	.album-image-container {
		position: relative;
		height: 240rpx;
		overflow: hidden;

		.album-overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		&:hover .album-overlay {
			opacity: 1;
		}
	}

	.album-info {
		padding: 24rpx;

		.album-title {
			font-size: 28rpx;
			font-weight: 600;
			color: #1f2937;
			margin-bottom: 12rpx;
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.album-meta {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.album-tag {
				display: flex;
				align-items: center;
				gap: 8rpx;
				font-size: 22rpx;
				color: #8b5cf6;
			}

			.album-stats {
				display: flex;
				align-items: center;
				gap: 6rpx;
				font-size: 22rpx;
				color: #6b7280;
			}
		}
	}
}

// 动画
@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>