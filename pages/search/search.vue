<template>
	<view class="search-container">
		
		<!-- ================== 页面顶部内容 ================== -->

		<!-- 顶部状态栏：占位 -->
		<up-status-bar></up-status-bar>
		<!-- 顶部导航栏 -->
		<up-navbar
		  :border="false"
		  :bg-color="BarBg"
		  title="图片搜索"
		  :title-style="titleStyle"
		  :left-icon-color="leftIconColor"
		  @leftClick="goBack"
		>
		</up-navbar>
		
		<!-- ================== 页面主体内容：支持纵向滚动 ================== -->
		
		<scroll-view
			class="content"
			scroll-y
			:scroll-top="scrollTop"
			@scroll="handleScroll"
			ref="contentRef"
		>
			<!-- 搜索栏，点击进行搜索操作 -->
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
					@clear="handleClear"
				></up-search>
			</view>

			<!-- 搜索结果区域 -->
			<view class="search-results-container">
				<!-- 搜索结果不为空 -->
				<template v-if="searchResults.length > 0">
					<view class="album-list">
						<view
							v-for="(item, index) in searchResults"
							:key="item.id"
							class="album-item"
							:style="{ animationDelay: index * 0.05 + 's' }"
						>
							<!-- 相册封面图 -->
							<view class="album-image-container">
								<!-- 图片预览 -->
								<view @tap="previewImage(searchResults, index)">
									<!-- 图片懒加载 -->
									<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
									<!-- 图片悬浮图标 -->
									<view class="album-overlay">
										<up-icon name="eye" size="20" color="#fff"></up-icon>
									</view>
								</view>
							</view>
							<!-- 相册标题和标签 -->
							<view class="album-info">
								<text class="album-title">{{ item.title }}</text>
								<view class="album-meta">
									<!-- 标签 -->
									<view class="album-tag">
										<up-icon name="tag" size="12" color="#8b5cf6"></up-icon>
										<text>{{ Array.isArray(item.tag) ? item.tag.join(', ') : item.tag }}</text>
									</view>
									<!-- 点赞数 -->
									<view class="album-stats">
										<up-icon name="thumb-up" size="12" color="#6b7280"></up-icon>
										<text>{{ Math.floor(Math.random() * 100) + 10 }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<!-- 搜索结果为空 -->
				<template v-else>
					<up-empty
						mode="search"
						icon="https://placehold.co/600x400/EEEEEE/999999/png?text=No+Results"
						text="没有找到相关内容"
					></up-empty>
				</template>
			</view>
		</scroll-view>
		
		<!-- ================== 页面其他内容 ================== -->
		
		<!-- 置顶按钮，滚动超过阈值时显示 -->
		<view v-if="showTopBtn" @click="toTop" class="topClass">
			<up-icon name="arrow-upward" :color="topBtnIconColor" size="28"></up-icon>
		</view>
		
	</view>
</template>

<script setup>
/* ===================== 依赖导入 ===================== */
import { ref, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { searchImages } from '../../api/api.js';

/* ===================== 响应式数据定义 ===================== */
// scroll-view 引用
const contentRef = ref(null);
// scroll-view 位置控制
const scrollTop = ref(0);


// 界面样式配置
// 状态栏背景色
const BarBg = '#5e2ec0'
// 标题样式
const titleStyle = { color: "#fff", fontWeight: "bold" };
// 左侧图标颜色
const leftIconColor = "#fff";

// 搜索关键词
const keyword = ref('');
// 搜索结果列表
const searchResults = ref([]);
// 用户ID
const userId = ref('');

// 是否显示置顶按钮（0不显示，1显示）
const showTopBtn = ref(0);
// 置顶按钮图标颜色
const topBtnIconColor = "#ffffff";

/* ===================== 生命周期 ===================== */
// 页面加载时初始化数据
onLoad((options) => {
	// 请求搜索数据（模拟示例，实际应替换为 search 接口）
	fetchImages('');
});

/* ===================== 方法定义 ===================== */

/**
 * 图片预览函数
 */
const previewImage = (list, index) => {
	// 将响应式数组转为普通数组
    const rawList = Array.isArray(list) ? [...list] : []; // 解包 proxy
    const urls = rawList.map(item => item.img);
	console.log('图片预览处理:', urls);
    uni.previewImage({
		urls,
		current: urls[index],
		fail: (err) => {
			console.error('预览失败:', err)
			uni.showToast({ title: '预览失败', icon: 'none' })
		}
	})
}

/**
 * 搜索数据获取
 */
const fetchImages = (kw) => {
    uni.showLoading({ title: '加载中...' });
    searchImages(kw).then(res => {
        searchResults.value = res?.data || [];
        console.log('初始加载数据:', searchResults.value);
    }).catch(err => {
        console.error('初始图片加载失败:', err);
        uni.showToast({ title: '加载失败', icon: 'none' });
    }).finally(() => {
        uni.hideLoading(); // 结束时隐藏加载框
    });
	
};

/**
 * 监听关键词变化
 */
watch(keyword, (val) => {
	console.log('关键词变化:', val);
});

// 防抖搜索
let searchTimeout = null;
/**
 * 处理搜索逻辑
 * - 关键词为空时清空搜索结果
 * - 调用后端接口搜索
 * - 显示加载状态和搜索结果数量提示
 */
const handleSearch = () => {
	if (searchTimeout) clearTimeout(searchTimeout);
	
	searchTimeout = setTimeout(() => {
		const trimmedKeyword = keyword.value.trim();
		if (!trimmedKeyword) {
			// 不在这里调用 handleClear，避免干扰用户输入
			// handleClear();
			uni.showToast({ title: '请输入关键词', icon: 'none' });
						return;
			return;
		}

		uni.showLoading({ title: '搜索中...' });
		searchResults.value = [];

		searchImages(trimmedKeyword).then(res => {
			if (res.code === 1 && Array.isArray(res.data)) {
				searchResults.value = res.data;
				console.log('加载数据:', searchResults.value);
				uni.showToast({ title: `搜索到 ${searchResults.value.length} 条结果`, icon: 'none' });
			} else {
				searchResults.value = [];
				console.error('无搜索结果');
				uni.showToast({ title: '无搜索结果', icon: 'none' });
			}
		}).catch(err => {
			console.error('搜索失败:', err);
			uni.showToast({ title: '搜索失败，请稍后重试', icon: 'error' });
			searchResults.value = [];
		}).finally(() => {
			uni.hideLoading(); // 结束时隐藏加载框
		});
	}, 300); // 300ms 防抖时间
};

// 节流处理
let clearDebounceTimeout  = null;
/**
 * 清空搜索结果，恢复原始数据
 */
const handleClear = () => {
    if (clearDebounceTimeout ) clearTimeout(clearDebounceTimeout );
	clearDebounceTimeout  = setTimeout(() => {
		// 只清空结果，不重设 keyword（由 up-search 自己清空）
		// keyword.value = ''; 
		searchResults.value = [];
		fetchImages('');
		uni.showToast({ title: '已清空搜索', icon: 'none' });
		clearDebounceTimeout = null;
	}, 200);
};

/**
 * 监听 scroll-view 滚动事件，控制置顶按钮显示与隐藏
 * @param {Object} e - 滚动事件对象
 */
const handleScroll = (e) => {
    const top = e.detail?.scrollTop ?? 0;
    showTopBtn.value = top > 600 ? 1 : 0;
};

/**
 * 置顶按钮点击事件，回到顶部
 * 说明：
 * - scroll-view 使用 scrollTop 属性控制滚动
 * - 设置 scrollTop 为当前值无效，故先赋值为 1 再归零，模拟滚动
 * - 该方案无滚动动画效果，原生小程序 pageScrollTo 可平滑滚动，但不可用于非全页面滚动
 */
const toTop = () => {
    scrollTop.value = 1; // 先赋非0值避免无效
    setTimeout(() => {
        scrollTop.value = 0; // 再回到顶部
    }, 150);
};

/**
 * 返回首页（底部标签页切换）
 */
const goBack = () => {
    uni.switchTab({
        url: "/pages/index/index",
    });
};
</script>

<style lang="scss" scoped>
// 页面容器样式
.search-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
		box-sizing: border-box;
	}
	
	// 顶部搜索栏
	.search-header {
		background-color: #fff;
		padding: 10rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		z-index: 10; // 确保搜索栏在顶部
		border-radius: 16rpx;
	}
	
	// 搜索结果区域
	.search-results-container {
		flex: 1; // 填充剩余空间
		padding: 20rpx;
		overflow-y: auto; // 允许内容滚动
		
		// 相册列表样式 (与首页相册列表样式保持一致，或根据需要调整)
		.album-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 10rpx;
			
			// 相册卡片项
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
				
				// 图片容器
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
				
				// 文本信息
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
		}
	}
}

// 动画效果
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>